import { db } from "@/lib/db"
import { TransactionType } from "@prisma/client"


export async function createInvestment(
  userId: string,
  categoryId: string,
  principalAmount: number
) {
  const category = await db.investmentCategory.findUniqueOrThrow({
    where: { id: categoryId, isActive: true },
  })

  if (
    principalAmount < Number(category.minAmount) ||
    (category.maxAmount &&
      principalAmount > Number(category.maxAmount))
  ) {
    throw new Error("Invalid investment amount")
  }

  return db.investment.create({
    data: {
      userId,
      categoryId,
      principalAmount,
      roiRateSnapshot: category.monthlyRoiRate,
      durationMonths: category.durationMonths,
    },
  })
}

export async function createTransaction(
  userId: string,
  type: TransactionType,
  amount: number,
  proofUrl?: string
) {
  return db.transaction.create({
    data: {
      userId,
      type,
      amount,
      proofUrl,
    },
  })
}
