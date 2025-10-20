import { z } from "zod";

export const createTeamSchema = z.object({
    name: z.string().min(3, { error: "Time precisa conter pelo menos 3 letras" }),
    city: z.string().min(3, { error: "Cidade deve conter pelo menos 3 letras" }),
    logo_url: z.url().optional(),
});



export type CreateTeamSchema = z.infer<typeof createTeamSchema>;