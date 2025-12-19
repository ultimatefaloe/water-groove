"use server"

import { requireUser } from "@/lib/auth"
import { withdrawalFormSchema, depositFormSchema } from "@/lib/zod"
import { createTransaction } from "@/services/transaction.service"
import { TransactionType } from "@/types/type"

export async function depositAction(payload: unknown) {
  const { userId } = await requireUser()
  const data = depositFormSchema.parse(payload)
  return createTransaction(userId, TransactionType.DEPOSIT, data.amount, data.proofUrl)
}

export async function withdrawAction(payload: unknown) {
  const { userId } = await requireUser()
  const data = withdrawalFormSchema.parse(payload)
  return createTransaction(userId, TransactionType.WITHDRAWAL, data.amount)
}
