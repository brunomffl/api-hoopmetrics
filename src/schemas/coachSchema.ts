import { z } from "zod";

export const createCoachSchema = z.object({
    email: z.email(),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).+$/, { error: "Senha deve conter uma letra maiúscula, uma letra minúscula e um caractere especial!" }),
    name: z.string().min(3, { error: "Nome deve conter no mínimo 3 caracteres" }),
    pfp_url: z.url().optional(),
    role: z.string().default("coach"),
    team_id: z.string()
});

export type CreateCoachSchema = z.infer<typeof createCoachSchema>;