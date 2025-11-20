import { Router } from "express";
import { TeamController } from "@/controller/team-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { validateParams } from "@/middlewares/validate-schema";
import { createTeamSchema, updateTeamScehma, validateTeamId } from "@/schemas/teamSchema";
import { verifyUserAuthorizations } from "@/middlewares/verify-user-authorization";

const teamRoutes = Router();
const teamController = new TeamController();

teamRoutes.post("/admin",
    validateParams(createTeamSchema),
    verifyUserAuthorizations(['admin']),
    teamController.create.bind(teamController),
);

teamRoutes.get("/admin",
    verifyUserAuthorizations(['admin']),
    teamController.index.bind(teamController)
);

teamRoutes.put("/admin/:id",
    validateParams(updateTeamScehma),
    verifyUserAuthorizations(['admin']),
    teamController.update.bind(teamController)
);

teamRoutes.delete("/admin/:id",
    validateParams(validateTeamId),
    verifyUserAuthorizations(['admin']),
    teamController.delete.bind(teamController),
);

export { teamRoutes };