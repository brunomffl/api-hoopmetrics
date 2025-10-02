import { Router } from "express";
import { CoachController } from "@/controller/coach-controller";

const coachController = new CoachController()
const coachRoutes = Router();

coachRoutes.get("/", coachController.create.bind(coachController));

export { coachRoutes };