import { Router } from "express";
import { TeamController } from "@/controller/team-controller";
import { validateBody, validateParams } from "@/middlewares/validate-schema";
import { verifyUserAuthorizations } from "@/middlewares/verify-user-authorization";
import { createTeamSchema, updateTeamScehma, validateTeamId } from "@/schemas/teamSchema";

const teamRoutes = Router();
const teamController = new TeamController();

teamRoutes.post("/admin",
    verifyUserAuthorizations(['admin']),
    validateBody(createTeamSchema),
    teamController.create.bind(teamController),
);

teamRoutes.get("/admin",
    verifyUserAuthorizations(['admin']),
    teamController.index.bind(teamController),
);


teamRoutes.put("/admin/:id",
    verifyUserAuthorizations(['admin']),
    validateParams(updateTeamScehma),
    teamController.update.bind(teamController),
);

teamRoutes.delete("/admin/:id",
    verifyUserAuthorizations(['admin']),
    validateParams(validateTeamId),
    teamController.delete.bind(teamController),
);

teamRoutes.get("/",
    verifyUserAuthorizations(['coach', 'player', 'admin']),
    teamController.getMyTeam.bind(teamController),
);
export { teamRoutes };