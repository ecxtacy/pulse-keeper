import express from "express";
import { activityController } from "../controllers/activity.controller";

const activityRouter = express.Router();

activityRouter.get("/", activityController.getActivity);
activityRouter.post("/", activityController.createActivity);
activityRouter.put("/", activityController.editActivity);
activityRouter.delete("/", activityController.deleteActivity);


export default activityRouter;