import { Router } from "express";
import { TeamController } from "@/controller/team-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { validateParams } from "@/middlewares/validate-schema";
import { createTeamSchema, updateTeamScehma, validateTeamId } from "@/schemas/teamSchema";
import { verifyUserAuthorizations } from "@/middlewares/verify-user-authorization";

const teamRoutes = Router();
const teamController = new TeamController();

teamRoutes.post("/",
    validateParams(createTeamSchema),
    verifyUserAuthorizations(['admin']),
    teamController.create.bind(teamController),
);

teamRoutes.get("/",
    verifyUserAuthorizations(['admin']),
    teamController.index.bind(teamController)
);

teamRoutes.put("/:id",
    validateParams(updateTeamScehma),
    verifyUserAuthorizations(['admin']),
    teamController.update.bind(teamController)
);

teamRoutes.delete("/:id",
    validateParams(validateTeamId),
    verifyUserAuthorizations(['admin']),
    teamController.delete.bind(teamController),
);

export { teamRoutes };