import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { UpdateUserSchema } from "@/schemas/profileSchema";

class ProfileService {

    async getProfile(user_id: string){
        const user = await prisma.user.findFirst({
            where: {
                id: user_id
            }
        });

        if(!user){
            throw new AppError("Usuário não encontrado!", 404);
        };

        const user_role = user.role;

        switch (user_role){
            case "coach":
                const coach = await prisma.coach.findFirst({
                    where: {
                        user_id
                    },
                    include: {
                        team: true
                    }
                });

                if(!coach){
                    throw new AppError("Técnico não encontrado!", 404);
                };

                const { password: _c, ...coachWithoutPassword } = user;

                return {
                    type: "coach",
                    ...coachWithoutPassword,
                    coachData: coach
                };

            case "player":
                const player = await prisma.player.findFirst({
                    where: {
                        user_id
                    },
                    include: {
                        team: true
                    }
                });

                if(!player){
                    throw new AppError("Jogador não encontrado!", 404);
                };

                const { password: _p, ...playerWithoutPassword } = user;

                return {
                    type: "player",
                    ...playerWithoutPassword,
                    playerData: player
                };

            case "admin":
                const { password: _a, ...adminWithoutPassword } = user;
                
                return { 
                    type: "admin",
                    ...adminWithoutPassword
                };

            default:
                throw new AppError("Usuário não tem perfil definido, contate o suporte.", 400);
        }
    };

    async update(user_id: string, pfp_url?: string | null){

        const user = await prisma.user.findFirst({
            where: {
                id: user_id
            }
        });

        if(!user){
            throw new AppError("Usuário não encontrado!", 404);
        };

        const updatedUser = await prisma.user.update({
            where: {
                id: user_id
            },
            data: {
                pfp_url
            },
            select: {
                id: true,
                name: true,
                email: true,
                pfp_url: true,
                role: true,
            }
        });

        return updatedUser;
    }
};

export { ProfileService };