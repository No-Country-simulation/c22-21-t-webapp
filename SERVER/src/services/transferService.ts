import { Account } from "@models/account";
import { Transaction } from "@models/transaction";
import { sequelize } from "@config/connection";
import { AppError } from "@utils/appError";
import { Op } from "sequelize";

interface TransferParams {
  fromAccountNumber: string;
  toAccountNumber: string;
  amount: number;
  description?: string;
}
interface SuspiciousParams {
  accountId: number;
  amountThreshold: number;
  transactionLimit: number;
  timeWindowInHours: number;
}

export const transferFunds = async ({
  fromAccountNumber,
  toAccountNumber,
  amount,
  description
}: TransferParams) => {
  
  return await sequelize.transaction(async (t) => {
   
    const sourceAccount = await Account.findOne({
      where: { accountNumber: fromAccountNumber, active: true },
      transaction: t,
      lock: true
    });

    if (!sourceAccount) {
      throw new AppError("Cuenta origen no encontrada o inactiva", 404);
    }

    
    const destinationAccount = await Account.findOne({
      where: { accountNumber: toAccountNumber, active: true },
      transaction: t,
      lock: true
    });
    if (!destinationAccount) {
      throw new AppError("Cuenta destino no encontrada o inactiva", 404);
    }
    if (sourceAccount.balance < amount) {
      throw new AppError("Fondos insuficientes", 400);
    }

    const isSuspicious = await checkSuspiciousTransaction({
      accountId: sourceAccount.id,
      amountThreshold: 10000, // X monto límite
      transactionLimit: 5,   // Y número de transacciones
      timeWindowInHours: 1,  // Z tiempo en horas
    });

    const transaction = await Transaction.create({
      fromAccountId: sourceAccount.id, 
      toAccountId: destinationAccount.id, 
      amount,
      type: 'TRANSFER',
      status: 'PENDING',
      description,
      suspicious:isSuspicious
    }, { transaction: t });
    await sourceAccount.update({
      balance: sourceAccount.balance - amount
    }, { transaction: t });

    await destinationAccount.update({
      balance: destinationAccount.balance + amount
    }, { transaction: t });

 
    await transaction.update({ status: 'COMPLETED' }, { transaction: t });

    return {
      transactionId: transaction.id,
      status: 'COMPLETED',
      suspicious: isSuspicious,
      sourceBalance: sourceAccount.balance - amount,
      timestamp: new Date()
    };
  });



  
};

export const checkSuspiciousTransaction = async ({
  accountId,
  amountThreshold,
  transactionLimit,
  timeWindowInHours,
}: SuspiciousParams): Promise<boolean> => {
  const recentTransactions = await Transaction.findAll({
    where: {
      fromAccountId: accountId,
      createdAt: {
        [Op.gte]: new Date(Date.now() - timeWindowInHours * 60 * 60 * 1000),
      },
    },
  });

  const totalAmount = recentTransactions.reduce((sum, txn) => sum + txn.amount, 0);

  return (
    recentTransactions.length >= transactionLimit || 
    totalAmount >= amountThreshold
  );
};