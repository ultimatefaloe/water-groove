import prisma from "@/lib/prisma"
import { TransactionStatus, TransactionType } from "@prisma/client"
import { AdminDashboardOverview, AdminUserQueryParams, AdminUserRow, AdminInvestmentQueryParams, AdminInvestmentRow, AdminTransactionQueryParams, AdminTransactionRow, PaginatedResponse } from "@/types/adminType"
import { ApiResponse } from "@/types/type"
import { buildDateFilter, buildOrder, buildPaginationMeta, paginate } from "@/lib/utils"
import { getServerAdminId } from "@/lib/server/auth0-server"
import { mapInvestmentToAdminRow, mapTransactionToAdminRow, mapUserToAdminRow } from "@/utils/mapper"

async function authorizeAdmin(adminId: string) {
  const authAdmin = await getServerAdminId()
  if (authAdmin !== adminId) throw new Error("Unauthorized")
}

export async function getTransactions(
  adminId: string,
  type: TransactionType,
  params: AdminTransactionQueryParams & { page?: number; limit?: number }
): Promise<ApiResponse<PaginatedResponse<AdminTransactionRow[]>>> {
  try {
    await authorizeAdmin(adminId)

    const page = params.page ?? 1
    const limit = params.limit ?? 20

    const where = {
      type,
      status: params.status,
      id: params.transactionId,
      createdAt: buildDateFilter(params.date)
    }

    const [total, transactions] = await prisma.$transaction([
      prisma.transaction.count({ where }),
      prisma.transaction.findMany({
        where,
        orderBy: buildOrder(params.order),
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          userId: true,
          investmentId: true,
          type: true,
          status: true,
          amount: true,
          proofUrl: true,
          description: true,
          processedAt: true,
          createdAt: true
        }
      })
    ])

    return {
      success: true,
      data: {
        data: transactions.map(mapTransactionToAdminRow),
        ...buildPaginationMeta(total, page, limit)
      }
    }
  } catch (error: any) {
    console.error(error)
    return { success: false, message: error.message }
  }
}


export async function getAllInvestments(
  adminId: string,
  params: AdminInvestmentQueryParams & { page?: number; limit?: number }
): Promise<ApiResponse<PaginatedResponse<AdminInvestmentRow[]>>> {
  try {
    await authorizeAdmin(adminId)

    const page = params.page ?? 1
    const limit = params.limit ?? 20

    const where = {
      userId: params.userId,
      categoryId: params.catergoryId,
      status: params.status,
      startDate: params.startDate ? { gte: params.startDate } : undefined,
      endDate: params.endDate ? { lte: params.endDate } : undefined
    }

    const [total, investments] = await prisma.$transaction([
      prisma.investment.count({ where }),
      prisma.investment.findMany({
        where,
        orderBy: buildOrder(params.order),
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          userId: true,
          categoryId: true,
          principalAmount: true,
          roiRateSnapshot: true,
          durationMonths: true,
          status: true,
          startDate: true,
          endDate: true,
          createdAt: true
        }
      })
    ])

    return {
      success: true,
      data: {
        data: investments.map(mapInvestmentToAdminRow),
        ...buildPaginationMeta(total, page, limit)
      }
    }
  } catch (error: any) {
    console.error(error)
    return { success: false, message: error.message }
  }
}


export async function getAllUsers(
  adminId: string,
  params: AdminUserQueryParams & { page?: number; limit?: number }
): Promise<ApiResponse<PaginatedResponse<AdminUserRow[]>>> {
  try {
    await authorizeAdmin(adminId)

    const page = params.page ?? 1
    const limit = params.limit ?? 20

    const [total, users] = await prisma.$transaction([
      prisma.user.count({
        where: {
          fullName: params.fullName
            ? { contains: params.fullName, mode: "insensitive" }
            : undefined,
          email: params.email,
          isActive: params.isActive,
          investmentCategoryId: params.investmentCategoryId
        }
      }),
      prisma.user.findMany({
        where: {
          fullName: params.fullName
            ? { contains: params.fullName, mode: "insensitive" }
            : undefined,
          email: params.email,
          isActive: params.isActive,
          investmentCategoryId: params.investmentCategoryId
        },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          fullName: true,
          email: true,
          phone: true,
          isActive: true,
          createdAt: true,
          investmentCategoryId: true
        }
      })
    ])

    return {
      success: true,
      data: {
        data: users.map(mapUserToAdminRow),
        ...buildPaginationMeta(total, page, limit)
      }
    }
  } catch (error: any) {
    console.error(error)
    return { success: false, message: error.message }
  }
}


export async function getAdminDashboardOverview(
  adminId: string
): Promise<ApiResponse<AdminDashboardOverview | null>> {
  try {
    const authAdmin = await getServerAdminId()
    if (authAdmin !== adminId) throw new Error("Unauthorized")

    const [
      users,
      investments,
      transactions
    ] = await prisma.$transaction([
      prisma.user.count(),

      prisma.investment.aggregate({
        _sum: { principalAmount: true },
        _count: true
      }),

      prisma.transaction.groupBy({
        by: ["type", "status"],
        _sum: { amount: true },
        _count: true
      })
    ])

    const totalDeposit = transactions.find(t => t.type === TransactionType.DEPOSIT)
    const totalWithdrawal = transactions.find(t => t.type === TransactionType.WITHDRAWAL)
    const totalRoi = transactions.find(t => t.type === TransactionType.INTEREST)

    const data: AdminDashboardOverview = {
      totalPrincipalAmount: Number(investments._sum.principalAmount) ?? 0,
      totalInvestment: investments._count,
      totalUsers: users,

      totalDepositAmount: Number(totalDeposit?._sum.amount) ?? 0,
      totalWithdrawalAmount: Number(totalWithdrawal?._sum.amount) ?? 0,
      totalRoiPaidAmount: Number(totalRoi?._sum.amount) ?? 0,

      totalDeposit: totalDeposit?._count ?? 0,
      totalWithdrawal: totalWithdrawal?._count ?? 0,

      totalPendingDeposit: transactions.filter(t =>
        t.type === TransactionType.DEPOSIT && t.status === TransactionStatus.PENDING
      ).length,

      totalPendingWithdrawal: transactions.filter(t =>
        t.type === TransactionType.WITHDRAWAL && t.status === TransactionStatus.PENDING
      ).length,

      totalActiveInvestment: 0, // can be extended
      totalPendingInvestment: 0,

      systemHealth: "HEALTHY"
    }

    return { success: true, message: "", data }
  } catch (error: any) {
    console.error(error)
    return { success: false, message: error.message, data: null }
  }
}

// getTransactions(adminId, TransactionType.WITHDRAWAL, params)
// getTransactions(adminId, TransactionType.DEPOSIT, params)
// getTransactions(adminId, TransactionType.INTEREST, params)
