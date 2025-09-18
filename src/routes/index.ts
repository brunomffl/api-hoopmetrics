import { Router } from "express";
import { userRoutes } from "./auth-routes";

const routes = Router();

routes.use("/auth", userRoutes);

export { routes };