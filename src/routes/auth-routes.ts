import { Router } from "express";;
import { AuthController } from "@/controller/auth-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";

const userRoutes = Router();
const authController = new AuthController();

userRoutes.post("/login", 
    authController.login.bind(authController),
);

userRoutes.post("/logout",
    ensureAuthenticated,
    authController.logout.bind(authController),
)

export { userRoutes };