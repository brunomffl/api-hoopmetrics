import { Router } from "express";
import { CoachController } from "@/controller/coach-controller";
import { validateBody } from "@/middlewares/validate-schema";
import { createCoachSchema } from "@/schemas/coachSchema";

const coachController = new CoachController()
const coachRoutes = Router();

coachRoutes.post("/",
    validateBody(createCoachSchema),
    coachController.create.bind(coachController)
);

export { coachRoutes };