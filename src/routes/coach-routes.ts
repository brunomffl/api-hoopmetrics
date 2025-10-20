import { Router } from "express";
import { CoachController } from "@/controller/coach-controller";
import { validateBody, validateParams } from "@/middlewares/validate-schema";
import { createCoachSchema, updateCoachSchema, validateCoachId } from "@/schemas/coachSchema";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";

const coachRoutes = Router();
const coachController = new CoachController()

coachRoutes.post("/",
    validateBody(createCoachSchema),
    coachController.create.bind(coachController)
);

coachRoutes.put("/:id", 
    validateParams(validateCoachId),
    validateBody(updateCoachSchema),
    coachController.update.bind(coachController)
);

export { coachRoutes };