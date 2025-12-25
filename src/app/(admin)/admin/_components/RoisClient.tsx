"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { StatsCard } from "@/components/ui/StatsCard";
import {
  Search,
  Filter,
  TrendingUp,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import {
  AdminTransactionRow,
  AdminTransactionQueryParams,
  PaginatedResponse,
} from "@/types/adminType";
import { TransactionStatus } from "@prisma/client";
import TransactionTable from "@/components/transaction/TransactionTable";
import TransactionDetailsModal from "@/components/transaction/TransactionDetailsModal";
import { formatCurrency } from "@/lib/utils";

interface RoisClientProps {
  initialTransactions: AdminTransactionRow[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  isAdmin: boolean;
}

// Stats Icons
const StatsIcons = {
  total: <TrendingUp className="w-6 h-6 text-wg-accent" />,
  pending: <AlertCircle className="w-6 h-6 text-yellow-500" />,
  completed: <CheckCircle className="w-6 h-6 text-green-500" />,
};

const RoisClient: React.FC<RoisClientProps> = ({
  initialTransactions,
  total,
  page: initialPage,
  limit: initialLimit,
  totalPages,
  isAdmin,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [transactions, setTransactions] = useState(initialTransactions);
  const [loading, setLoading] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<AdminTransactionRow | null>(null);

  const [filters, setFilters] = useState<AdminTransactionQueryParams>({
    status: (searchParams.get("status") as TransactionStatus) || undefined,
    order: (searchParams.get("order") as "asc" | "desc") || "desc",
    date: searchParams.get("date")
      ? new Date(searchParams.get("date")!)
      : undefined,
    transactionId: searchParams.get("transactionId") || "",
  });

  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  // Calculate stats
  const totalRois = total;
  const pendingRois = transactions.filter(
    (t) => t.status === TransactionStatus.PENDING
  ).length;
  const completedRois = transactions.filter(
    (t) => t.status === TransactionStatus.APPROVED
  ).length;
  const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);

  // Update URL with filters and paginationRoi
  const updateURL = useCallback(
    (
      newFilters: AdminTransactionQueryParams,
      newPage: number,
      newLimit: number
    ) => {
      const params = new URLSearchParams();

      if (newFilters.status) params.set("status", newFilters.status);
      if (newFilters.order) params.set("order", newFilters.order);
      if (newFilters.date) params.set("date", newFilters.date.toISOString());
      if (newFilters.transactionId)
        params.set("transactionId", newFilters.transactionId);

      params.set("page", newPage.toString());
      params.set("limit", newLimit.toString());

      router.push(`/admin/rois?${params.toString()}`);
    },
    [router]
  );

  // Fetch rois with filters
  const fetchRois = useCallback(async () => {
    setLoading(true);
    try {
      // In a real app, this would be an API call
      // Simulate API call with delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Filter the initial data based on current filters
      const filteredTransactions = initialTransactions.filter((transaction) => {
        if (filters.status && transaction.status !== filters.status) {
          return false;
        }
        if (
          filters.transactionId &&
          !transaction.id.includes(filters.transactionId)
        ) {
          return false;
        }
        if (filters.date) {
          const transactionDate = new Date(transaction.createdAt);
          const filterDate = new Date(filters.date);
          if (
            transactionDate.getDate() !== filterDate.getDate() ||
            transactionDate.getMonth() !== filterDate.getMonth() ||
            transactionDate.getFullYear() !== filterDate.getFullYear()
          ) {
            return false;
          }
        }
        return true;
      });

      // Sort transactions
      const sortedTransactions = [...filteredTransactions].sort((a, b) => {
        if (filters.order === "asc") {
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        } else {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }
      });

      setTransactions(sortedTransactions);
    } catch (error) {
      console.error("Error fetching rois:", error);
    } finally {
      setLoading(false);
    }
  }, [filters, initialTransactions]);

  useEffect(() => {
    fetchRois();
    updateURL(filters, page, limit);
  }, [filters, page, limit, updateURL]);

  // Handle filter changes
  const handleFilterChange = (
    key: keyof AdminTransactionQueryParams,
    value: any
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setPage(1); // Reset to first page when filters change
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setFilters({});
    setPage(1);
  };

  // Handle transaction actions
  const handleTransactionAction = async (
    transaction: AdminTransactionRow,
    action: string
  ) => {
    try {
      // In a real app, this would be an API call
      console.log(`Action: ${action} on transaction: ${transaction.id}`);

      // Update local state for demo
      let newStatus: TransactionStatus;
      switch (action) {
        case "APPROVE":
          newStatus = TransactionStatus.APPROVED;
          break;
        case "REJECT":
          newStatus = TransactionStatus.REJECTED;
          break;
        case "PAID":
          newStatus = TransactionStatus.PAID;
          break;
        default:
          newStatus = transaction.status;
      }

      setTransactions((prev) =>
        prev.map((t) =>
          t.id === transaction.id
            ? { ...t, status: newStatus, processedAt: new Date() }
            : t
        )
      );

      // Show success message
      alert(
        `Transaction ${transaction.id} ${action.toLowerCase()}d successfully`
      );
    } catch (error) {
      console.error("Error processing action:", error);
      alert("Failed to process action");
    }
  };

  return (
    <div className="min-h-screen bg-wg-neutral p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Rois"
          value={totalRois.toString()}
          description="All roi transactions"
          icon={StatsIcons.total}
        />
        <StatsCard
          title="Pending Rois"
          value={pendingRois.toString()}
          description="Awaiting approval"
          icon={StatsIcons.pending}
        />
        <StatsCard
          title="Completed Rois"
          value={completedRois.toString()}
          description="Successfully processed"
          icon={StatsIcons.completed}
        />
        <StatsCard
          title="Total Amount"
          value={formatCurrency(totalAmount)}
          description="Sum of all rois"
          icon={
            <div className="p-2 rounded-full bg-wg-accent/10">
              <span className="text-wg-accent font-bold">$</span>
            </div>
          }
        />
      </div>

      {/* Filters Card */}
      <Card className="bg-wg-neutral2 border-wg-accent/20 mb-6">
        <CardHeader>
          <CardTitle className="text-wg-primary flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
          <CardDescription className="text-wg-primary/60">
            Filter roi transactions by various criteria
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search by Transaction ID */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-wg-primary/80">
                Transaction ID
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-wg-primary/40" />
                <Input
                  placeholder="Enter transaction ID..."
                  value={filters.transactionId || ""}
                  onChange={(e) =>
                    handleFilterChange("transactionId", e.target.value)
                  }
                  className="pl-10 bg-wg-neutral border-wg-accent/20 text-wg-primary"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-wg-primary/80">
                Status
              </label>
              <Select
                value={filters.status || ""}
                onValueChange={(value) =>
                  handleFilterChange(
                    "status",
                    value === "" ? undefined : (value as TransactionStatus)
                  )
                }
              >
                <SelectTrigger className="bg-wg-neutral border-wg-accent/20 text-wg-primary">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent className="bg-wg-neutral2 border-wg-accent/20">
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="FAILED">Failed</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-wg-primary/80">
                Date
              </label>
              <Input
                type="date"
                value={
                  filters.date ? filters.date.toISOString().split("T")[0] : ""
                }
                onChange={(e) =>
                  handleFilterChange(
                    "date",
                    e.target.value ? new Date(e.target.value) : undefined
                  )
                }
                className="bg-wg-neutral border-wg-accent/20 text-wg-primary"
              />
            </div>

            {/* Sort Order */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-wg-primary/80">
                Sort Order
              </label>
              <Select
                value={filters.order || "desc"}
                onValueChange={(value) =>
                  handleFilterChange("order", value as "asc" | "desc")
                }
              >
                <SelectTrigger className="bg-wg-neutral border-wg-accent/20 text-wg-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-wg-neutral2 border-wg-accent/20">
                  <SelectItem value="desc">Newest First</SelectItem>
                  <SelectItem value="asc">Oldest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-wg-primary/60">
              Showing {transactions.length} of {total} rois
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleClearFilters}
                className="border-wg-accent/30 text-wg-primary hover:bg-wg-accent/10"
              >
                Clear Filters
              </Button>
              <Button
                onClick={() => fetchRois()}
                className="bg-wg-accent text-white hover:bg-wg-accent/90"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table Card */}
      <Card className="bg-wg-neutral2 border-wg-accent/20">
        <CardHeader>
          <CardTitle className="text-wg-primary">
            Roi Transactions
          </CardTitle>
          <CardDescription className="text-wg-primary/60">
            View and manage all roi transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TransactionTable
            transactions={transactions}
            loading={loading}
            onViewDetails={(transaction) => {
              setSelectedTransaction(transaction);
              setIsDetailsOpen(true);
            }}
            onDownloadProof={(transaction) => {
              if (transaction.proofUrl) {
                window.open(transaction.proofUrl, "_blank");
              }
            }}
            isAdmin={isAdmin}
            onAction={handleTransactionAction}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (page > 1) setPage(page - 1);
                      }}
                      className={
                        page <= 1
                          ? "pointer-events-none opacity-50"
                          : "hover:bg-wg-accent/20"
                      }
                    />
                  </PaginationItem>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (page <= 3) {
                      pageNum = i + 1;
                    } else if (page >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = page - 2 + i;
                    }

                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setPage(pageNum);
                          }}
                          isActive={pageNum === page}
                          className={
                            pageNum === page
                              ? "bg-wg-accent text-white hover:bg-wg-accent/90"
                              : "hover:bg-wg-accent/20"
                          }
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (page < totalPages) setPage(page + 1);
                      }}
                      className={
                        page >= totalPages
                          ? "pointer-events-none opacity-50"
                          : "hover:bg-wg-accent/20"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>

              {/* Page Size Selector */}
              <div className="flex items-center justify-center gap-2 mt-4 text-sm text-wg-primary/60">
                <span>Show</span>
                <Select
                  value={limit.toString()}
                  onValueChange={(value) => setLimit(parseInt(value))}
                >
                  <SelectTrigger className="w-20 h-8 bg-wg-neutral border-wg-accent/20 text-wg-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-wg-neutral2 border-wg-accent/20">
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
                <span>transactions per page</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Transaction Details Modal */}
      <TransactionDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        transaction={selectedTransaction}
        isAdmin={isAdmin}
        onAction={handleTransactionAction}
      />
    </div>
  );
};

export default RoisClient;
