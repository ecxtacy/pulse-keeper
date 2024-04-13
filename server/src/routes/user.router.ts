import express from "express";
import { userController } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.get("/", userController.getProfile);
userRouter.post("/", userController.createUser);
userRouter.put("/", userController.updateProfile);

export default userRouter;
