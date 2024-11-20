import { Request, Response } from "express";
import { loginService } from "../services/authServices";

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const result = await loginService(email, password);
    res.status(200).json({
      message: "Login successful",
      ...result,
    });
  } catch (error: any) {
    if (error.message === "User not found") {
      res.status(404).json({ message: error.message });
    } else if (error.message === "Incorrect credentials") {
      res.status(401).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  }
};