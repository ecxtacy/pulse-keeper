import express from "express";

const getProfile = (req: express.Request, res: express.Response) => {};
const createUser = (req: express.Request, res: express.Response) => {};
const updateProfile = (req: express.Request, res: express.Response) => {};

export const userController = { getProfile, createUser, updateProfile };
