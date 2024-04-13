import express from "express";
import { userController } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.get("/", userController.getProfile);
userRouter.put("/", userController.updateProfile);
userRouter.delete("/", userController.deleteUser);

export default userRouter;
