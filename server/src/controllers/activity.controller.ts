import express from "express";
import { HttpStatusCode } from "../lib/httpStatusCodes";
import { ResponseData, activityDataSchema } from "@ecxtacy/pulse-keeper-common";
import db from "../db/db";

const createActivity = async (req: express.Request, res: express.Response) => {
  const data = req.body;
  const validation = activityDataSchema.safeParse(data);

  if(validation.success) {
    try {
      const activity = await db.activity.createActivity(data);
      res.status(HttpStatusCode.OK).json(new ResponseData(true, null, activity));
    } catch(err) {
      console.log(err);
      res.status(500).json(new ResponseData(false, null, { message: "Error inserting into the database." }));
    }
    
  } else {
    res.status(HttpStatusCode.BAD_REQUEST).json(new ResponseData(false, null, { message: "Incorrect data" }));
  }
};

const getActivity = async () => {};

const editActivity = async () => {};

const deleteActivity = async () => {};

export const activityController = {
  createActivity,
  getActivity,
  editActivity,
  deleteActivity
};