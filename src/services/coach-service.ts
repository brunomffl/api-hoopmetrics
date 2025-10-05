import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { CreateCoachSchema } from "@/schemas/coachSchema";
import { hash } from "bcrypt";

class CoachService{
    async create(coachData: CreateCoachSchema){
        return await prisma.$transaction(async (tx) => {
            const existingUser = await tx.user.findUnique({
                where: {
                    email: coachData.email
                }
            });

            // verificar se já existe email cadastrado
            if(existingUser){
                throw new AppError("Email já cadastrado!", 400);
            };

            //verificar se team existe e se já tem um coach no time
            const team = await tx.teams.findUnique({
                where: {
                    id: coachData.team_id
                },
                include: { coach: true }
            });
            if(!team){
                throw new AppError("Time não encontrado!", 404);
            };
            if(team.coach){
                throw new AppError("Esse time já possui um técnico cadastrado!", 400);
            };

            const hashedPassword = await hash(coachData.password, 8);

            //criando o user
            const user = await tx.user.create({
                data: {
                    name: coachData.name,
                    email: coachData.email,
                    password: hashedPassword,
                    role: "coach",
                    pfp_url: coachData.pfp_url
                }
            });

            //criando o coach
            const coach = await tx.coach.create({
                data: {
                    user_id: user.id,
                    team_id: coachData.team_id
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            role: true,
                            pfp_url: true
                        }
                    },
                    team: {
                        select: {
                            id: true,
                            name: true,
                            city: true
                        }
                    }
                }
            });
            return coach;
        })
    }
};

export { CoachService };