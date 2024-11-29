import { Request, Response } from "express";
import { catchError } from "@middlewares/catchError";
import { getTransactionHistory } from "@services/transactionService";
import { AppError } from "@utils/appError";

export const getHistory = catchError(async (req: Request, res: Response) => {
  const accountId = Number(req.params.accountId);
  const { startDate, endDate, type, page, limit } = req.query;

  if (!accountId) {
    throw new AppError("Account ID is required", 400);
  }

 
  if (startDate && endDate) {
    const start = new Date(startDate as string);
    const end = new Date(endDate as string);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new AppError("Invalid date format", 400);
    }
    
    if (start > end) {
      throw new AppError("Start date cannot be after end date", 400);
    }
  }

  const result = await getTransactionHistory({
    accountId,
    startDate: startDate as string,
    endDate: endDate as string,
    type: type as 'incoming' | 'outgoing' | 'all',
    page: page ? Number(page) : undefined,
    limit: limit ? Number(limit) : undefined
  });

  return res.json(result);
});