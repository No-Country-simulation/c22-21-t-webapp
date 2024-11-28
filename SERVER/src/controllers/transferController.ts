import { Request, Response } from "express";
import { catchError } from "@middlewares/catchError";
import { transferFunds } from "@services/transferService";

export const createTransfer = catchError(async (req: Request, res: Response) => {
  const { fromAccountId, toAccountNumber, amount } = req.body;

  if (!fromAccountId || !toAccountNumber || !amount || amount <= 0) {
    return res.status(400).json({
      error: "Invalid transfer parameters"
    });
  }

  const result = await transferFunds({ fromAccountId, toAccountNumber, amount });
  return res.status(200).json(result);
});