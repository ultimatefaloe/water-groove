import { TransactionStatus } from "@prisma/client";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (dateString?: string) => {
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