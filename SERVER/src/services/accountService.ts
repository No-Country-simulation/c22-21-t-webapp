import { Account } from "@models/account";
import { User } from "../models/User";
import { Op } from "sequelize";

export const registerAccount = async (accountNumber: string, userId: number, balance: number) => {
    const existingAccount = await Account.findOne({ where: { accountNumber } });
    if (existingAccount) {
      throw new Error("El número de cuenta ya está registrado.");
    }
  
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("Usuario no encontrado.");
    }
  
    const newAccount = await Account.create({
      userId,
      accountNumber,
      balance,
      active: true
    });
  
    return newAccount;
  };
  

export const validateAccount = async (accountNumber: string, userId: number) => {
  const account = await Account.findOne({ where: { accountNumber } });
  if (!account) {
    throw new Error("Cuenta no encontrada.");
  }

  if (account.userId !== userId) {
    throw new Error("El número de cuenta no pertenece a este usuario.");
  }

  return account;
};

export const getAccountBalance = async (accountNumber: string) => {
  const account = await Account.findOne({
    where: { accountNumber, active: true }
  });

  if (!account) {
    throw new Error("Cuenta no encontrada o inactiva.");
  }

  return account.balance;
};
