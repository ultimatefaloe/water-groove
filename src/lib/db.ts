import { prisma } from "./prisma";

export const db = {
  user: prisma.user,
  admin: prisma.admin,
  investment: prisma.investment,
  category: prisma.investmentCategory,
  transaction: prisma.transaction,
};

export type DB = typeof db;
