import express from "express";
import grindRouter from "./grind.router";
import profileRouter from "./profile.router";

const v1Router = express.Router();

v1Router.post("/signup", () => {});
v1Router.post("/signin", () => {});

v1Router.use("/profile", profileRouter);
v1Router.use("/grind", grindRouter);

export default v1Router;
