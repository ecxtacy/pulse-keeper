import express from "express";
import {
  UserData,
  userDataSchema,
  userEditDataSchema,
} from "@ecxtacy/pulse-keeper-common";
import { ResponseData } from "@ecxtacy/pulse-keeper-common";
import { HttpStatusCode } from "../lib/httpStatusCodes";
import { checkUserExists, db } from "../db/user";

const getProfile = async (req: express.Request, res: express.Response) => {
  const username = req.user?.username;
  console.log("username", username);
  const profile = username ? await db.getProfile(username) : null;

  res.status(HttpStatusCode.OK).json(new ResponseData(true, null, { profile }));
};

const createUser = async (req: express.Request, res: express.Response) => {
  // zod input validation
  const data: UserData = req.body;
  const validation = userDataSchema.safeParse(data);

  if (validation.success) {
    // Check if user exists with same credentials.
    // If not, create new user and return success response.
    // Otherwise send error response.

    const userExists = await checkUserExists(data.username, data.email);
    if (userExists) {
      console.log("User already exists");
      res.status(HttpStatusCode.BAD_REQUEST).json(
        new ResponseData(false, null, {
          message: "User already exists, try different credentials.",
        }),
      );
      return;
    }

    // Add user to the database.
    try {
      await db.createUser(data);
    } catch (err) {
      console.log(err);
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json(new ResponseData(false, null, {}));
    }

    res
      .status(HttpStatusCode.OK)
      .json(
        new ResponseData(true, null, { message: "User created successfully." }),
      );
  } else {
    res
      .status(HttpStatusCode.BAD_REQUEST)
      .json(new ResponseData(false, null, {}));
  }
};

const updateProfile = async (req: express.Request, res: express.Response) => {
  // zod validation of data
  const data = req.body;
  const username = req.user?.username;
  const validation = userEditDataSchema.safeParse(data);

  if (validation.success) {
    // todo: first check if any user exists with the same username or email
    // then update the user profile
    username && (await db.editUserData(validation.data, username));
    res
      .status(HttpStatusCode.OK)
      .json(
        new ResponseData(true, null, { message: "User updated successfully." }),
      );
  } else {
    res
      .status(HttpStatusCode.BAD_REQUEST)
      .json(new ResponseData(false, null, { message: "Invalid data send" }));
  }
};

const deleteUser = async (req: express.Request, res: express.Response) => {
  const username = req.user?.username;
  try {
    username && (await db.deleteUser(username));
    res
      .status(HttpStatusCode.OK)
      .json(new ResponseData(true, null, { message: "User deleted" }));
  } catch (err) {
    console.log(err);
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json(
        new ResponseData(false, null, { message: "Unable to delete user." }),
      );
  }
};

export const userController = {
  getProfile,
  createUser,
  updateProfile,
  deleteUser,
};
