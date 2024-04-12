import express from "express";

const getGrind = (req: express.Request, res: express.Response) => {};
const createGrind = (req: express.Request, res: express.Response) => {};
const updateGrind = (req: express.Request, res: express.Response) => {};
const deleteGrind = (req: express.Request, res: express.Response) => {};

export const grindController = {
  getGrind,
  createGrind,
  updateGrind,
  deleteGrind,
};
