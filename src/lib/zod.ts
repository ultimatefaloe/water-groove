import { InvestorTier } from '@prisma/client'
import { z } from 'zod'

// Step 1: Deposit Form Schema
export const depositFormSchema = z.object({
  investmentId: z.string().min(1, "Please select an investment category"),
  amount: z.number().min(1, "Amount must be greater than 0"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description too long"),
})

// Step 3: Proof Upload Schema
export const proofUploadSchema = z.object({
  proofURL: z
    .instanceof(File, { message: "Please upload proof of payment" })
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "File size must be less than 5MB"
    )
    .refine(
      (file) =>
        ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'].includes(
          file.type
        ),
      "Only JPG, PNG, and PDF files are allowed"
    ),
})


export const withdrawalFormSchema = z.object({
  bankHolderName: z.string().min(1, "Bank holder name is required"),
  bankName: z.string().min(1, "Bank name is required"),
  bankAccountNumber: z.string().min(10, "Valid account number is required").max(10, "Account number must be 10 digits"),
  amount: z.number().min(1, "Amount must be greater than 0"),
  narration: z.string().min(1, "Narration is required").max(500, "Narration too long"),
})

export const upgradeFormSchema = z.object({
  investorCategoryId: z.string({
    error: "Please select an investment category",
  }),
})

// (Optional but recommended) Export inferred types
export type DepositFormValues = z.infer<typeof depositFormSchema>
export type ProofUploadFormValues = z.infer<typeof proofUploadSchema>
export type WithdrawalFormValues = z.infer<typeof withdrawalFormSchema>
export type UpgradeFormValues = z.infer<typeof upgradeFormSchema>

export const createInvestmentSchema = z.object({
  categoryId: z.string().uuid(),
  principalAmount: z.number().positive(),
})