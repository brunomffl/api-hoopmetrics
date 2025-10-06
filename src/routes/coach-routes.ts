import { Router } from "express";
import { CoachController } from "@/controller/coach-controller";
import { validateBody } from "@/middlewares/validate-schema";
import { createCoachSchema } from "@/schemas/coachSchema";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";

const coachController = new CoachController()
const coachRoutes = Router();

coachRoutes.post("/",
    ensureAuthenticated,
    validateBody(createCoachSchema),
    coachController.create.bind(coachController)
);

export { coachRoutes };