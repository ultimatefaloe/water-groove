import { PrismaClient } from "@prisma/client";
import { config } from "./config";

declare global {
  var prismaGlobal: PrismaClient | undefined;
}

export const prisma =
  global.prismaGlobal ??
  new PrismaClient({
    log: config.NODE_ENV === "development"
      ? ["query", "error", "warn"]
      : ["error"],
  });

if (config.NODE_ENV === "development") {
  global.prismaGlobal = prisma;
}
