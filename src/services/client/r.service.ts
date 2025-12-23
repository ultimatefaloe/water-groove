import { prisma } from "@/lib/prisma"
import { DashboardOverviewData, CategoryDto, BankDetails, ApiResponse, TransactionDto, TransactionResponse, TransactionQueryParams, InvestmentDto } from "@/types/type"
import { mapCategoryToDto, mapInvestmentToDto, mapInvestmentWithCategoryToDto, mapTransactionToDto, mapUserToDto } from '@/utils/mapper';
import { TransactionStatus, TransactionType } from "@prisma/client"

export async function getDashboardOverview(
  userId: string
): Promise<DashboardOverviewData> {

  const [
    user,
    category,
    investments,
    transactions,
    pendingWithdrawalsTotal,
    pendingDepositsTotal
  ] = await Promise.all([
    prisma.user.findUniqueOrThrow({ where: { id: userId } }),
    prisma.investmentCategory.findFirst({ where: { users: { some: { id: userId } } }, include: { users: false } }),
    prisma.investment.findMany({
      where: { userId, status: "ACTIVE" },
      include: { category: true },
    }),
    prisma.transaction.findMany({ where: { userId } }),
    prisma.transaction.aggregate({
      where: { userId, type: TransactionType.WITHDRAWAL, status: TransactionStatus.PENDING },
      _sum: { amount: true } // assuming your transactions have an `amount` field
    }),
    prisma.transaction.aggregate({
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

  console.log(category)

  return {
    user: mapUserToDto(user),
    category: category ? mapCategoryToDto(category) : null,
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
  ApiResponse<CategoryDto[]>
> {
  const ic = await prisma.investmentCategory.findMany()

  return {
    success: true,
    message: "Investment categories retrieved successfully",
    data: ic.map(mapCategoryToDto)
  }
}

export async function getInvestmentCategory(
  id: string
): Promise<ApiResponse<CategoryDto | null>> {
  const ic = await prisma.investmentCategory.findUnique({
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
    data: mapCategoryToDto(ic),
  }
}

export async function getPlatformBankDetails(): Promise<BankDetails | null> {
  const details = await prisma.platformBankAccount.findFirst({
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

export async function getTransactions(
  userId: string,
  query?: TransactionQueryParams
): Promise<ApiResponse<TransactionResponse>> {
  const page = Math.max(Number(query?.page) || 1, 1);
  const limit = Math.min(Number(query?.limit) || 20, 100);
  const skip = (page - 1) * limit;

  const where = {
    userId,
    ...(query?.type && { type: query?.type }),
    ...(query?.status && { status: query?.status }),
    ...(query?.from || query?.to
      ? {
        createdAt: {
          ...(query?.from && { gte: new Date(query?.from) }),
          ...(query?.to && { lte: new Date(query?.to) }),
        },
      }
      : {}),
  };

  const orderBy = {
    [query?.sortBy ?? "createdAt"]: query?.sortOrder ?? "desc",
  } as const;

  const [transactions, total] = await Promise.all([
    prisma.transaction.findMany({
      where,
      orderBy,
      skip,
      take: limit,
    }),
    prisma.transaction.count({ where }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    success: true,
    message: "Transactions retrieved successfully",
    data: {
      transactions: transactions.map(mapTransactionToDto),
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    }
  };
}

export async function getInvestments(
  userId: string,
): Promise<ApiResponse<InvestmentDto[] | null>> {

  try {
    const ivst = await prisma.investment.findMany({
      where: {
        userId: userId
      }
    })

    return {
      success: true,
      message: "Transactions retrieved successfully",
      data: ivst.map(mapInvestmentToDto)
    };

  } catch (error: any) {
    console.error(error)
    return {
      success: false,
      message: error.message || "Something went wrong",
      data: null
    }
  }

}