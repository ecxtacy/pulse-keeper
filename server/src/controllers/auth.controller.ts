import express from "express";
import { UserCredentials } from "../types/auth";
import db from "../db/db";
import { verifyPassword } from "../lib/bcrypt";
import { HttpStatusCode } from "../lib/httpStatusCodes";
import { ResponseData } from "../interfaces";
import { generateJWT } from "../lib/jwt";
import { logintoken__upsert } from "../db/login_token";
import { server_config } from "../config";

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
      // Generate JWT.
      const jwtToken = generateJWT({ username: userCredentials.username });

      if(server_config.single_place_only_login) {
        // Update the most recent JWT.
        await logintoken__upsert(userCredentials.username, jwtToken);
      }

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
