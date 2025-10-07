import { Router } from "express";
import { TeamController } from "@/controller/team-controller";

const teamRoutes = Router();
const teamController = new TeamController();

teamRoutes.post("/", teamController.create.bind(teamController));

export { teamRoutes };