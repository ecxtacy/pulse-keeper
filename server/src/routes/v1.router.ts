import express from "express";
import grindRouter from "./grind.router";
import userRouter from "./user.router";

const v1Router = express.Router();

v1Router.post("/signup", () => {});
v1Router.post("/signin", () => {});

v1Router.use("/profile", userRouter);
v1Router.use("/grind", grindRouter);

export default v1Router;
