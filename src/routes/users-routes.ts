import { Router } from "express";;
import { UserController } from "@/controller/auth-controller";

const userRoutes = Router();
const userController = new UserController();

userRoutes.get("/", userController.create.bind(userController));

export { userRoutes };