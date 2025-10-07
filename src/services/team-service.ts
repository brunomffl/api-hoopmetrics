import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { CreateTeamSchema } from "@/schemas/teamSchema";

class TeamService{
    async create(teamData: CreateTeamSchema){
        const existingTeam = await prisma.teams.findFirst({
            where: { name: teamData.name }
        });
        
        if(existingTeam){
            throw new AppError("Já existe um time com esse nome", 400);
        };

        const team = await prisma.teams.create({
            data: {
                name: teamData.name,
                city: teamData.city,
                logo_url: teamData.logo_url
            }
        });

        return team;
    }
};

export { TeamService };