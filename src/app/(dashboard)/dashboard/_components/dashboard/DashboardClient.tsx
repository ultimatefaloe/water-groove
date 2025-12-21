"use client";

import { useState, useMemo } from "react";
import {
  Download,
  Upload,
  Zap,
  Shield,
  Eye,
  EyeOff,
  Calendar,
  PieChart,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DepositModal } from "../modals/deposit-modal";
import { WithdrawalModal } from "../modals/withdrawal-modal";
import { UpgradeTierModal } from "../modals/upgrade-tier-modal";
import { DashboardOverviewData, InvestmentCategoryDto } from "@/types/type";
import { formatCurrency, formatDate } from "@/lib/utils";
import { OverviewItem } from "@/components/ui/overview-Item";
import {
  InvestorTier,
} from "@prisma/client";
import { ActiveInvestmentsTable } from "./ActiveInvestmentsTable";
import { PendingTransactionsTable } from "./PendingTransactionsTable";

interface DashboardClientProps {
  data: DashboardOverviewData;
  categories: InvestmentCategoryDto[]
}

const formatTier = (tier?: string) => {
  if (!tier) return "Not Set";
  return tier.charAt(0).toUpperCase() + tier.slice(1).toLowerCase();
};

export default function DashboardClient({ data, categories }: DashboardClientProps) {
  const [viewBalance, setViewBalance] = useState<boolean>(false);
  const [showDepositModal, setShowDepositModal] = useState<boolean>(false);
  const [showWithdrawalModal, setShowWithdrawalModal] =
    useState<boolean>(false);
  const [showUpgradeTierModal, setShowUpgradeTierModal] =
    useState<boolean>(false);

  const { user, wallet, activeInvestments, pendingTransactions, nextRoiDate } =
    data;

  // Calculate derived values with useMemo for performance
  const calculatedValues = useMemo(() => {
    const totalInvested = activeInvestments.reduce(
      (sum, investment) => sum + investment.principalAmount,
      0
    );

    const totalInterestEarned = activeInvestments.reduce(
      (sum, investment) => sum + investment.totalInterestEarned,
      0
    );

    const memberSince = new Date(user.createdAt);
    const today = new Date();
    const daysActive = Math.floor(
      (today.getTime() - memberSince.getTime()) / (1000 * 60 * 60 * 24)
    );

    return {
      totalInvested,
      totalInterestEarned,
      daysActive,
    };
  }, [activeInvestments, user.createdAt]);

  return (
    <div className="space-y-6 px-2 sm:px-4">
      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          {/* Balance Card */}
          <Card>
            <CardHeader className="pb-3">
              { user?.investorTier && <div className="flex flex-wrap items-center justify-between gap-2">
                <CardTitle className="text-base sm:text-lg">
                  {formatTier(user?.investorTier)} Investor
                </CardTitle>
                <Badge variant="outline" className="gap-1">
                  <Shield className="h-3 w-3" />
                  {user.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>}
              <CardDescription>{user.fullName}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Current Balance</span>
                <span>NGN</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-2xl sm:text-3xl font-bold">
                  { viewBalance ? formatCurrency(wallet.currentBalance) : "₦ *******"}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewBalance((p) => !p)}
                >
                  {viewBalance ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {nextRoiDate && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Next ROI: {formatDate(nextRoiDate)}</span>
                </div>
              )}
            </CardContent>

            <CardFooter className="text-xs text-muted-foreground">
              Member since {formatDate(user.createdAt)}
            </CardFooter>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your investments</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Button
                  className="h-20 sm:h-24 flex flex-col gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700"
                  onClick={() => setShowDepositModal(true)}
                >
                  <Upload className="h-5 w-5" />
                  <span className="text-sm font-semibold">Deposit</span>
                </Button>

                <Button
                  className="h-20 sm:h-24 flex flex-col gap-2 bg-green-50 hover:bg-green-100 text-green-700"
                  onClick={() => setShowWithdrawalModal(true)}
                >
                  <Download className="h-5 w-5" />
                  <span className="text-sm font-semibold">Withdraw</span>
                </Button>

                <Button
                  className="h-20 sm:h-24 flex flex-col gap-2 bg-purple-50 hover:bg-purple-100 text-purple-700 cursor-not-allowed"
                  onClick={() => setShowUpgradeTierModal(false)}
                >
                  <Zap className="h-5 w-5" />
                  <span className="text-sm font-semibold">Upgrade Tier</span>
                  <span className="text-xs">Coming soon...</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Wallet Summary Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Wallet Summary</CardTitle>
                <CardDescription>Financial Overview</CardDescription>
              </div>
              <PieChart className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Deposits</span>
                <span className="font-medium">
                  {formatCurrency(wallet.totalDeposits)}
                </span>
              </div>
               <div className="flex justify-between items-center">
                <span className="text-muted-foreground">
                  Pending Deposits
                </span>
                <span className="font-medium text-amber-600">
                  {formatCurrency(wallet.pendingDeposits)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Withdrawals</span>
                <span className="font-medium text-red-600">
                  -{formatCurrency(wallet.totalWithdrawals)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">
                  Pending Withdrawals
                </span>
                <span className="font-medium text-amber-600">
                  {formatCurrency(wallet.pendingWithdrawals)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Interest</span>
                <span className="font-medium text-green-600">
                  +{formatCurrency(wallet.totalInterest)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Overview */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Investment Overview</CardTitle>
            <CardDescription>Active investments summary</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <OverviewItem
                label="Active Investments"
                value={activeInvestments.length.toString()}
              />
              <OverviewItem
                label="Total Invested"
                value={formatCurrency(calculatedValues.totalInvested)}
              />
              <OverviewItem
                label="Total Interest Earned"
                value={`+${formatCurrency(
                  calculatedValues.totalInterestEarned
                )}`}
                positive
              />
              <OverviewItem
                label="Active Days"
                value={calculatedValues.daysActive.toString()}
              />
            </div>
          </CardContent>
        </Card>

        {/* Active Investments Table */}
        {activeInvestments.length > 0 && (
          <ActiveInvestmentsTable investments={activeInvestments} />
        )}

        {/* Pending Transactions */}
        {pendingTransactions.length > 0 && (
          <PendingTransactionsTable transactions={pendingTransactions} />
        )}
      </div>

      {/* Modals */}
      <DepositModal
        isOpen={showDepositModal}
        investmentCategories={categories}
        onClose={() => setShowDepositModal(false)}
      />

      <WithdrawalModal
        isOpen={showWithdrawalModal}
        onClose={() => setShowWithdrawalModal(false)}
        availableBalance={wallet.currentBalance}
      />

     {user?.investorTier && <UpgradeTierModal
        isOpen={showUpgradeTierModal}
        onClose={() => setShowUpgradeTierModal(false)}
        investmentCategories={categories}
        currentTier={user?.investorTier}
      />}
    </div>
  );
}
