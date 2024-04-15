import { ResponseData, grindDataSchema } from "@ecxtacy/pulse-keeper-common";
import express from "express";
import { HttpStatusCode } from "../lib/httpStatusCodes";
import db from "../db/db";

const getGrind = (req: express.Request, res: express.Response) => {};

const createGrind = async (req: express.Request, res: express.Response) => {
  const username = req.user?.username;

  const data = req.body;
  const validation = grindDataSchema.safeParse(data);

  if (validation.success) {
    const grind = username && (await db.grind.createGrind(data, username));
    return res
      .status(HttpStatusCode.OK)
      .json(new ResponseData(true, null, grind));
  } else {
    res
      .status(HttpStatusCode.BAD_REQUEST)
      .json(new ResponseData(false, null, { message: "Invalid data" }));
  }
};

const updateGrind = (req: express.Request, res: express.Response) => {};

const deleteGrind = (req: express.Request, res: express.Response) => {};

export const grindController = {
  getGrind,
  createGrind,
  updateGrind,
  deleteGrind,
};
