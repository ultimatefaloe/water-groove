import { InvestmentDto } from "@/types/type";
import { TransactionStatus } from "@prisma/client";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (dateString?: string | Date) => {
  if (!dateString) return "Not Set";
  return new Date(dateString).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(amount);
};

export const getStatusColor = (status: TransactionStatus) => {
  switch (status) {
    case TransactionStatus.APPROVED:
    case TransactionStatus.PAID:
      return "bg-green-100 text-green-800";
    case TransactionStatus.PENDING:
      return "bg-amber-100 text-amber-800";
    case TransactionStatus.REJECTED:
      return "bg-red-100 text-red-800";
    default:
      return "";
  }
};

// Utility functions for investment calculations
export function calculateDaysRemaining(endDate: string): number {
  const end = new Date(endDate);
  const now = new Date();
  const diffTime = end.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
}

export function calculateEstimatedROI(
  principal: number,
  annualRate: number,
  months: number
): { total: number; monthly: number } {
  const monthlyRate = annualRate / 12 / 100;
  const total = principal * monthlyRate * months;
  const monthly = principal * monthlyRate;

  return {
    total: Number(total.toFixed(2)),
    monthly: Number(monthly.toFixed(2)),
  };
}

export const calculateEstimatedReturns = (investment: InvestmentDto) => {
  const monthlyReturn = (investment.principalAmount * investment.roiRateSnapshot) / 100;
  const totalReturn = monthlyReturn * investment.durationMonths;
  return totalReturn;
};