import { Request, Response, NextFunction } from "express";
import { TokenPayLoad } from "@/schemas/authSchema";
import { AppError } from "@/utils/AppError";
import { authConfig } from "@/config/auth";
import { verify } from "jsonwebtoken";

function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader){
            throw new AppError("Token não encontrado!", 404);
        }

        //split do token
        const [, token] = authHeader.split(" "); //Bearer hashtoken

        if (!authConfig.jwt.secret) {
            throw new AppError("JWT secret não configurado!", 500); //verificação necessária para a desestruturação abaixo funcionar sem ts ficar reclamando
        }

        const { role, sub: user_id } = verify(token, authConfig.jwt.secret as string) as unknown as TokenPayLoad;

        req.user = {
            sub: user_id,
            role
        }

        return next();
    } catch {
        throw new AppError("Token JWT inválido!")
    };
};

export { ensureAuthenticated };