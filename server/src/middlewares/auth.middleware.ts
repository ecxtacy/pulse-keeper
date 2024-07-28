import express from "express";
import { decodeUsername, verifyJWT } from "../lib/jwt";
import { HttpStatusCode } from "../lib/httpStatusCodes";
import { ResponseData } from "../interfaces";
import { logintoken__get } from "../db/login_token";
import { server_config } from "../config";

// When the request has been authorized.
declare module "express" {
  interface Request {
    user?: { username: string };
  }
}

// Call this middleware to protect the route.
export const authorize = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {

  // if(process.env.NODE_ENV !== 'production') {
  //   next();
  //   return;
  // }

  const token = req.cookies["Pulse_keeper_token"];
  if (!token) {
    res.status(HttpStatusCode.FORBIDDEN).json(
      new ResponseData(false, null, {
        message: "Unauthorized, no token provided.",
      }),
    );
  } else {
    try {

      let proceed = true;

      if(server_config.single_place_only_login) {
        const username = decodeUsername(token);
        const logintoken = await logintoken__get(username);
        if(logintoken && logintoken.token !== token) {
          proceed = false;
        }
      }

      if(proceed) {
        const payload = verifyJWT(token);
        req.user = {
          username: payload.username,
        };
        next();
      } else {
        throw new Error("Can sign in only from one device at a time.")
      }

    
    } catch (err) {
      res.status(HttpStatusCode.FORBIDDEN).json(
        new ResponseData(false, err, {
          message: "Unauthorized, incorrect or expired token.",
        }),
      );
    }
  }
};
