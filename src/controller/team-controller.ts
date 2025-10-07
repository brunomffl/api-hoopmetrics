import { Request, Response } from "express";
import { TeamService } from "@/services/team-service";

class TeamController {

    private teamService: TeamService;

    constructor(){
        this.teamService = new TeamService();
    }

    async create(req: Request, res: Response){
        const team = await this.teamService.create(req.body);
        return res.status(201).json({ message: "Time criado com sucesso", team });
    }
};

export { TeamController };