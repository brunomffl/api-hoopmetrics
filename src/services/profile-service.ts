import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";

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
                    }
                });

                if(!coach){
                    throw new AppError("Técnico não encontrado!", 404);
                };

                return {
                    type: "coach",
                    ...user,
                    coachData: coach
                };

            case "player":
                const player = await prisma.player.findFirst({
                    where: {
                        user_id
                    }
                });

                if(!player){
                    throw new AppError("Jogador não encontrado!", 404);
                };

                return {
                    type: "player",
                    ...user,
                    playerData: player
                };

            case "admin":
                return { 
                    type: "admin",
                    ...user
                };

            default:
                throw new AppError("Usuário não tem perfil definido, contate o suporte.", 400);
        }
    };
};

export { ProfileService };