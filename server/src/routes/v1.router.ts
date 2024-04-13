import express from "express";
import grindRouter from "./grind.router";
import userRouter from "./user.router";
import { userController } from "../controllers/user.controller";

const v1Router = express.Router();

v1Router.get("/", (req, res) => {
  res.send("pulse-keeper api");
});

v1Router.post("/signup", userController.createUser);
v1Router.post("/signin", () => {});

v1Router.use("/profile", userRouter);
v1Router.use("/grind", grindRouter);

export default v1Router;
