import { PrismaClient, Prisma } from "@prisma/client";
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
    auth0Id: "google-com|2342532452624645243",
    fullName: "Alice",
    email: "alice@prisma.io",
  },
  {
    auth0Id: "google-com|234253243352624645243",
    fullName: "Bob",
    email: "bob@prisma.io",
  }
];

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main();