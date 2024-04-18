import express from "express";
import { grindController } from "../controllers/grind.controller";
import activityRouter from "./activity.router";

const grindRouter = express.Router();

grindRouter.use("/activity", activityRouter);

grindRouter.get("/", grindController.getGrind);
grindRouter.post("/", grindController.createGrind);
grindRouter.put("/", grindController.updateGrind);
grindRouter.delete("/", grindController.deleteGrind);

export default grindRouter;
