import { Router } from "express";
import { CoachController } from "@/controller/coach-controller";
import { validateBody, validateParams } from "@/middlewares/validate-schema";
import { createCoachSchema, updateCoachSchema, validateCoachId } from "@/schemas/coachSchema";
import { verifyUserAuthorizations } from "@/middlewares/verify-user-authorization";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";

const coachRoutes = Router();
const coachController = new CoachController()

coachRoutes.get("/admin",
    verifyUserAuthorizations(["admin"]),
    coachController.index.bind(coachController)
);

coachRoutes.post("/admin",
    verifyUserAuthorizations(["admin"]),
    validateBody(createCoachSchema),
    coachController.create.bind(coachController)
);

coachRoutes.put("/admin/:id",
    verifyUserAuthorizations(["admin"]),
    validateParams(validateCoachId),
    validateBody(updateCoachSchema),
    coachController.update.bind(coachController)
);

coachRoutes.delete("/admin/:id",
    verifyUserAuthorizations(["admin"]),
    validateParams(validateCoachId),
    coachController.delete.bind(coachController)
);

export { coachRoutes };