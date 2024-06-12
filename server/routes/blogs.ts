import { Router, Request, Response } from "express";
import checkForAuthentication from "../middleware/checkForAuthentication.ts";
import { Blog } from "../mongoose/schemas/blog.ts";
import {
  BlogFormType,
  blogFormSchema,
  BlogType,
} from "../../shared/schemas/blogSchema.ts";
import validateBody from "../middleware/validateBody.ts";
import { ObjectId, Types } from "mongoose";

// type Action = "like" | "dislike" | "unlike" | "undislike";

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

router.get("/blogs/:id", async (req: Request, res: Response) => {
  try {
    const blogId = req.params.id as string;
    const id = new Types.ObjectId(blogId);
    const blog = await Blog.findById(id).select(["-thumbnail"]);
    if (!blog) res.status(404).send({ error: "Blog Not Found!" });
    res.send(blog);
  } catch (error) {
    res.status(400).send({ error: "Invalid Blog Id" });
  }
});

router.get("/blogs/:id/stats", async (req: Request, res: Response) => {
  try {
    const blogId = req.params.id as string;
    const id = new Types.ObjectId(blogId);
    const blog = await Blog.findById(id).select("reactions");
    if (!blog) res.status(404).send({ error: "Blog Not Found!" });
    res.send({
      likes: blog?.reactions?.likes.length,
      dislikes: blog?.reactions?.dislikes.length,
    });
  } catch (error) {
    res.status(400).send({ error: "Invalid Blog Id" });
  }
});

// router.post(
//   "/blogs/:id/:action",
//   checkForAuthentication,
//   async (req: Request, res: Response) => {
//     try {
//       const blogId = req.params.id as string;
//       const id = new Types.ObjectId(blogId);
//       console.log(id, req.params.action);
//       const action = req.params.action as Action;
//       if (!["like", "dislike", "unlike", "undislike"].includes(action)) {
//         res.status(400).send({ error: "Invalid Action" });
//       }

//       const blog = await Blog.findById(id).select("reactions");
//       if (!blog) res.status(404).send({ error: "Blog Not Found!" });
//       if (
//         blog &&
//         blog !== undefined &&
//         blog !== null &&
//         blog.reactions &&
//         blog.reactions !== undefined &&
//         blog.reactions !== null
//       ) {
//         const sessionUser = req.user as Express.User;
//         const userId = sessionUser._id as unknown as ObjectId;

//         const { likes, dislikes } = blog.reactions;
//         const newLikes = likes.filter(
//           (likeId: ObjectId) => !likeId.equals(userId)
//         );
//         const newDislikes = dislikes.filter(
//           (dislikeId: ObjectId) => !dislikeId.equals(userId)
//         );

//         switch (action) {
//           case "like":
//             newLikes.push(userId);
//             break;
//           case "dislike":
//             newDislikes.push(userId);
//             break;
//           case "unlike":
//             break;
//           case "undislike":
//             break;
//         }

//         console.log(newLikes, newDislikes);

//         await Blog.findByIdAndUpdate(blogId, {
//           $set: { likes: newLikes, dislikes: newDislikes },
//         });
//         res.status(201).send({ msg: "Action completed successfully" });
//       }
//     } catch (error) {
//       res.status(400).send({ error: error });
//     }
//   }
// );

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
        likes: [],
        dislikes: [],
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
