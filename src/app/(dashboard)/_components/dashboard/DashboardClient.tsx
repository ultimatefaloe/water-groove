"use client";

import { useState } from "react";
import {
  CreditCard,
  TrendingUp,
  TrendingDown,
  Download,
  Upload,
  Zap,
  MoreVertical,
  ChevronRight,
  Shield,
  CheckCircle,
  Clock,
  XCircle,
  PieChart,
  BarChart3,
  ArrowUpRight,
  Target,
  Eye,
  EyeOff,
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
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DepositModal } from "../modals/deposit-modal";
import { WithdrawalModal } from "../modals/withdrawal-modal";
import { UpgradeTierModal } from "../modals/upgrade-tier-modal";
import { InvestmentCategory } from "@/types/invesment";
import { OverviewItem } from "@/components/ui/overview-Item";

export default function DashboardClient() {
  const [viewBalance, setViewBalance] = useState<boolean>(true);
  // Modal states
  const [showDepositModal, setShowDepositModal] = useState<boolean>(false);
  const [showWithdrawalModal, setShowWithdrawalModal] =
    useState<boolean>(false);
  const [showUpgradeTierModal, setShowUpgradeTierModal] =
    useState<boolean>(false);

  // User details
  const user = {
    name: "Alex Morgan",
    tier: "Premium",
    accountNumber: "4829 5738 2910 3847",
    balance: 45289.5,
    currency: "NGN",
    memberSince: "2022",
  };

  // Investment categories
  const investmentCategories = [
    { name: "Stocks", amount: 18950, percentage: 42, color: "bg-blue-500" },
    { name: "Crypto", amount: 12500, percentage: 28, color: "bg-purple-500" },
    { name: "Bonds", amount: 7830, percentage: 17, color: "bg-green-500" },
    {
      name: "Real Estate",
      amount: 6009.5,
      percentage: 13,
      color: "bg-amber-500",
    },
  ];

  // Recent transactions
  const recentTransactions = [
    {
      id: 1,
      amount: 5000,
      type: "deposit",
      status: "completed",
      date: "2024-01-15",
      method: "Bank Transfer",
    },
    {
      id: 2,
      amount: 2500,
      type: "deposit",
      status: "pending",
      date: "2024-01-14",
      method: "Credit Card",
    },
    {
      id: 3,
      amount: 10000,
      type: "deposit",
      status: "completed",
      date: "2024-01-12",
      method: "Wire Transfer",
    },
    {
      id: 4,
      amount: 3500,
      type: "deposit",
      status: "failed",
      date: "2024-01-10",
      method: "PayPal",
    },
  ];

  // ROI Statistics
  const roiStats = {
    current: 18.7,
    change: 2.4,
    monthly: 5.2,
    quarterly: 15.8,
    yearly: 42.3,
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-amber-100 text-amber-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "";
    }
  };

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
                  {user.tier} Investor
                </CardTitle>
                <Badge variant="outline" className="gap-1">
                  <Shield className="h-3 w-3" />
                  Secure
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Total Balance</span>
                <span>{user.currency}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-2xl sm:text-3xl font-bold">
                  ₦{user.balance.toLocaleString()}
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
            </CardContent>

            <CardFooter className="text-xs text-muted-foreground">
              Member since {user.memberSince}
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
          <DepositModal
            isOpen={showDepositModal}
            onClose={() => setShowDepositModal(false)}
          />

          <WithdrawalModal
            isOpen={showWithdrawalModal}
            onClose={() => setShowWithdrawalModal(false)}
            availableBalance={45289.5}
          />

          <UpgradeTierModal
            isOpen={showUpgradeTierModal}
            onClose={() => setShowUpgradeTierModal(false)}
            currentTier={InvestmentCategory.STARTER}
          />
        </div>

        {/* ROI Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>ROI Statistics</CardTitle>
                <CardDescription>Return on Investment</CardDescription>
              </div>
              <span className="flex items-center gap-1 text-green-600 text-sm">
                <TrendingUp className="h-4 w-4" />+{roiStats.change}%
              </span>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-3xl font-bold">{roiStats.current}%</p>
              <p className="text-sm text-muted-foreground">Annual ROI</p>
            </div>

            <div className="space-y-3 text-sm">
              {[
                ["Monthly", roiStats.monthly],
                ["Quarterly", roiStats.quarterly],
                ["Yearly", roiStats.yearly],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between">
                  <span>{label}</span>
                  <span className="text-green-600 font-medium">+{value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Overview */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Investment Overview</CardTitle>
            <CardDescription>Portfolio summary</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <OverviewItem label="Total Invested" value="₦45,289.50" />
              <OverviewItem label="Net Profit" value="+₦8,492.15" positive />
              <OverviewItem label="Active Days" value="412" />
              <OverviewItem label="Success Rate" value="94.2%" />
            </div>
          </CardContent>
        </Card>

        {/* Transactions */}
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Deposits</CardTitle>
              <CardDescription>Latest transactions</CardDescription>
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
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  {/* <TableHead className="text-right">Actions</TableHead> */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">
                      TRX-{transaction.id.toString().padStart(4, "0")}
                    </TableCell>
                    <TableCell className="font-medium">
                      ₦{transaction.amount.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {transaction.method}
                    </TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(transaction.status)}
                        <Badge
                          variant="secondary"
                          className={getStatusColor(transaction.status)}
                        >
                          {transaction.status.charAt(0).toUpperCase() +
                            transaction.status.slice(1)}
                        </Badge>
                      </div>
                    </TableCell>
                    {/* <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2">
            <div className="flex items-center justify-between w-full">
              <div className="text-sm text-muted-foreground">
                Showing {recentTransactions.length} recent transactions
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-xs">Completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-amber-500" />
                  <span className="text-xs">Pending</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-500" />
                  <span className="text-xs">Failed</span>
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
