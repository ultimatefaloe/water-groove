import { prisma } from "@/lib/prisma"
import { ApiResponse, InvestmenCrontDto } from "@/types/type"
import { InvestmentStatus, TransactionStatus, TransactionType } from "@prisma/client";


//Deposit
export async function approveDeposit(txnId: string, adminId: string): Promise<ApiResponse<null>> {
  if (!adminId || !txnId) return {
    success: false, message: "adminId or txnId is missing", data: null
  }
  const now = new Date();

  try {
    await prisma.$transaction(async (tx) => {

      const txn = await tx.transaction.update({
        where: { id: txnId },
        data: {
          status: TransactionStatus.APPROVED,
          processedByAdminId: adminId,
          processedAt: new Date(),
          updatedAt: new Date()
        },
      })

      await tx.investment.update({
        where: { id: txn?.investmentId! },
        data: {
          status: InvestmentStatus.ACTIVE,
          approvedByAdminId: adminId,
          updatedAt: now,
          startDate: now,
          endDate: new Date(new Date(now).setMonth(now.getMonth() + 18)),
        },
      })

      await tx.investorBalance.update({
        where: {
          investmentId: txn?.investmentId!,
        },
        data: {
          // availableBalance: { increment: txn.amount },
          totalDeposited: { increment: txn.amount },
          lastComputedAt: new Date(),
          updatedAt: new Date(),
        },
      })
    });

    return {
      success: true,
      message: "Deposit request approved",
      data: null
    }
  } catch (error: any) {
    console.error(error)
    return {
      success: false,
      message: error.message,
      data: null
    }
  }
}

export async function rejectDeposit(txnId: string, adminId: string): Promise<ApiResponse<null>> {
  if (!adminId || !txnId) return {
    success: false, message: "adminId or txnId is missing", data: null
  }
  try {
    await prisma.transaction.update({
      where: { id: txnId },
      data: {
        status: TransactionStatus.REJECTED,
        processedByAdminId: adminId,
        processedAt: new Date(),
        updatedAt: new Date()
      },
    })

    return {
      success: true,
      message: "Failed to reject deposit",
      data: null
    }
  } catch (error: any) {
    console.error(error)
    return {
      success: false,
      message: error.message,
      data: null
    }
  }
}

// Withdrawal
export async function approveWithdrawal(
  txnId: string,
  adminId: string
): Promise<ApiResponse<null>> {

  if (!adminId || !txnId) {
    return {
      success: false,
      message: "adminId or txnId is missing",
      data: null,
    };
  }

  try {
    await prisma.$transaction(async (tx) => {

      // 1️⃣ Fetch transaction
      const txn = await tx.transaction.findUnique({
        where: { id: txnId },
      });

      if (!txn) throw new Error("Transaction not found");
      if (txn.status === TransactionStatus.PAID)
        throw new Error("Transaction already paid");
      if (!txn.investmentId)
        throw new Error("Transaction has no investment linked");

      // 2️⃣ Fetch balance
      const balance = await tx.investorBalance.findUnique({
        where: { investmentId: txn.investmentId },
      });

      if (!balance) throw new Error("Investor balance not found");

      const withdrawalAmount = Number(txn.amount);
      let available = Number(balance.availableBalance);
      let locked = Number(balance.principalLocked);

      // 3️⃣ Validate funds
      const maxWithdrawable = txn.earlyWithdrawal
        ? available + locked
        : available;

      if (withdrawalAmount > maxWithdrawable) {
        throw new Error("Insufficient balance for withdrawal");
      }

      // 4️⃣ Compute deductions
      let newAvailable = available;
      let newLocked = locked;

      if (txn.earlyWithdrawal) {
        const penalty = locked * 0.25;
        const unlocked = locked - penalty;

        newAvailable = available + unlocked - withdrawalAmount;
        newLocked = 0;
      } else {
        newAvailable = available - withdrawalAmount;
      }

      if (newAvailable < 0) {
        throw new Error("Invalid balance computation");
      }

      // 5️⃣ Update balance (ABSOLUTE values only)
      await tx.investorBalance.update({
        where: { investmentId: txn.investmentId },
        data: {
          availableBalance: newAvailable,
          principalLocked: newLocked,
          totalWithdrawn: {
            increment: withdrawalAmount,
          },
        },
      });

      // 6️⃣ Mark transaction PAID
      await tx.transaction.update({
        where: { id: txnId },
        data: {
          status: TransactionStatus.PAID,
          processedByAdminId: adminId,
          processedAt: new Date(),
        },
      });
    });

    return {
      success: true,
      message: "Withdrawal request approved",
      data: null,
    };

  } catch (error: any) {
    console.error("Approve withdrawal error:", error);
    return {
      success: false,
      message: error?.message || "Failed to approve withdrawal",
      data: null,
    };
  }
}


