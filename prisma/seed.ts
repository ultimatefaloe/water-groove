import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
  adapter,
});

const userData: Prisma.UserCreateInput[] = [
  {
    fullName: "Alice",
    email: "alice@prisma.io",
    passwordHash: "1235790ugfgchvcxgstredngfsr3whrsf"
  },
  {
    fullName: "Bob",
    email: "bob@prisma.io",
    passwordHash: "1235790ugfgchvcxgstredngfsr3whrsf"
  }
];

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main();