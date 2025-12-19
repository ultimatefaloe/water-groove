import { db } from "@/lib/db"
import { UserDto, DashboardOverviewData, InvestmentWithCategoryDto, TransactionDto } from "@/types/type"
import { Transaction, User, TransactionStatus, TransactionType } from "@prisma/client"

export function mapUser(prismaUser: User): UserDto {
  return {
    id: prismaUser.id,
    fullName: prismaUser.fullName,
    email: prismaUser.email,
    phone: prismaUser.phone ?? undefined,
    investorTier: prismaUser.investorTier ?? undefined,
    isActive: prismaUser.isActive,
    createdAt: prismaUser.createdAt.toISOString(),
  }
}


function mapTransaction(tx: Transaction): TransactionDto {
  return {
     id: tx.id,
    userId: tx.userId,
    investmentId: tx.investmentId ?? undefined,
    type: tx.type,
    status: tx.status,
    amount: Number(tx.amount),
    description: tx.description ?? undefined,
    processedAt: tx.processedAt?.toISOString(),
    createdAt: tx.createdAt.toISOString(),
  }
}


function mapInvestment(inv: any): InvestmentWithCategoryDto {
  return {
    ...inv,
    totalInterestEarned: Number(inv.totalInterestEarned),
    category: {
      ...inv.category,
      minAmount: Number(inv.category.minAmount),
      maxAmount: inv.category.maxAmount
        ? Number(inv.category.maxAmount)
        : undefined,
      monthlyRoiRate: Number(inv.category.monthlyRoiRate),
    },
  }
}


export async function getDashboardOverview(
  userId: string
): Promise<DashboardOverviewData> {

  const [user, investments, transactions] = await Promise.all([
    db.user.findUniqueOrThrow({ where: { id: userId } }),
    db.investment.findMany({
      where: { userId, status: "ACTIVE" },
      include: { category: true },
    }),
    db.transaction.findMany({ where: { userId } }),
  ])

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
    user: mapUser(user),
    wallet: {
      ...wallet,
      currentBalance:
        wallet.totalDeposits +
        wallet.totalInterest -
        wallet.totalWithdrawals,
      pendingWithdrawals: 0,
    },
    activeInvestments: investments.map(inv =>
      mapInvestment({
        ...inv,
        totalInterestEarned: wallet.totalInterest,
      })
    ),
    pendingTransactions: transactions
      .filter(t => t.status === TransactionStatus.PENDING)
      .map(mapTransaction),
  }
}

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

