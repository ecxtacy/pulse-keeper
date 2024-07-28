import express from "express";
import {
  UserData,
  userDataSchema,
  userEditDataSchema,
} from "../interfaces/userData";
import { ResponseData } from "../interfaces";
import { HttpStatusCode } from "../lib/httpStatusCodes";
import db from "../db/db";

const getProfile = async (req: express.Request, res: express.Response) => {
  const username = req.user?.username;
  console.log("username", username);
  const profile = username ? await db.user.getProfile(username) : null;

  res.status(HttpStatusCode.OK).json(new ResponseData(true, null, { profile }));
};

const createUser = async (req: express.Request, res: express.Response) => {
  // zod input validation
  const data: UserData = req.body;
  data.dob = data.dob ? new Date(data.dob) : data.dob;
  const validation = userDataSchema.safeParse(data);
  
  if (validation.success) {
    // Check if user exists with same credentials.
    // If not, create new user and return success response.
    // Otherwise send error response.
    
    const userExists = await db.user.checkUserExists(data.username, data.email);
    if (userExists) {
      res.status(HttpStatusCode.BAD_REQUEST).json(
        new ResponseData(false, null, {
          message: "User already exists, try different credentials.",
        }),
      );
      return;
    }

    // Add user to the database.
    try {
      await db.user.createUser(data);
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
      .json(new ResponseData(false, validation.error, {}));
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
    username && (await db.user.editUserData(validation.data, username));
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
    username && (await db.user.deleteUser(username));
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