export async function rejectWithdrawal(txnId: string, adminId: string): Promise<ApiResponse<null>> {
  if (!adminId || !txnId) return {
    success: false, message: "adminId or txnId is missing", data: null
  }
  try {
    await prisma.transaction.update({
      where: { id: txnId },
      data: {
        status: TransactionStatus.REJECTED,
        processedByAdminId: adminId,
        processedAt: new Date(),
        updatedAt: new Date()
      },
    })

    return {
      success: true,
      message: "Failed to reject withdrawal",
      data: null
    }
  } catch (error: any) {
    console.error(error)
    return {
      success: false,
      message: error.message,
      data: null
    }
  }
}

export async function paidWithdrawal(txnId: string, adminId: string): Promise<ApiResponse<null>> {
  if (!adminId || !txnId) return {
    success: false, message: "adminId or txnId is missing", data: null
  }
  try {
    await prisma.transaction.update({
      where: { id: txnId },
      data: {
        status: TransactionStatus.PAID,
        processedByAdminId: adminId,
        processedAt: new Date(),
        updatedAt: new Date()
      },
    })

    return {
      success: true,
      message: "Failed to reject withdrawal",
      data: null
    }
  } catch (error: any) {
    console.error(error)
    return {
      success: false,
      message: error.message,
      data: null
    }
  }
}

//investment
export async function updateInvestment(
  ivst: string,
  status: InvestmentStatus,
  adminId: string
): Promise<ApiResponse<null>> {
  if (!adminId || !ivst) {
    return {
      success: false,
      message: "adminId or investmentId is missing",
      data: null,
    };
  }

  if (!status) {
    return {
      success: false,
      message: "Investment status is required",
      data: null,
    };
  }

  try {
    const isActive = status === InvestmentStatus.ACTIVE;
    const now = new Date();

    await prisma.investment.update({
      where: { id: ivst },
      data: {
        status,
        approvedByAdminId: adminId,
        updatedAt: now,

        // Only set these when activating
        durationMonths: isActive ? 18 : undefined,
        startDate: isActive ? now : null,
        endDate: isActive
          ? new Date(new Date(now).setMonth(now.getMonth() + 18))
          : null,
      },
    });

    return {
      success: true,
      message: "Investment status updated",
      data: null,
    };
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      message: error.message ?? "Failed to update investment status",
      data: null,
    };
  }
}


export async function roiCronService(
  data: InvestmenCrontDto
): Promise<ApiResponse<null>> {

  try {
    if (!data.roiAmount || data.roiAmount <= 0) {
      throw new Error("Invalid ROI amount");
    }

    await prisma.$transaction(async (tx) => {

      // 🔒 Prevent duplicate ROI for same month
      const existingTxn = await tx.transaction.findFirst({
        where: {
          investmentId: data.id,
          type: TransactionType.INTEREST,
          createdAt: {
            gte: new Date(new Date().setDate(1)), // start of month
          },
        },
      });

      if (existingTxn) {
        throw new Error("ROI already credited for this month");
      }

      // 1️⃣ Create ROI transaction
      await tx.transaction.create({
        data: {
          userId: data.userId,
          investmentId: data.id,
          type: TransactionType.INTEREST,
          amount: data.roiAmount,
          status: TransactionStatus.PAID,
          processedByAdminId: data.processedByAdminId ?? null,
          processedAt: new Date(),
        },
      });

      // 2️⃣ Update balances
      await tx.investorBalance.update({
        where: {
          investmentId: data.id,
        },
        data: {
          roiAccrued: { increment: data.roiAmount },
          availableBalance: { increment: data.roiAmount },
          lastComputedAt: new Date(),
        },
      });
    });

    return {
      success: true,
      message: "ROI credited successfully",
      data: null,
    };

  } catch (error: any) {
    console.error("roiCronService error:", error);
    return {
      success: false,
      message: error?.message || "Failed to credit ROI",
      data: null,
    };
  }
}

export async function change(data: any): Promise<ApiResponse<null>> {
  try {

    return {
      success: true,
      message: '',
      data: data
    }
  } catch (error: any) {
    console.error(error)
    return {
      success: false,
      message: error.message,
      data: null
    }
  }
}