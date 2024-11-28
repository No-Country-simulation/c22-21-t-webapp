import { Account } from "@models/account";
import { Transaction } from "@models/transaction";
import { sequelize } from "@config/connection";
import { AppError } from "@utils/appError";

interface TransferParams {
  fromAccountId: number;
  toAccountNumber: string;
  amount: number;
}

export const transferFunds = async ({ fromAccountId, toAccountNumber, amount }: TransferParams) => {
  const transaction = await sequelize.transaction();

  try {
    const sourceAccount = await Account.findByPk(fromAccountId, { transaction });
    if (!sourceAccount || !sourceAccount.active) {
      throw new AppError("Source account not found or inactive", 404);
    }

    const destAccount = await Account.findOne({ 
      where: { accountNumber: toAccountNumber, active: true },
      transaction 
    });
    if (!destAccount) {
      throw new AppError("Destination account not found or inactive", 404);
    }

    const currentBalance = Number(sourceAccount.balance);
    if (currentBalance < amount) {
      throw new AppError("Insufficient funds", 400);
    }

    const transactionRecord = await Transaction.create({
      fromAccountId: sourceAccount.id,
      toAccountId: destAccount.id,
      amount,
      status: 'pending'
    }, { transaction });

    await sourceAccount.decrement('balance', { by: amount, transaction });
    await destAccount.increment('balance', { by: amount, transaction });

    await transactionRecord.update({ status: 'completed' }, { transaction });

    await transaction.commit();

    return {
      message: "Transfer completed successfully",
      transactionId: transactionRecord.get('id')
    };

  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}