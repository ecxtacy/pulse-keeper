import express from "express";
import { UserCredentials } from "../types/auth";
import db from "../db/db";
import { verifyPassword } from "../lib/bcrypt";
import { HttpStatusCode } from "../lib/httpStatusCodes";
import { ResponseData } from "../interfaces";
import { generateJWT } from "../lib/jwt";

const signinUser = async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  const userCredentials: UserCredentials = req.body;
  const user = await db.user.findUserPassword(userCredentials.username);
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
      const jwtToken = generateJWT({ username: userCredentials.username });
      res.cookie("Pulse_keeper_token", jwtToken, {
        httpOnly: true,
        sameSite: true,
        maxAge: 60 * 60,
      });
      res.json(new ResponseData(true, null, { token: jwtToken }));
    } else {
      // Return response saying incorrect password.
      res
        .status(HttpStatusCode.BAD_REQUEST)
        .json(new ResponseData(false, null, { message: "Invalid password" }));
    }
  }
};

const logoutUser = async (req: express.Request, res: express.Response) => {
  res.clearCookie("Pulse_keeper_token");
  res
    .status(HttpStatusCode.OK)
    .json(new ResponseData(true, null, { message: "Logged out" }));
};

export const authController = { signinUser, logoutUser };
