import { Request, Response } from "express";
import { TeamService } from "@/services/team-service";

class TeamController {

    private teamService: TeamService;

    constructor(){
        this.teamService = new TeamService();
    };

    async create(req: Request, res: Response){
        const team = await this.teamService.create(req.body);
        return res.status(201).json({ message: "Time criado com sucesso!", team });
    };

    async index(req: Request, res: Response){
        const team = await this.teamService.index();
        return res.status(201).json(team);
    };

    async getMyTeam(req: Request, res: Response){
        const user_id = req.user.sub;
        const team = await this.teamService.getMyTeam(user_id);

        return res.status(200).json(team);
    };

    async update(req: Request, res: Response){
        const { team_id } = req.params;
        const updatedTeam = await this.teamService.update(team_id, req.body);

        return res.status(200).json(updatedTeam);
    };

    async delete(req: Request, res: Response){
        const team = await this.teamService.delete(req.params.team_id);
        return res.status(204).json({ message: "Time deletado com sucesso!", team });
    };
};

export { TeamController };