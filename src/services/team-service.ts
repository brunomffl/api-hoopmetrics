import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { CreateTeamSchema, UpdateTeamSchema } from "@/schemas/teamSchema";

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

    async getMyTeam(user_id: string){
        console.log("🔍 USER_ID recebido:", user_id);
        
        const user = await prisma.user.findFirst({
            where: { 
                id: user_id
            }
        });

        if(!user){
            throw new AppError("Usuário não encontrado!", 404);
        };

        const user_role: string = user.role;
        let team_id: string | undefined;

        switch(user_role){
            case 'coach':
                const coach = await prisma.coach.findFirst({
                    where: {
                        user_id
                    }
                });

                if(!coach){
                    throw new AppError("Técnico não encontrado!", 404);
                };

                if(!coach.team_id){
                    throw new AppError("Nenhum time foi vinculado a esse técnico", 400);
                };

                team_id = coach.team_id;
                break;
            case 'player':
                const player = await prisma.player.findFirst({
                    where: {
                        user_id
                    }
                });

                if(!player){
                    throw new AppError("Jogador não encontrado!", 404);
                };
                if(!player.team_id){
                    throw new AppError("Nenhum time foi vinculado a esse jogador", 400);
                };

                team_id = player.team_id;
                break;

            default:
                console.log(user.name);
                throw new AppError("Usuário não é Jogador ou Técnico!", 400)
                break;
        };

        const team = await prisma.teams.findFirst({
            where: {
                id: team_id
            },
            include: {
                coach: { 
                    select: {
                        user: {
                            select: {
                                name: true
                            }
                        }
                    }
                },
                players: { include: { user: true } },
            }
        });

        if(!team){
            throw new AppError("Time não foi encontrado!", 404);
        };

        return team
    };

    async update(team_id: string, teamData: UpdateTeamSchema){
        const team = await prisma.teams.findFirst({
            where: { id: team_id }
        });

        if(!team){
            throw new AppError("Time não encontrado!", 404);
        };

        if(teamData.name !== team.name){
            const existingTeam = await prisma.teams.findFirst({
                where: {
                    name: teamData.name
                }
            });

            if(existingTeam){
                throw new AppError("Já existe um time com esse nome", 400);
            }
        };

        const updatedTeam = await prisma.teams.update({
            where: { id: team_id },
            data: teamData
        });

        return updatedTeam;
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