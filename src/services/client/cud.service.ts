import { prisma } from "@/lib/prisma"
import { getServerUserId } from "@/lib/server/auth0-server"
import { ApiResponse, BankDetails, CreateDeposit, WithdrawalRequestDto } from "@/types/type"
import { TransactionStatus, TransactionType } from "@prisma/client"
import { getPlatformBankDetails } from "./r.service"


export async function validateTierAmount(amount: number, catId: string) {

  const ic = await prisma.investmentCategory.findFirst({
    where: {
      code: catId
    }
  })

  if (!ic) return {
    success: false,
    message: 'No investent category found',
    data: null
  };


  if (typeof amount !== 'number' || isNaN(amount)) {
    return {
      success: false,
      message: "Invalid amount. Must be a number.",
      data: null,
    }
  }

  if (amount < Number(ic?.minAmount)) {
    return {
      success: false,
      message: `Amount is too low. Minimum allowed is ${ic?.minAmount}.`,
      data: null
    }
  }

  if (amount > Number(ic?.maxAmount)) {
    return {
      success: false,
      message: `Amount is too high. Maximum allowed is ${ic?.maxAmount}.`,
      data: null
    };
  }

  return {
    success: true,
    message: '',
    data: ic
  }; // valid amount
}

export async function createDepositService({
  investmentCatId,
  amount,
  description,
}: CreateDeposit): Promise<ApiResponse<BankDetails | null>> {

  const userId = await getServerUserId()

  if (!userId) return {
    success: false,
    message: "Invalid userId",
    data: null
  }

  const { success, message, data } = await validateTierAmount(amount, investmentCatId)

  if (!success && data) return {
    success: false,
    message,
    data: null
  };

  try {
    await prisma.$transaction(async (tx) => {
      const innst = await tx.investment.create({
        data: {
          userId,
          categoryId: data ? data?.id : '',
          principalAmount: amount,
          roiRateSnapshot: data?.monthlyRoiRate ??  2,
          durationMonths: data?.durationMonths ?? 18,
        }
      })
  
      await tx.transaction.create({
        data: {
          userId,
          investmentId: innst?.id,
          type: TransactionType.DEPOSIT,
          status: TransactionStatus.PENDING,
          amount,
          description,
        }
      })
    })
    
    const bds = await getPlatformBankDetails()
  
    return {
      success: true,
      message: "Transaction created successfully, upload proof of payment",
      data: bds
    }
  } catch (error: any) {
    console.error(error)
    return {
      success: true,
      message: error.message || "Something went wrong",
    }
  }

}

export async function uploadDepositProofService(
  proofUrl?: string
): Promise<ApiResponse<null>> {

  const userId = await getServerUserId()
  if (!proofUrl) {
    return {
      success: false,
      message: "Proof Url must be provided",
      data: null
    }
  }

  const txn = await prisma.transaction.findFirst({
    where: {
      userId,
      type: TransactionType.DEPOSIT,
      status: TransactionStatus.PENDING
    }
  })

  if (!txn) {
    return {
      success: false,
      message: "No transaction record found",
      data: null
    }
  }

  await prisma.transaction.update({
    where: {
      id: txn.id
    },
    data: {
      proofUrl,
      updatedAt: new Date()
    }
  })


  return {
    success: true,
    message: "Proof of paymnet uploaded successfully",
    data: null
  }
}


export async function withdrawalRequestService({
  bankName,
  accountNumber,
  accountHolderName,
  amount,
}: WithdrawalRequestDto): Promise<ApiResponse<WithdrawalRequestDto | null>> {

  const userId = await getServerUserId()

  if (!userId) return {
    success: false,
    message: "Invalid userId",
    data: null
  }

  try {
    const inst = await prisma.investment.findFirst({
      where: {
        userId
      }
    })
    const balance = await prisma.investorBalance.findUniqueOrThrow({
      where: { investmentId: inst?.id },
    })

    if (+amount > Number(balance?.availableBalance) + Number(balance?.principalLocked)) {
      throw new Error("Insufficient balance")
    }

    const txn = await prisma.transaction.create({
      data: {
        userId,
        investmentId: inst?.id,
        type: TransactionType.WITHDRAWAL,
        amount: +amount,
        status: TransactionStatus.PENDING,
      },
    })

    await prisma.withdrawalDetail.create({
      data: {
        transactionId: txn.id,
        accountHolderName: String(accountHolderName),
        accountNumber: String(accountNumber),
        bankName: String(bankName),
      },
    })

    return {
      success: true,
      message: "Withdrawal request created successfully, wait while we process you request",
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