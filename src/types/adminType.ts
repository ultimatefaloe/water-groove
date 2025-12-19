import {
  AdminRole,
  InvestorTier,
  InvestmentStatus,
  TransactionType,
  TransactionStatus,
} from "@prisma/client"

// ==============================
// ADMIN CONTEXT
// ==============================

export interface AdminSession {
  adminId: string
  role: AdminRole
  email: string
}

export interface AdminDashboardOverview {
  totalUsers: number
  totalActiveInvestments: number
  totalCapitalInvested: number
  totalRoiPaid: number

  pendingDeposits: number
  pendingWithdrawals: number
  pendingRoiApprovals: number

  systemHealth: "HEALTHY" | "WARNING" | "CRITICAL"
}

export interface AdminUserRow {
  id: string
  fullName: string
  email: string
  investorTier?: InvestorTier
  isActive: boolean

  totalDeposits: number
  totalInvestments: number
  walletBalance: number

  createdAt: string
}

export interface AdminUserDetail {
  user: AdminUserRow
  investments: AdminInvestmentRow[]
  transactions: AdminTransactionRow[]
}

export interface AdminInvestmentRow {
  id: string
  userId: string
  userName: string

  categoryName: string
  principalAmount: number
  roiRateSnapshot: number

  status: InvestmentStatus
  startDate?: string
  endDate?: string

  createdAt: string
}

export interface AdminTransactionRow {
  id: string
  userId: string
  userName: string

  investmentId?: string
  type: TransactionType
  status: TransactionStatus

  amount: number
  proofUrl?: string

  createdAt: string
}

export interface ApproveTransactionPayload {
  transactionId: string
  action: "APPROVE" | "REJECT"
  note?: string
}

export interface RoiSummary {
  eligibleInvestments: number
  totalRoiToBeGenerated: number
  lastRunAt?: string
}

export interface TriggerRoiCronPayload {
  runForDate?: string
}

export interface ManualRoiCreditPayload {
  investmentId: string
  amount: number
  description?: string
}

export interface AdminInvestmentCategory {
  id: string
  name: string
  minAmount: number
  maxAmount?: number
  monthlyRoiRate: number
  durationMonths: number
  isActive: boolean
  createdAt: string
}

export interface CreateCategoryPayload {
  name: string
  minAmount: number
  maxAmount?: number
  monthlyRoiRate: number
  durationMonths: number
  description?: string
}

export interface UpdateCategoryPayload extends Partial<CreateCategoryPayload> {
  isActive?: boolean
}

export interface AdminPermission {
  canApproveTransactions: boolean
  canManageUsers: boolean
  canManageCategories: boolean
  canTriggerRoi: boolean
  canViewAuditLogs: boolean
}

export interface AdminAuditLog {
  id: string
  adminId: string
  action: string
  entity: "USER" | "INVESTMENT" | "TRANSACTION" | "CATEGORY"
  entityId: string
  metadata?: Record<string, any>
  createdAt: string
}

export interface AdminLayoutData {
  admin: {
    id: string
    fullName: string
    role: AdminRole
  }
  permissions: AdminPermission
  children: React.ReactNode
}
