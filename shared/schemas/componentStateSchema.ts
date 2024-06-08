import { z } from "zod";

const buttonSchema = z.enum(["idle", "loading", "posted", "failed"]);

export type ButtonType = z.infer<typeof buttonSchema>;
