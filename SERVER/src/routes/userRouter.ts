import express from "express";
import { getAll, updateProfile } from "@controllers/userController";

export const userRouter = express.Router();

userRouter.route("/users").get(getAll);
userRouter.route("/users/:id").put(updateProfile);