import { Request, Response } from "express";
import { CoachService } from "@/services/coach-service";
//importar serviço

class CoachController {

    private coachService: CoachService;

    constructor(){
        this.coachService = new CoachService();
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
};

export { CoachController };