
import { InvestorTier, TransactionStatus, TransactionType, AdminRole } from "@prisma/client"

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
  data: T
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
  investorTier?: InvestorTier
  isActive: boolean
  createdAt: string
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

export interface InvestmentWithCategoryDto extends InvestmentDto{
  category: InvestmentCategoryDto
  totalInterestEarned: number
}


export interface InvestmentDto{
  id: string
  userId: string
  categoryId: string

  principalAmount: number
  roiRateSnapshot: number
  durationMonths: number

  status: InvestmentStatusDto
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
}

//Dashboard
export interface DashboardOverviewData {
  user: UserDto
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
  accountName: string
  reference: string
}


export const INVESTMENT_CATEGORIES: InvestmentCategoryDto[] = [
  {
    id: InvestorTier.STARTER,
    name: "Starter",
    minAmount: 100000,
    maxAmount: 499000,
    monthlyRoiRate: 0.04, // 4% monthly
    durationMonths: 6,
    description: "₦100k – ₦499k",
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: InvestorTier.GROWTH,
    name: "Growth",
    minAmount: 500000,
    maxAmount: 1000000,
    monthlyRoiRate: 0.05, // 5% monthly
    durationMonths: 9,
    description: "₦500k – ₦1M",
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: InvestorTier.PREMIUM,
    name: "Premium",
    minAmount: 1000000,
    maxAmount: 5000000,
    monthlyRoiRate: 0.06, // 6% monthly
    durationMonths: 12,
    description: "₦1M – ₦5M",
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: InvestorTier.ELITE,
    name: "Elite",
    minAmount: 5000000,
    maxAmount: 10000000,
    monthlyRoiRate: 0.07, // 7% monthly
    durationMonths: 12,
    description: "₦5M – ₦10M",
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: InvestorTier.EXECUTIVE,
    name: "Executive",
    minAmount: 10000000,
    maxAmount: 50000000,
    monthlyRoiRate: 0.08, // 8% monthly
    durationMonths: 18,
    description: "₦10M+",
    isActive: true,
    createdAt: new Date().toISOString(),
  },
];
