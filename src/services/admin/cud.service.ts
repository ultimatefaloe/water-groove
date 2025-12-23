import { prisma } from "@/lib/prisma"
import { ApiResponse } from "@/types/type"
import { TransactionStatus } from "@prisma/client";


//Deposit
export async function approveDeposit(txnId: string, adminId: string): Promise<ApiResponse<null>> {
  if (!adminId || !txnId) return {
    success: false, message: "adminId or txnId is missing", data: null
  }
  try {
    await prisma.$transaction(async (tx) => {

      const txn = await tx.transaction.update({
        where: { id: txnId },
        data: {
          status: TransactionStatus.APPROVED,
          processedByAdminId: adminId,
          processedAt: new Date(),
        },
      })

      await tx.investorBalance.update({
        where: { investmentId: txn.investmentId! },
        data: {
          totalDeposited: { increment: txn.amount },
          principalLocked: { increment: txn.amount },
        },
      })
    });

    return {
      success: true,
      message: "Withdrawal request approved",
      data: null
    }
  } catch (error: any) {
    console.error(error)
    return {
      success: false,
      message: error.message,
      data: null
    }
  }
}


// Withdrawal
export async function approveWithdrawal(txnId: string, adminId: string): Promise<ApiResponse<null>> {
  if (!adminId || !txnId) return {
    success: false, message: "adminId or txnId is missing", data: null
  }
  try {
    await prisma.$transaction(async (tx) => {

      const txn = await tx.transaction.update({
        where: { id: txnId },
        data: {
          status: TransactionStatus.PAID,
          processedByAdminId: adminId,
          processedAt: new Date(),
        },
      })

      await tx.investorBalance.update({
        where: { investmentId: txn.investmentId! },
        data: {
          availableBalance: { decrement: txn.amount },
          totalWithdrawn: { increment: txn.amount },
        },
      })
    });
    return {
      success: true,
      message: "Withdrawal request approved",
      data: null
    }
  } catch (error: any) {
    console.error(error)
    return {
      success: false,
      message: error.message,
      data: null
    }
  }
}

export async function change(data: any): Promise<ApiResponse<null>> {
  try {

    return {
      success: true,
      message: '',
      data: data
    }
  } catch (error: any) {
    console.error(error)
    return {
      success: false,
      message: error.message,
      data: null
    }
  }
}