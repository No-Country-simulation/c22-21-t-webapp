import express from "express";
import { getAll, updateProfile, deleteUser } from "@controllers/userController";

export const userRouter = express.Router();

userRouter.route("/users").get(getAll);
userRouter.route("/users/:id").put(updateProfile);
userRouter.route("/users/:id").delete(deleteUser);