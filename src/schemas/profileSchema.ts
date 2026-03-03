import { z } from "zod";

export const updateUserSchema = z.object({
    pfp: z.url(),
});

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;