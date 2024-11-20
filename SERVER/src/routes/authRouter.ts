import express from "express";
import {
  registerController,
  verifyRegisterController,
} from "@controllers/authController";

export const authRouter = express.Router();

// Ruta de registro
authRouter.post("/register", registerController);

// Ruta para verificar registro
authRouter.post("/verifyRegister", verifyRegisterController);
