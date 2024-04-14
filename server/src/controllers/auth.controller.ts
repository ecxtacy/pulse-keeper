import express from "express";
import { UserCredentials } from "../types/auth";
import { db } from "../db/user";
import { verifyPassword } from "../lib/bcrypt";
import { HttpStatusCode } from "../lib/httpStatusCodes";
import { ResponseData } from "@ecxtacy/pulse-keeper-common";

const signinUser = async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  const userCredentials: UserCredentials = req.body;
  const user = await db.findUser(userCredentials.username);
  if (!user) {
    // Return response saying incorrect username.
    res
      .status(HttpStatusCode.BAD_REQUEST)
      .json(new ResponseData(false, null, { message: "Invalid username" }));
  } else {
    const verified = await verifyPassword(
      userCredentials.password,
      user.password,
    );
    if (verified) {
      // Return JWT in the set-cookie header.
      res.json(user);
    } else {
      // Return response saying incorrect password.
      res
        .status(HttpStatusCode.BAD_REQUEST)
        .json(new ResponseData(false, null, { message: "Invalid password" }));
    }
  }
};

export const authController = { signinUser };
