import { ApiResponse, BankDetails } from '../../types/type';
import { db } from "@/lib/db"
import { DashboardOverviewData, InvestmentCategoryDto } from "@/types/type"
import { mapBankDetailsToDto, mapInvestmentCategoryToDto, mapInvestmentWithCategoryToDto, mapTransactionToDto, mapUserToDto } from '@/utils/mapper';
import { PlatformBankAccount, TransactionStatus, TransactionType } from "@prisma/client"

export async function getDashboardOverview(
  userId: string
): Promise<DashboardOverviewData> {

  const [
    user,
    investments,
    transactions,
    pendingWithdrawalsTotal,
    pendingDepositsTotal
  ] = await Promise.all([
    db.user.findUniqueOrThrow({ where: { id: userId } }),
    db.investment.findMany({
      where: { userId, status: "ACTIVE" },
      include: { category: true },
    }),
    db.transaction.findMany({ where: { userId } }),
    db.transaction.aggregate({
      where: { userId, type: TransactionType.WITHDRAWAL, status: TransactionStatus.PENDING },
      _sum: { amount: true } // assuming your transactions have an `amount` field
    }),
    db.transaction.aggregate({
      where: { userId, type: TransactionType.DEPOSIT, status: TransactionStatus.PENDING },
      _sum: { amount: true } // same here
    }),
  ]);


  const wallet = transactions.reduce(
    (acc, tx) => {
      if (tx.status !== "APPROVED" && tx.status !== "PAID") return acc
      if (tx.type === "DEPOSIT") acc.totalDeposits += Number(tx.amount)
      if (tx.type === "WITHDRAWAL") acc.totalWithdrawals += Number(tx.amount)
      if (tx.type === "INTEREST") acc.totalInterest += Number(tx.amount)
      return acc
    },
    {
      totalDeposits: 0,
      totalWithdrawals: 0,
      totalInterest: 0,
    }
  )

  return {
    user: mapUserToDto(user),
    wallet: {
      ...wallet,
      currentBalance:
        wallet.totalDeposits +
        wallet.totalInterest -
        wallet.totalWithdrawals,
      pendingWithdrawals: Number(pendingWithdrawalsTotal?._sum?.amount),
      pendingDeposits: Number(pendingDepositsTotal?._sum?.amount),
    },
    activeInvestments: investments.map(inv =>
      mapInvestmentWithCategoryToDto(
        inv,
        wallet.totalInterest
      )
    ),
    pendingTransactions: transactions
      .filter(t => t.status === TransactionStatus.PENDING)
      .map(mapTransactionToDto),
  }
}


export async function getAllInvestmentCategory(): Promise<
  ApiResponse<InvestmentCategoryDto[]>
> {
  const ic = await db.investmentCategory.findMany()

  return {
    success: true,
    message: "Investment categories retrieved successfully",
    data: ic.map(mapInvestmentCategoryToDto)
  }
}

export async function getInvestmentCategory(
  id: string
): Promise<ApiResponse<InvestmentCategoryDto | null>> {
  const ic = await db.investmentCategory.findUnique({
    where: { id }
  })

  if (!ic) {
    return {
      success: false,
      message: "Failed to fetch data",
      data: null,
    }
  }

  return {
    success: true,
    message: "Investment category retrieved successfully",
    data: mapInvestmentCategoryToDto(ic),
  }
}

export async function getPlatformBankDetails(): Promise<BankDetails | null> {
  const details = await db.platformBankAccount.findFirst({
    where: {
      isActive: true,
      isDefault: true,
    },
  })

  if (!details) {
    return null
  }

  return {
    bankName: details.bankName,
    accountHolderName: details.accountHolderName,
    accountNumber: details.accountNumber,
    reference: `REF-WG-${Date.now()}`,
  }
}
