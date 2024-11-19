import express from "express";
import { getAll } from "@controllers/userController";
import { login } from "@controllers/authController";

export const userRouter = express.Router();

userRouter.route("/users").get(getAll);
userRouter.route("/login").post(login);
