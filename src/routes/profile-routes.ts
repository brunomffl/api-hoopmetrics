import { ProfileController } from "@/controller/profile-controller";
import { Router } from "express";

const profileController = new ProfileController();
const profileRoutes = Router();

profileRoutes.get("/",
    profileController.getProfile.bind(profileController)
);

export { profileRoutes };