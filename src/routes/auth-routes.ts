import { Router } from "express";;
import { AuthController } from "@/controller/auth-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { validateBody } from "@/middlewares/validate-schema";
import { authSchema } from "@/schemas/authSchema";

const userRoutes = Router();
const authController = new AuthController();

userRoutes.post("/login", 
    validateBody(authSchema),
    authController.login.bind(authController),
);

userRoutes.post("/logout",
    ensureAuthenticated,
    authController.logout.bind(authController),
)

export { userRoutes };