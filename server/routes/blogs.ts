import { Router, Request, Response } from "express";
import checkForAuthentication from "../middleware/checkForAuthentication.ts";
import { Blog } from "../mongoose/schemas/blog.ts";
import {
  BlogFormType,
  blogFormSchema,
  BlogType,
} from "../../shared/schemas/blogSchema.ts";
import validateBody from "../middleware/validateBody.ts";
import { ObjectId } from "mongoose";

const ACCEPTED_IMAGE_TYPES = [
  "image/png",
  "image/jpg",
  "image/svg",
  "image/gif",
];

const router = Router();

router.get("/blogs", async (_req: Request, res: Response) => {
  const blogs = await Blog.find();
  res.send(blogs);
});

router.post(
  "/blogs",
  checkForAuthentication,
  validateBody(blogFormSchema),
  async (req: Request, res: Response) => {
    const sessionUser = req.user as Express.User;
    const userId = sessionUser._id as unknown as ObjectId; // ts thinks _id is a string; logging req.user shows that _id is a mongo objectid :D
    const b: BlogFormType = req.body;
    const blog: BlogType = {
      author: {
        _id: userId,
        username: sessionUser.username,
      },
      ...b,
      date: new Date(),
      reactions: {
        likes: 0,
        dislikes: 0,
      },
    };

    const blogThumbnailType = blog.thumbnail ? blog.thumbnail.slice(5, 14) : "";
    if (
      !(blogThumbnailType === "") &&
      !ACCEPTED_IMAGE_TYPES.includes(blogThumbnailType)
    ) {
      return res.status(400).send({
        error: `Invalid image type: ${blogThumbnailType}`,
      });
    }
    const newBlog = new Blog(blog);
    try {
      const savedBlog = await newBlog.save();
      return res.status(201).send({ blog: savedBlog });
    } catch (err) {
      return res.status(400).send({ blog: newBlog, error: err });
    }
  }
);

export default router;
