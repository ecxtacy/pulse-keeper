import express from "express";
import { userController } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.get("/profile", userController.getProfile);
userRouter.post("/", userController.createUser);
userRouter.put("/", userController.updateProfile);
userRouter.delete("/", userController.deleteUser);

export default userRouter;
