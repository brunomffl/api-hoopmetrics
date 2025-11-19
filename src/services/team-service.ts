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

    async index(){
        const teams = await prisma.teams.findMany();

        return {
            teams,
            total: teams.length,
            message: teams.length === 0 ? "Nenhum time foi cadastrado" : undefined   
        };
    }

    async delete(team_id: string ){
        const team = await prisma.teams.findFirst({
            where: {
                id: team_id
            },
            include: {
                coach: {
                    include: {
                        user: true
                    }
                },
                players: true,
                homeMatches: true,
                awayMatches: true
            }
        });

        if(!team){
            throw new AppError("Time não encontrado!", 404);
        };

        if(team.coach){
            throw new AppError(`Não é possível deletar o time pois existe um técnico vinculado: ${ team.coach.user.name }`, 400);
        };

        if(team.players.length > 0){
            throw new AppError(`Não é possível deletar o time pois existem ${ team.players.length } jogador(es) vinculado(s)`, 400);
        };

        if(team.homeMatches.length > 0 || team.awayMatches.length > 0){
            throw new AppError(`Não é possível deletar o time pois existem partidas vinculadas`, 400);
        }


        await prisma.teams.delete({
            where: {
                id: team_id
            }
        });

        return team;
    };
};

export { TeamService };