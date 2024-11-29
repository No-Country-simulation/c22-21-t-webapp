import { Request, Response } from "express";
import { registerAccount, validateAccount, getAccountBalance } from "../services/accountService";

export const registerAccountController = async (req: Request, res: Response) => {
  try {
    const { accountNumber, userId, balance } = req.body;

    const newAccount = await registerAccount(accountNumber, userId, balance);

    return res.status(201).json({
      message: "Cuenta registrada exitosamente.",
      account: newAccount
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(400).json({ message: "Error desconocido." });
  }
};

export const validateAccountController = async (req: Request, res: Response) => {
  try {
    const { accountNumber, userId } = req.body;

    const account = await validateAccount(accountNumber, userId);

    return res.status(200).json({
      message: "Cuenta válida.",
      account
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(400).json({ message: "Error desconocido." });
  }
};

export const getAccountBalanceController = async (req: Request, res: Response) => {
  try {
    const { accountNumber } = req.params;

    const balance = await getAccountBalance(accountNumber);

    return res.status(200).json({
      message: "Saldo de la cuenta obtenido con éxito.",
      balance
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(400).json({ message: "Error desconocido." });
  }
};
