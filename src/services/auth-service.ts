import { compare } from "bcrypt";
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { AuthLoginSchema } from "@/schemas/authSchema";
import { authConfig } from "@/config/auth";
import jwt from "jsonwebtoken";

class AuthService {

    async login(user: AuthLoginSchema){
        const compareUser = await prisma.user.findFirst({
            where: { email: user.email }
        });

        if (!compareUser){
            throw new AppError("E-mail ou senha inválidos", 401);
        }

        const passwordMatched = await compare(user.password, compareUser.password);

        if(!passwordMatched){
            throw new AppError("E-mail ou senha inválidos", 401);
        }

        const { secret, expiresIn } = authConfig.jwt;

        if (!secret) {
            throw new AppError("JWT secret is not defined", 500);
        }

        const token = jwt.sign(
            { 
                role: compareUser.role,
                sub: compareUser.id 
            }, 
            secret!
        );

        const { password: _, ...userWithoutPassword } = compareUser;

        return {
            token,
            userWithoutPassword
        }
    }
};

export { AuthService };