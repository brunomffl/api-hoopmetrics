import { Router } from "express";
import { TeamController } from "@/controller/team-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { validateParams } from "@/middlewares/validate-schema";
import { validateTeamId } from "@/schemas/teamSchema";
import { verifyUserAuthorizations } from "@/middlewares/verify-user-authorization";

const teamRoutes = Router();
const teamController = new TeamController();

teamRoutes.post("/",
    verifyUserAuthorizations(['admin']),
    teamController.create.bind(teamController),
);

teamRoutes.delete("/:id",
    validateParams(validateTeamId),
    verifyUserAuthorizations(['admin']),
    teamController.delete.bind(teamController),
);

export { teamRoutes };