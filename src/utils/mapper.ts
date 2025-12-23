import { Admin, Investment, InvestmentCategory, PlatformBankAccount, Transaction, User } from "@prisma/client"
import { Prisma } from "@prisma/client"
import { AdminDto, BankDetails, InvestmentCategoryDto, CategoryDto, InvestmentDto, InvestmentWithCategoryDto, TransactionDto, UserDto } from "@/types/type"

export const decimalToNumber = (
  value?: Prisma.Decimal | null
): number | undefined =>
  value !== null && value !== undefined ? value.toNumber() : undefined

export const dateToISOString = (
  value?: Date | null
): string | undefined =>
  value ? value.toISOString() : undefined


export const mapUserToDto = (user: User): UserDto => ({
  id: user.id,
  fullName: user.fullName,
  email: user.email,
  phone: user.phone ?? undefined,
  isActive: user.isActive,
  createdAt: dateToISOString(user.createdAt)!,
  investmentCategoryId: user.investmentCategoryId! ?? undefined,
})

export const mapAdminToDto = (admin: Admin): AdminDto => ({
  id: admin.id,
  fullName: admin.fullName,
  email: admin.email,
  role: admin.role,
  isActive: admin.isActive,
  lastLoginAt: dateToISOString(admin.lastLoginAt),
})

export const mapInvestmentToDto = (
  investment: Investment
): InvestmentDto => ({
  id: investment.id,
  userId: investment.userId,
  categoryId: investment.categoryId,

  principalAmount: decimalToNumber(investment.principalAmount)!,
  roiRateSnapshot: decimalToNumber(investment.roiRateSnapshot)!,
  durationMonths: investment.durationMonths,

  status: investment.status,
  startDate: dateToISOString(investment.startDate),
  endDate: dateToISOString(investment.endDate),

  createdAt: dateToISOString(investment.createdAt)!,
})

export const mapInvestmentWithCategoryToDto = (
  investment: Investment & { category: InvestmentCategory },
  totalInterestEarned: number
): InvestmentWithCategoryDto => ({
  ...mapInvestmentToDto(investment),
  category: mapCategoryToDto(investment.category),
  totalInterestEarned,
})

export const mapTransactionToDto = (
  tx: Transaction
): TransactionDto => ({
  id: tx.id,
  userId: tx.userId,
  investmentId: tx.investmentId ?? undefined,

  type: tx.type,
  status: tx.status,
  amount: decimalToNumber(tx.amount)!,

  proofUrl: tx.proofUrl ?? undefined,
  description: tx.description ?? undefined,

  processedAt: dateToISOString(tx.processedAt),
  createdAt: dateToISOString(tx.createdAt)!,
})

export const mapBankDetailsToDto = (
  bankDetails: PlatformBankAccount
): BankDetails => ({
  bankName: bankDetails.bankName,
  accountNumber: bankDetails.accountNumber,
  accountHolderName: bankDetails.accountHolderName,
})

export function mapCategoryToDto(
  category: InvestmentCategory
): CategoryDto {
  return {
    id: category.id,
    code: category.code,
    name: category.name,
    priority: category.priority,

    minAmount: category.minAmount.toNumber(),
    maxAmount: Number(category.maxAmount) ?? null,
    monthlyRoiRate: category.monthlyRoiRate.toNumber(),

    durationMonths: category.durationMonths,
    description: String(category.description) ?? null,
    isActive: category.isActive,
  };
}