import { Router } from "express";;
import { AuthController } from "@/controller/auth-controller";

const userRoutes = Router();
const authController = new AuthController();

userRoutes.post("/login", 
    authController.login.bind(authController)
);

export { userRoutes };