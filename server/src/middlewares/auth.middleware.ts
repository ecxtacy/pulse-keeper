import express from "express";
import { verifyJWT } from "../lib/jwt";
import { HttpStatusCode } from "../lib/httpStatusCodes";
import { ResponseData } from "@ecxtacy/pulse-keeper-common";

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
  const token = req.cookies["Pulse_keeper_token"];
  if (!token) {
    res
      .status(HttpStatusCode.FORBIDDEN)
      .json(new ResponseData(false, null, { message: "Unauthorized" }));
  } else {
    try {
      const payload = verifyJWT(token);
      req.user = {
        username: payload.username,
      };
      next();
    } catch (err) {
      res
        .status(HttpStatusCode.FORBIDDEN)
        .json(new ResponseData(false, null, { message: "Unauthorized" }));
    }
  }
};
