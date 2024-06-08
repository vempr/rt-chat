import { z } from "zod";
import { ObjectId } from "mongodb";

export const blogFormSchema = z
  .object({
    author: z
      .string()
      .min(2, { message: "Author's name must be at least 2 characters long." }),
    title: z
      .string()
      .min(3, { message: "Title must be at least 3 characters long." }),
    body: z.string().min(20, {
      message: "The blog's content must be at least 20 characters long.",
    }),
    thumbnail: z.optional(z.string()),
  })
  .strict();

export type BlogFormType = z.infer<typeof blogFormSchema>;

export const blogSchema = z
  .object({
    author: z.string(),
    title: z.string(),
    body: z.string(),
    thumbnail: z.optional(z.string()),
    date: z.coerce.date(),
    reactions: z
      .object({
        likes: z.number(),
        dislikes: z.number(),
      })
      .strict(),
  })
  .strict();

export type BlogType = z.infer<typeof blogSchema>;

export const blogMongoSchema = blogSchema.extend({
  _id: z.custom<ObjectId>(),
  __v: z.number(),
});

export type BlogMongoType = z.infer<typeof blogMongoSchema>;
