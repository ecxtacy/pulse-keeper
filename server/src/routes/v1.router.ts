import express from "express";
import grindRouter from "./grind.router";
import userRouter from "./user.router";
import { userController } from "../controllers/user.controller";
import { authController } from "../controllers/auth.controller";
import { authorize } from "../middlewares/auth.middleware";

const v1Router = express.Router();

function apiGreet(req: express.Request, res: express.Response) {
  res.send("pulse-keeper api");
}

v1Router.get("/", apiGreet);

v1Router.post("/signup", userController.createUser);
v1Router.post("/signin", authController.signinUser);

v1Router.use("/profile", authorize, userRouter);
v1Router.use("/grind", authorize, grindRouter);

export default v1Router;
