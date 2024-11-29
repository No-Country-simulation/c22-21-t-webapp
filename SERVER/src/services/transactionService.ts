import { Transaction } from "@models/transaction";
import { Op } from "sequelize";
import { AppError } from "@utils/appError";
import { Account } from "@models/account";

interface TransactionFilters {
  accountId: number;
  startDate?: string;
  endDate?: string;
  type?: 'incoming' | 'outgoing' | 'all';
  page?: number;
  limit?: number;
}

export const getTransactionHistory = async ({
  accountId,
  startDate,
  endDate,
  type = 'all',
  page = 1,
  limit = 10
}: TransactionFilters) => {
  const whereClause: any = {};
  
  
  if (startDate && endDate) {
    whereClause.createdAt = {
      [Op.between]: [new Date(startDate), new Date(endDate)]
    };
  }


  if (type === 'incoming') {
    whereClause.toAccountId = accountId;
  } else if (type === 'outgoing') {
    whereClause.fromAccountId = accountId;
  } else {
    whereClause[Op.or] = [
      { fromAccountId: accountId },
      { toAccountId: accountId }
    ];
  }

  const offset = (page - 1) * limit;

  const { count, rows } = await Transaction.findAndCountAll({
    where: whereClause,
    include: [
      {
        model: Account,
        as: 'fromAccount',
        attributes: ['accountNumber']
      },
      {
        model: Account,
        as: 'toAccount',
        attributes: ['accountNumber']
      }
    ],
    order: [['createdAt', 'DESC']],
    limit,
    offset
  });

  return {
    transactions: rows,
    pagination: {
      total: count,
      pages: Math.ceil(count / limit),
      currentPage: page,
      limit
    }
  };
};