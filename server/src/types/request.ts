import express from "express";

export interface AuthorizedRequest extends express.Request {
  user: {
    username: string;
  };
}
