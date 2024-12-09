import express from "express";
import {
  registerController,
  verifyRegisterController,
  login
} from "@controllers/authController";

export const authRouter = express.Router();

authRouter.post("/register", registerController);
authRouter.route("/login").post(login);
authRouter.post("/verifyRegister", verifyRegisterController);
