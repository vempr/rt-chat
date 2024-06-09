import { z } from "zod";

const buttonSchema = z.enum(["idle", "loading", "posted", "failed"]);

export type ButtonState = z.infer<typeof buttonSchema>;
