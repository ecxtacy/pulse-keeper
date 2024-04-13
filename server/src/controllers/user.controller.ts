import express from "express";
import { userTypes } from "@ecxtacy/pulse-keeper-common";

const getProfile = (req: express.Request, res: express.Response) => {};
const createUser = (req: express.Request, res: express.Response) => {
  // zod input validation
  const data = req.body;
  const validation = userTypes.userDataSchema.safeParse(data);

  if (validation.success) {
    // Check if user exists with same credentials.
    // If not, create new user and return success response.
    // Otherwise send error response.
    res.send("validation success");
  } else {
    res.send("validation error");
  }
};
const updateProfile = (req: express.Request, res: express.Response) => {};
const deleteUser = (req: express.Request, res: express.Response) => {};

export const userController = {
  getProfile,
  createUser,
  updateProfile,
  deleteUser,
};
