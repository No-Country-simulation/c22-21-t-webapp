import express from "express";
import { registerAccountController, validateAccountController, getAccountBalanceController } from "../controllers/accountController";

const router = express.Router();

router.post("/register", registerAccountController);
router.post("/validate", validateAccountController);
router.get("/:accountNumber/balance", getAccountBalanceController);

export default router;
