import { db } from "@/lib/db"
import { getServerUserId } from "@/lib/server/auth0-server"
import { ApiResponse, BankDetails, CreateDeposit } from "@/types/type"
import { TransactionStatus, TransactionType } from "@prisma/client"
import { getPlatformBankDetails } from "./r.service"


export async function validateTierAmount(amount: number, catId: string) {

  const ic = await db.investmentCategory.findFirst({
    where: {
      id: catId
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
  console.log({ amount, investmentCatId, description })

 const { success, message, data} = await validateTierAmount(amount, investmentCatId)

 if(!success) return {
  success: false,
  message,
  data: null
 };

 const inst = await db.investment.create({
    data: {
      userId,
      categoryId: investmentCatId,
      principalAmount: amount,
      roiRateSnapshot: data?.monthlyRoiRate ? data.monthlyRoiRate : 2,
      durationMonths: data?.durationMonths ? data.durationMonths : 18,
    }
  })

  if(!inst){
    return {
      success: false,
      message: "Failed to create investment",
      data: null
    }
  }

  await db.transaction.create({
    data: {
      userId,
      investmentId: inst?.id,
      type: TransactionType.DEPOSIT,
      amount,
      description,
    }
  })

  const bds = await getPlatformBankDetails()

  return {
    success: true,
    message: "Transaction created successfully, upload proof of payment",
    data: bds
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

  const txn = await db.transaction.findFirst({
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

  await db.transaction.update({
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
