import { Router } from "express";
import { TeamController } from "@/controller/team-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { validateParams } from "@/middlewares/validate-schema";
import { validateTeamId } from "@/schemas/teamSchema";

const teamRoutes = Router();
const teamController = new TeamController();

teamRoutes.post("/",
    ensureAuthenticated,
    teamController.create.bind(teamController),
);

teamRoutes.delete("/:id",
    ensureAuthenticated,
    validateParams(validateTeamId),
    teamController.delete.bind(teamController),
);

export { teamRoutes };