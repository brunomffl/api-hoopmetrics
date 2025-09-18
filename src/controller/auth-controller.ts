import { Request, Response } from "express";
import { AuthService } from "@/services/auth-service";

class AuthController {

    private authService: AuthService;

    constructor(){
        this.authService = new AuthService();
    };

    async login(req: Request, res: Response){
        const { email, password } = req.body;
        const user = { email, password };
        return res.status(200).json(await this.authService.login(user));
    }
};

export { AuthController };