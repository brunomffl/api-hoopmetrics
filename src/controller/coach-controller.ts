import { Request, Response } from "express";
//importar serviço

class CoachController {

    async create(req: Request, res: Response){
        //recuperar dados do body
        //mandar pro service
        //retorno de sucesso
        return res.json({ message: "teste rota create do coach" });
    }
};

export { CoachController };