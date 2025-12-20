/*
  Warnings:

  - You are about to drop the column `createdByAdminId` on the `InvestmentCategory` table. All the data in the column will be lost.
  - You are about to drop the column `investorTier` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "InvestmentCategory" DROP CONSTRAINT "InvestmentCategory_createdByAdminId_fkey";

-- DropIndex
DROP INDEX "User_investorTier_idx";

-- AlterTable
ALTER TABLE "InvestmentCategory" DROP COLUMN "createdByAdminId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "investorTier",
ADD COLUMN     "investorCategoryId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_investorCategoryId_fkey" FOREIGN KEY ("investorCategoryId") REFERENCES "InvestmentCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
