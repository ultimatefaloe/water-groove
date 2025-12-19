"use server"

import { requireAdmin } from "@/lib/auth"
import { approveTransaction } from "@/services/admin/admin-transaction.service"

export async function approveTransactionAction(transactionId: string) {
  const { adminId } = await requireAdmin()
  return approveTransaction(adminId, transactionId)
}
