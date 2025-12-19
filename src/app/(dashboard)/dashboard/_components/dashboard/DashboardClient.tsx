"use client";

import { useState, useMemo } from "react";
import {
  TrendingUp,
  Download,
  Upload,
  Zap,
  Shield,
  CheckCircle,
  Clock,
  XCircle,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DepositModal } from "../modals/deposit-modal";
import { WithdrawalModal } from "../modals/withdrawal-modal";
import { UpgradeTierModal } from "../modals/upgrade-tier-modal";
import { DashboardOverviewData } from "@/types/type";
import { formatCurrency, formatDate } from "@/lib/utils";
import { OverviewItem } from "@/components/ui/overview-Item";
import {
  TransactionStatus,
  TransactionType,
  InvestorTier,
} from "@prisma/client";

interface DashboardClientProps {
  data: DashboardOverviewData;
}

// Memoized helper functions
const getStatusIcon = (status: TransactionStatus) => {
  switch (status) {
    case TransactionStatus.APPROVED:
    case TransactionStatus.PAID:
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case TransactionStatus.PENDING:
      return <Clock className="h-4 w-4 text-amber-500" />;
    case TransactionStatus.REJECTED:
      return <XCircle className="h-4 w-4 text-red-500" />;
    default:
      return null;
  }
};

const getStatusColor = (status: TransactionStatus) => {
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

const formatTier = (tier?: InvestorTier) => {
  if (!tier) return "Not Set";
  return tier.charAt(0).toUpperCase() + tier.slice(1).toLowerCase();
};

export default function DashboardClient({ data }: DashboardClientProps) {
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
              <div className="flex flex-wrap items-center justify-between gap-2">
                <CardTitle className="text-base sm:text-lg">
                  {formatTier(user.investorTier)} Investor
                </CardTitle>
                <Badge variant="outline" className="gap-1">
                  <Shield className="h-3 w-3" />
                  {user.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
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
                  className="h-20 sm:h-24 flex flex-col gap-2 bg-purple-50 hover:bg-purple-100 text-purple-700"
                  onClick={() => setShowUpgradeTierModal(true)}
                >
                  <Zap className="h-5 w-5" />
                  <span className="text-sm font-semibold">Upgrade Tier</span>
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
                <span className="text-muted-foreground">Total Withdrawals</span>
                <span className="font-medium text-red-600">
                  -{formatCurrency(wallet.totalWithdrawals)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Interest</span>
                <span className="font-medium text-green-600">
                  +{formatCurrency(wallet.totalInterest)}
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
        onClose={() => setShowDepositModal(false)}
      />

      <WithdrawalModal
        isOpen={showWithdrawalModal}
        onClose={() => setShowWithdrawalModal(false)}
        availableBalance={wallet.currentBalance}
      />

      <UpgradeTierModal
        isOpen={showUpgradeTierModal}
        onClose={() => setShowUpgradeTierModal(false)}
        currentTier={user.investorTier}
      />
    </div>
  );
}

// Extract tables into separate components for better performance
const ActiveInvestmentsTable = ({
  investments,
}: {
  investments: DashboardOverviewData["activeInvestments"];
}) => (
  <Card className="lg:col-span-3">
    <CardHeader>
      <CardTitle>Active Investments</CardTitle>
      <CardDescription>Your current investment plans</CardDescription>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Investment Plan</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Monthly ROI</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Interest Earned</TableHead>
            <TableHead>Start Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {investments.map((investment) => (
            <TableRow key={investment.id}>
              <TableCell className="font-medium">
                <div>
                  <div>{investment.category.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {investment.category.description}
                  </div>
                </div>
              </TableCell>
              <TableCell className="font-medium">
                {formatCurrency(investment.principalAmount)}
              </TableCell>
              <TableCell>
                <span className="text-green-600 font-medium">
                  {(investment.category.monthlyRoiRate * 100).toFixed(1)}%
                </span>
              </TableCell>
              <TableCell>{investment.category.durationMonths} months</TableCell>
              <TableCell className="text-green-600 font-medium">
                +{formatCurrency(investment.totalInterestEarned)}
              </TableCell>
              <TableCell>{formatDate(investment.createdAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

const PendingTransactionsTable = ({
  transactions,
}: {
  transactions: DashboardOverviewData["pendingTransactions"];
}) => (
  <Card className="lg:col-span-3">
    <CardHeader className="flex flex-row items-center justify-between">
      <div>
        <CardTitle>Pending Transactions</CardTitle>
        <CardDescription>Transactions awaiting approval</CardDescription>
      </div>
      <Button variant="outline" size="sm">
        View All
      </Button>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Transaction ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="font-medium">
                {transaction.id.slice(0, 8)}...
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    transaction.type === TransactionType.DEPOSIT
                      ? "bg-blue-50 text-blue-700"
                      : "bg-amber-50 text-amber-700"
                  }
                >
                  {transaction.type}
                </Badge>
              </TableCell>
              <TableCell className="font-medium">
                {formatCurrency(transaction.amount)}
              </TableCell>
              <TableCell>{formatDate(transaction.createdAt)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {getStatusIcon(transaction.status)}
                  <Badge
                    variant="secondary"
                    className={getStatusColor(transaction.status)}
                  >
                    {transaction.status}
                  </Badge>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
    <CardFooter className="flex-col items-start gap-2">
      <div className="flex items-center justify-between w-full">
        <div className="text-sm text-muted-foreground">
          Showing {transactions.length} pending transactions
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-xs">Approved</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-amber-500" />
            <span className="text-xs">Pending</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-red-500" />
            <span className="text-xs">Rejected</span>
          </div>
        </div>
      </div>
    </CardFooter>
  </Card>
);
