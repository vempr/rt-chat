import { z } from "zod";
import { blogSchema } from "./blogSchema.ts";

const generalResponseDataSchema = z.object({
  msg: z.optional(z.string()),
  error: z.optional(z.string()),
});

export type GeneralResponseData = z.infer<typeof generalResponseDataSchema>;

const blogPostResponseDataSchema = z.object({
  blog: blogSchema,
  error: z.optional(z.any()),
});

export type BlogPostResponseData = z.infer<typeof blogPostResponseDataSchema>;

export const authStatusResponseDataSchema = z
  .object({
    user: z.optional(z.any()),
    msg: z.optional(z.string()),
    error: z.optional(z.string()),
  })
  .strict();

export type AuthStatusResponseData = z.infer<
  typeof authStatusResponseDataSchema
>;

export const signupResponseDataSchema = z
  .object({
    username: z.optional(z.string()),
    user: z.any(),
    error: z.optional(z.string()),
  })
  .strict();

export type SignupResponseData = z.infer<typeof signupResponseDataSchema>;
