import { Router } from "express";
import { userRoutes } from "./auth-routes";
import { teamRoutes } from "./team-routes";
import { coachRoutes } from "./coach-routes";
import { profileRoutes } from "./profile-routes";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";

const routes = Router();

//rotas de autenticação - sem middleware
routes.use("/auth", 
    userRoutes,
);

//com middleware
routes.use("/coach",
    ensureAuthenticated,
    coachRoutes,
);

//com middleware
routes.use("/team", 
    ensureAuthenticated, 
    teamRoutes,
);

//teste
routes.use("/profile",
    profileRoutes,
);

export { routes };