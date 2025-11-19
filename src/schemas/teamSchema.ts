import { z } from "zod";

export const validateTeamId = z.object({
    id: z.uuid()
});

export const createTeamSchema = z.object({
    name: z.string().min(3, { error: "Time precisa conter pelo menos 3 letras" }),
    city: z.string().min(3, { error: "Cidade deve conter pelo menos 3 letras" }),
    logo_url: z.url().optional(),
});

export const updateTeamScehma = z.object({
    name: z.string().min(3, { error: "Time precisa conter pelo menos 3 letras" }).optional(),
    city: z.string().min(3, { error: "Cidade deve conter pelo menos 3 letras" }).optional(),
    logo_url: z.url().optional()
});


export type ValidateTeamId = z.infer<typeof validateTeamId>;
export type CreateTeamSchema = z.infer<typeof createTeamSchema>;
export type UpdateTeamSchema = z.infer<typeof updateTeamScehma>;