import { Account } from "@models/account";
import { Transaction } from "@models/transaction";
import { sequelize } from "@config/connection";
import { AppError } from "@utils/appError";

interface TransferParams {
  fromAccountNumber: string;
  toAccountNumber: string;
  amount: number;
  description?: string;
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

    
    const transaction = await Transaction.create({
      fromAccountId: sourceAccount.id, 
      toAccountId: destinationAccount.id, 
      amount,
      type: 'TRANSFER',
      status: 'PENDING',
      description
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
      sourceBalance: sourceAccount.balance - amount,
      timestamp: new Date()
    };
  });
};