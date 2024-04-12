import express from "express";
import { profileController } from "../controllers/profile.controller";

const profileRouter = express.Router();

profileRouter.get("/", profileController.getProfile);
profileRouter.post("/", profileController.createProfile);
profileRouter.put("/", profileController.updateProfile);

export default profileRouter;
