import { Router } from "express";
import { userRoutes } from "./auth-routes";
import { teamRoutes } from "./team-routes";
import { coachRoutes } from "./coach-routes";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";

const routes = Router();

routes.use("/auth", 
    userRoutes
);

routes.use("/coach",
    ensureAuthenticated,
    coachRoutes
);

routes.use("/team", 
    ensureAuthenticated, 
    teamRoutes
);

export { routes };