"use server"

import { requireUser } from "@/lib/auth"
import { createInvestmentSchema } from "@/lib/zod"
import { createInvestment } from "@/services/investment.service"

export async function createInvestmentAction(payload: unknown) {
  const { userId } = await requireUser()
  const data = createInvestmentSchema.parse(payload)
  return createInvestment(userId, data.categoryId, data.principalAmount)
}
