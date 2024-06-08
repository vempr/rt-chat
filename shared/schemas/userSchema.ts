import { z } from "zod";
import { passwordRegex } from "../regex";

export const userSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be atleast 3 characters long" })
    .max(30, { message: "Username must be shorter than 30 characters" }),
  password: z.string().refine((val) => passwordRegex.test(val), {
    message:
      "Password must be 8-50 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.",
  }),
});

export type UserType = z.infer<typeof userSchema>;

export const userLoginSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type UserLoginType = z.infer<typeof userLoginSchema>;

export const userChangePasswordFormSchema = z.object({
  oldPassword: z.string().min(1, { message: "Old password is required" }),
  newPassword: z.string().refine((val) => passwordRegex.test(val), {
    message:
      "Password must be 8-50 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.",
  }),
});

export type UserChangePasswordFormType = z.infer<
  typeof userChangePasswordFormSchema
>;

const userMongoSchema = userSchema.extend({
  _id: z.string(),
  __v: z.number(),
});

export type UserMongoType = z.infer<typeof userMongoSchema>;
