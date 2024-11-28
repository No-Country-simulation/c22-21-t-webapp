import express from "express";
import { createTransfer } from "@controllers/transferController";
import { verifyJWT } from "@utils/verifyJWT";

export const transferRouter = express.Router();

transferRouter.post("/", verifyJWT, createTransfer);