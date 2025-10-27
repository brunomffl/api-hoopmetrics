import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { CreateCoachSchema, UpdateCoachSchema, ValidateCoachId } from "@/schemas/coachSchema";
import { hash } from "bcrypt";

class CoachService{
    async index(){
        const coaches = await prisma.coach.findMany();

        if(coaches.length === 0){
            throw new AppError("Nenhum treinador foi cadastrado!", 400);
        };

        return coaches;
    }
    
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

    async update(user_id: string, coachData: UpdateCoachSchema){
        const coach = await prisma.coach.findUnique({
            where: { user_id }
        });

        if (!coach){
            throw new AppError("Técnico não encontrado!", 404);
        }

        return await prisma.$transaction(async (tx) => {
            if (coachData.email) {
                const existingUser = await tx.user.findUnique({
                    where: { email: coachData.email }
                });
                
                if (existingUser && existingUser.id !== user_id) {
                    throw new AppError("Email já está em uso!", 400);
                }
            }

            if (coachData.team_id && coachData.team_id !== coach.team_id) {
                const newTeam = await tx.teams.findUnique({
                    where: { id: coachData.team_id },
                    include: { coach: true }
                });
                
                if (!newTeam) {
                    throw new AppError("Novo time não encontrado!", 404);
                }
                if (newTeam.coach) {
                    throw new AppError("Novo time já possui um técnico!", 400);
                }
            }
            const userUpdateData: any = {};
            if (coachData.name) userUpdateData.name = coachData.name;
            if (coachData.email) userUpdateData.email = coachData.email;
            if (coachData.pfp_url !== undefined) userUpdateData.pfp_url = coachData.pfp_url;
            if (coachData.password) {
                userUpdateData.password = await hash(coachData.password, 8);
            }

            if (Object.keys(userUpdateData).length > 0) {
                await tx.user.update({
                    where: { id: user_id },
                    data: userUpdateData
                });
            }

            const updatedCoach = await tx.coach.update({
                where: { user_id },
                data: {
                    ...(coachData.team_id && { team_id: coachData.team_id })
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

            return updatedCoach;
        });
    }

    async delete(user_id: string){
        const coach = await prisma.coach.findFirst({
            where: {
                user_id
            }
        });

        if(!coach){
            throw new AppError("Técnico não encontrado!", 404);
        }
        
    };
};

export { CoachService };