
import express from "express";
import { getHistory } from "@controllers/transactionController";
import { createTransfer } from "@controllers/transferController";
import { verifyJWT } from "@utils/verifyJWT";

export const transactionRouter = express.Router();

transactionRouter.use(verifyJWT);
transactionRouter.get("/:accountId/history", getHistory);
transactionRouter.post("/transfer", createTransfer);