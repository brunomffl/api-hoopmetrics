import { z } from "zod";

export const validateCoachId = z.object({
    id: z.string()
});

export const createCoachSchema = z.object({
    email: z.email(),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).+$/, { error: "Senha deve conter uma letra maiúscula, uma letra minúscula e um caractere especial!" }),
    name: z.string().min(3, { error: "Nome deve conter no mínimo 3 caracteres" }),
    pfp_url: z.url().optional(),
    team_id: z.string()
});

export const updateCoachSchema = z.object({
    email: z.string().optional(),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).+$/).optional(),
    name: z.string().optional(),
    pfp_url: z.url().optional(),
    team_id: z.string().optional()
});

export type ValidateCoachId = z.infer<typeof validateCoachId>;
export type CreateCoachSchema = z.infer<typeof createCoachSchema>;
export type UpdateCoachSchema = z.infer<typeof updateCoachSchema>;