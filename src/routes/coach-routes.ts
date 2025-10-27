import { Router } from "express";
import { CoachController } from "@/controller/coach-controller";
import { validateBody, validateParams } from "@/middlewares/validate-schema";
import { createCoachSchema, updateCoachSchema, validateCoachId } from "@/schemas/coachSchema";

const coachRoutes = Router();
const coachController = new CoachController()

coachRoutes.get("/",
    coachController.create.bind(coachController)
);

coachRoutes.post("/",
    validateBody(createCoachSchema),
    coachController.create.bind(coachController)
);

coachRoutes.put("/:id", 
    validateParams(validateCoachId),
    validateBody(updateCoachSchema),
    coachController.update.bind(coachController)
);

coachRoutes.delete("/:id",
    validateParams(validateCoachId),
    coachController.delete.bind(coachController)
);

export { coachRoutes };