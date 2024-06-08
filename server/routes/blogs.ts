import { Router, Request, Response } from "express";
import { Blog } from "../mongoose/schemas/blog.ts";
import {
  BlogFormType,
  blogFormSchema,
  BlogType,
} from "../../shared/schemas/blogSchema.ts";
import validateBody from "../middleware/validateBody.ts";

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
  validateBody(blogFormSchema),
  async (req: Request, res: Response) => {
    const b: BlogFormType = req.body;
    const date = new Date();
    const blog: BlogType = {
      ...b,
      date: date,
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
      return res
        .status(400)
        .send({
          errorMsg: "Invalid image type.",
          imageType: blogThumbnailType,
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
