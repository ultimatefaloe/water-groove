import { prisma } from './prisma';

export const db = {
  user: prisma.user,
  admin: prisma.admin,
  investmentCategory: prisma.investmentCategory,
  investment: prisma.investment,
  transaction: prisma.transaction,
  platformBankAccount: prisma.platformBankAccount
};

export type DB = typeof db;
