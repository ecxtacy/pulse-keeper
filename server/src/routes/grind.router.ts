import express from "express";
import { grindController } from "../controllers/grind.controller";

const grindRouter = express.Router();

grindRouter.get("/", grindController.getGrind);
grindRouter.post("/", grindController.createGrind);
grindRouter.put("/", grindController.updateGrind);
grindRouter.delete("/", grindController.deleteGrind);

export default grindRouter;
