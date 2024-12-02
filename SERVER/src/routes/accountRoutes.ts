import express from "express";
import { 
  registerAccountController, 
  validateAccountController, 
  getAccountBalanceController,
  getTransactionHistoryController // Add this
} from "../controllers/accountController";
import { transferController } from "../controllers/transferController";

const router = express.Router();

// Existing routes
router.post("/register", registerAccountController);
router.post("/validate", validateAccountController);
router.get("/:accountNumber/balance", getAccountBalanceController);

// Remove verifyJWT middleware
router.post("/transfer", transferController); // Quitar verifyJWT

// Add new endpoint for transaction history
router.get("/:accountNumber/transactions", getTransactionHistoryController);

export default router;