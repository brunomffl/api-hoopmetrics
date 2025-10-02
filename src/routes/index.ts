import { Router } from "express";
import { userRoutes } from "./auth-routes";
import { coachRoutes } from "./coach-routes";

const routes = Router();

routes.use("/auth", userRoutes);
routes.use("/coach", coachRoutes);

export { routes };