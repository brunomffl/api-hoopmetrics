import { Router } from "express";
import { CoachController } from "@/controller/coach-controller";
import { validateBody } from "@/middlewares/validate-schema";
import { createCoachSchema } from "@/schemas/coachSchema";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";

const coachRoutes = Router();
const coachController = new CoachController()

coachRoutes.post("/",
    //ensureAuthenticated,
    validateBody(createCoachSchema),
    coachController.create.bind(coachController)
);

export { coachRoutes };