import { Request, Response } from "express";
import { CoachService } from "@/services/coach-service";

class CoachController {

    private coachService: CoachService;

    constructor(){
        this.coachService = new CoachService();
    }

    async index(req: Request, res: Response){
        const coaches = await this.coachService.index();

        return res.json(201).json(coaches);
    }

    async create(req: Request, res: Response){
        const coach = await this.coachService.create(req.body);

        return res.status(201).json({
            message: "Técnico criado com sucesso!",
            coach
        });
    }

    async update(req: Request, res: Response){
        const { id } = req.params
        const updatedCoach = await this.coachService.update(id, req.body);

        return res.status(201).json({
            message: "Técnico atualizado com sucesso!",
            updatedCoach
        });
    };

    async delete(req: Request, res: Response){
        const { id } = req.params
        await this.coachService.delete(id);

        return res.status(200).json({ message: "Técnico deletado com sucesso!" });
    }
};

export { CoachController };