
import { InvestorTier, TransactionStatus, TransactionType, AdminRole, InvestmentStatus } from "@prisma/client"

export enum InvestmentStatusDto {
  PENDING_PAYMENT = "PENDING_PAYMENT",
  ACTIVE = "ACTIVE",
  PAUSED = "PAUSED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  REJECTED = "REJECTED",
}



// ==============================
// API RESPONSE WRAPPERS
// ==============================

export interface ApiResponse<T> {
  success: boolean
  message?: string
  data?: T
}

export interface ApiError {
  success: false
  message: string
  code?: string
  errors?: Record<string, string[]>
}

export interface UserDto {
  id: string
  fullName: string
  email: string
  phone?: string
  isActive: boolean
  createdAt: string
  investmentCategoryId: string
}

export interface AdminDto {
  id: string
  fullName: string
  email: string
  role: AdminRole
  isActive: boolean
  lastLoginAt?: string
}

export interface InvestmentCategoryDto {
  id: string
  name: string
  minAmount: number
  maxAmount?: number
  monthlyRoiRate: number
  durationMonths: number
  description?: string
  isActive: boolean
  createdAt: string
}

export interface InvestmentWithCategoryDto extends InvestmentDto {
  category: CategoryDto
  totalInterestEarned: number
}


export interface InvestmentDto {
  id: string
  userId: string
  categoryId: string

  principalAmount: number
  roiRateSnapshot: number
  durationMonths: number

  status: InvestmentStatus
  startDate?: string
  endDate?: string

  createdAt: string
}

export interface TransactionDto {
  id: string
  userId: string
  investmentId?: string

  type: TransactionType
  status: TransactionStatus
  amount: number

  proofUrl?: string
  description?: string

  processedAt?: string
  createdAt: string
}

export interface WalletSummaryDto {
  totalDeposits: number
  totalWithdrawals: number
  totalInterest: number
  currentBalance: number
  pendingWithdrawals: number
  pendingDeposits: number
}

//Dashboard
export interface DashboardOverviewData {
  user: UserDto
  category?: CategoryDto | null
  wallet: WalletSummaryDto
  activeInvestments: InvestmentWithCategoryDto[]
  pendingTransactions: TransactionDto[]
  nextRoiDate?: string
}

//Investment
export interface InvestmentsPageData {
  investments: InvestmentWithCategoryDto[]
}

//InvestmentDetail
export interface InvestmentDetailData {
  investment: InvestmentWithCategoryDto
  transactions: TransactionDto[]
}

export interface TransactionsPageData {
  transactions: TransactionDto[]
}

export interface WalletPageData {
  wallet: WalletSummaryDto
  recentTransactions: TransactionDto[]
}

export interface UpgradeTierData {
  currentTier: InvestorTier
  eligibleForUpgrade: boolean
  nextTier?: InvestorTier
  requiredDeposit?: number
}

export interface CreateDepositPayload {
  amount: number
  proofUrl: string
}

export interface CreateWithdrawalPayload {
  amount: number
}

export interface CreateInvestmentPayload {
  categoryId: string
  principalAmount: number
}

export interface UpgradeTierPayload {
  targetTier: InvestorTier
}

export interface GenerateRoiPayload {
  investmentId?: string // optional for batch
  runForDate?: string
}

export interface ManualRoiPayload {
  investmentId: string
  amount: number
  note?: string
}

export interface DashboardLayoutProps {
  user: UserDto
  wallet: WalletSummaryDto
  children: React.ReactNode
}

export interface BankDetails {
  bankName: string
  accountNumber: string
  accountHolderName: string
  reference?: string
}

export interface CreateDeposit {
  investmentCatId: string,
  amount: number,
  description: string,
}

export interface WithdrawalRequestDto {
  bankName: string
  accountNumber: string
  accountHolderName: string
  amount: number
  reference?: string
}

export interface CategoryDto {
  id?: string
  code: string
  name: string
  priority: number
  minAmount: number
  maxAmount: number
  monthlyRoiRate: number
  durationMonths: number
  description: string
  isActive?: boolean
  createdAt?: string
}

export interface TransactionFilter {
  type?: TransactionType
  status?: TransactionStatus
  startDate?: string // ISO string format
  endDate?: string // ISO string format
  page?: number
  limit?: number
  search?: string // Optional search term for description/ID
}

export interface TransactionResponse {
  transactions: TransactionDto[]
  total: number // Total number of transactions matching filter (without pagination)
  page: number // Current page number
  limit: number // Number of items per page
  totalPages: number // Total number of pages
  hasNextPage: boolean // Whether there's a next page
  hasPreviousPage: boolean // Whether there's a previous page
}

// Extended version with metadata (optional, for more detailed responses)
export interface TransactionResponseWithMetadata extends TransactionResponse {
  metadata?: {
    totalDeposits?: number
    totalWithdrawals?: number
    totalInterest?: number
    averageAmount?: number
    period?: {
      startDate: string
      endDate: string
    }
  }
}

// Alternative simplified response for API that might return different structures
export interface PaginatedTransactionResponse {
  data: TransactionDto[]
  pagination: {
    currentPage: number
    pageSize: number
    totalItems: number
    totalPages: number
    hasNextPage: boolean
    hasPreviousPage: boolean
  }
}

// Query parameters interface for API requests
export interface TransactionQueryParams {
  type?: TransactionType
  status?: TransactionStatus
  from?: string
  to?: string
  page?: string
  limit?: string
  sortBy?: 'date' | 'amount' | 'type' // Optional sorting
  sortOrder?: 'asc' | 'desc' // Optional sort order
}

// Filter state for UI components
export interface TransactionFilterState {
  type: TransactionType | 'ALL'
  status: TransactionStatus | 'ALL'
  dateRange: {
    from?: Date
    to?: Date
  }
  searchTerm: string
}

// Option types for UI dropdowns
export interface TransactionFilterOptions {
  typeOptions: Array<{
    value: TransactionType | 'ALL'
    label: string
    count?: number
  }>
  statusOptions: Array<{
    value: TransactionStatus | 'ALL'
    label: string
    count?: number
  }>
}

// Summary statistics
export interface TransactionSummary {
  totalTransactions: number
  totalAmount: number
  deposits: {
    count: number
    total: number
    pending: number
  }
  withdrawals: {
    count: number
    total: number
    pending: number
  }
  interest: {
    count: number
    total: number
  }
  statusBreakdown: Record<TransactionStatus, number>
}

// `REF-WG-${Date.now()}`
// const isLocked =
//   now < investment.startDate + 18 months
// penalty = principalAmount * 0.25
// payout = requestedAmount - penalty
