export enum InvestmentCategory {
  STARTER = "STARTER",       // ₦100k – ₦499k
  GROWTH = "GROWTH",        // ₦500k – ₦1M
  PREMIUM = "PREMIUM",       // ₦1M – ₦5M
  ELITE = "ELITE",         // ₦5M – ₦10M
  EXECUTIVE = "EXECUTIVE",     // ₦10M+
}

export enum TransactionType {
  DEPOSIT = "DEPOSIT",
  WITHDRAWAL = "WITHDRAWAL",
}

export interface DepositFormData {
  investmentId: string
  type: TransactionType.DEPOSIT
  amount: number
  description: string
}

export interface DepositProofData {
  proofURL: File | null
}

export interface WithdrawalFormData {
  bankHolderName: string
  bankName: string
  bankAccountNumber: string
  amount: number
  narration: string
}

export interface UpgradeTierFormData {
  investmentCategory: InvestmentCategory
}

export interface BankDetails {
  bankName: string
  accountNumber: string
  accountName: string
  reference: string
}

export interface InvCategry {
  value: InvestmentCategory
  label: string
  description: string
  minAmount: number
  maxAmount: number
}

export const INVESTMENT_CATEGORIES:InvCategry[] = [
  {
    value: InvestmentCategory.STARTER,
    label: "Starter",
    description: "₦100k – ₦499k",
    minAmount: 100000,
    maxAmount: 499000,
  },
  {
    value: InvestmentCategory.GROWTH,
    label: "Growth",
    description: "₦500k – ₦1M",
    minAmount: 500000,
    maxAmount: 1000000,
  },
  {
    value: InvestmentCategory.PREMIUM,
    label: "Premium",
    description: "₦1M – ₦5M",
    minAmount: 1000000,
    maxAmount: 5000000,
  },
  {
    value: InvestmentCategory.ELITE,
    label: "Elite",
    description: "₦5M – ₦10M",
    minAmount: 5000000,
    maxAmount: 10000000,
  },
  {
    value: InvestmentCategory.EXECUTIVE,
    label: "Executive",
    description: "₦10M+",
    minAmount: 10000000,
    maxAmount: 50000000,
  },
] as const