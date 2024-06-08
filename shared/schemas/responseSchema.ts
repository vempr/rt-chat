import { z } from "zod";
import { blogSchema } from "./blogSchema.ts";

const blogPostResponseSchema = z.object({
  blog: blogSchema,
  error: z.optional(z.any()),
});

export type BlogPostResponse = z.infer<typeof blogPostResponseSchema>;

export const authStatusResponseSchema = z
  .object({
    user: z.any(),
    msg: z.optional(z.string()),
    error: z.optional(z.string()),
  })
  .strict();

export type AuthStatusResponse = z.infer<typeof authStatusResponseSchema>;

export const signupResponseSchema = z
  .object({
    username: z.optional(z.string()),
    user: z.any(),
    error: z.optional(z.string()),
  })
  .strict();

export type SignupResponse = z.infer<typeof signupResponseSchema>;
