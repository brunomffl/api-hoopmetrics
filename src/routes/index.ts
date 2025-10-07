import { Router } from "express";
import { userRoutes } from "./auth-routes";
import { teamRoutes } from "./team-routes";
import { coachRoutes } from "./coach-routes";

const routes = Router();

routes.use("/auth", userRoutes);
routes.use("/coach", coachRoutes);
routes.use("/team", teamRoutes);

export { routes };