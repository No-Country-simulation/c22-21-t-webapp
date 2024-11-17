import express from "express";
import { getAll } from "@controllers/userController";

export const userRouter = express.Router();

userRouter.route("/users").get(getAll);
