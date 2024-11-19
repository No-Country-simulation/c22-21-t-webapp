import { login } from "@controllers/authController";
import express from "express";


export const authRouter = express.Router();

authRouter.route("/login").post(login);