"use client";

import { useState } from "react";
import { TransactionDto } from "@/types/type";
import { TransactionFilter, TransactionResponse } from "@/types/type";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { CalendarIcon, Filter, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { TransactionStatus, TransactionType } from "@prisma/client";
import { DateRange } from "react-day-picker";
import { TransactionTable } from "./TransactionTable";
import { TransactionDetailsModal } from "./TransactionDetailsModal";

interface TransactionClientProps {
  initialTransactions: TransactionDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const TransactionClient = ({
  initialTransactions,
  total,
  page,
  limit,
  totalPages,
}: TransactionClientProps) => {
  const [transactions, setTransactions] =
    useState<TransactionDto[]>(initialTransactions);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<TransactionFilter>({
    page: page,
    limit: limit,
  });
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionDto | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const fetchTransactions = async (filterParams: TransactionFilter) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (filterParams.type) queryParams.append("type", filterParams.type);
      if (filterParams.status)
        queryParams.append("status", filterParams.status);
      if (filterParams.startDate)
        queryParams.append("startDate", filterParams.startDate);
      if (filterParams.endDate)
        queryParams.append("endDate", filterParams.endDate);
      if (filterParams.page)
        queryParams.append("page", filterParams.page.toString());
      if (filterParams.limit)
        queryParams.append("limit", filterParams.limit.toString());

      const response = await fetch(`/api/transactions?${queryParams}`);
      const data: TransactionResponse = await response.json();

      setTransactions(data.transactions);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchTransactions(filters);
  // }, [filters.page]);

  const handleFilterChange = () => {
    const updatedFilters: TransactionFilter = {
      ...filters,
      page: 1,
      startDate: dateRange.from?.toISOString(),
      endDate: dateRange.to?.toISOString(),
    };
    setFilters(updatedFilters);
    fetchTransactions(updatedFilters);
  };

  const handleResetFilters = () => {
    setFilters({ page: 1, limit });
    setDateRange({
      from: undefined,
      to: undefined,
    });
    fetchTransactions({ page: 1, limit });
  };

  const getStatusBadge = (status: TransactionStatus) => {
    const statusConfig = {
      [TransactionStatus.PENDING]: {
        label: "Pending",
        className: "bg-amber-100 text-amber-800 hover:bg-amber-100",
      },
      [TransactionStatus.APPROVED]: {
        label: "Approved",
        className: "bg-emerald-100 text-emerald-800 hover:bg-emerald-100",
      },
      [TransactionStatus.REJECTED]: {
        label: "Rejected",
        className: "bg-rose-100 text-rose-800 hover:bg-rose-100",
      },
      [TransactionStatus.PAID]: {
        label: "Paid",
        className: "bg-blue-100 text-blue-800 hover:bg-blue-100",
      },
    };
    const config = statusConfig[status];
    return (
      <Badge className={cn("font-medium", config.className)}>
        {config.label}
      </Badge>
    );
  };

  const getTypeBadge = (type: TransactionType) => {
    const typeConfig = {
      [TransactionType.DEPOSIT]: {
        label: "Deposit",
        className: "bg-blue-50 text-blue-700 border-blue-200",
      },
      [TransactionType.WITHDRAWAL]: {
        label: "Withdrawal",
        className: "bg-rose-50 text-rose-700 border-rose-200",
      },
      [TransactionType.INTEREST]: {
        label: "Interest",
        className: "bg-emerald-50 text-emerald-700 border-emerald-200",
      },
    };
    const config = typeConfig[type];
    return (
      <Badge variant="outline" className={cn("font-medium", config.className)}>
        {config.label}
      </Badge>
    );
  };

  const getAmountColor = (type: TransactionType) => {
    return type === TransactionType.WITHDRAWAL
      ? "text-rose-600"
      : "text-emerald-600";
  };

  const getAmountPrefix = (type: TransactionType) => {
    return type === TransactionType.WITHDRAWAL ? "-" : "+";
  };

  console.log(transactions);
  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {/* Transaction Type Filter */}
          <div className="space-y-2 ">
            <label className="text-sm font-medium text-wg-primary flex items-center gap-2">
              <Filter className="h-3.5 w-3.5" />
              Transaction Type
            </label>
            <Select
              value={filters.type || ""}
              onValueChange={(value) =>
                setFilters({
                  ...filters,
                  type: value as TransactionType,
                  page: 1,
                })
              }
            >
              <SelectTrigger className="bg-wg-primary/5 border-wg-primary/20 hover:bg-wg-primary/10 focus:ring-wg-accent/20 w-full">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent className="bg-wg-neutral border-wg-primary/10">
                <SelectItem value="all" className="focus:bg-wg-primary/5">
                  All Types
                </SelectItem>
                <SelectItem
                  value={TransactionType.DEPOSIT}
                  className="focus:bg-wg-primary/5"
                >
                  Deposit
                </SelectItem>
                <SelectItem
                  value={TransactionType.WITHDRAWAL}
                  className="focus:bg-wg-primary/5"
                >
                  Withdrawal
                </SelectItem>
                <SelectItem
                  value={TransactionType.INTEREST}
                  className="focus:bg-wg-primary/5"
                >
                  Interest
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-wg-primary flex items-center gap-2">
              <CheckCircle className="h-3.5 w-3.5" />
              Status
            </label>
            <Select
              value={filters.status || ""}
              onValueChange={(value) =>
                setFilters({
                  ...filters,
                  status: value as TransactionStatus,
                  page: 1,
                })
              }
            >
              <SelectTrigger className="bg-wg-primary/5 border-wg-primary/20 hover:bg-wg-primary/10 focus:ring-wg-accent/20 w-full">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent className="bg-wg-neutral border-wg-primary/10">
                <SelectItem value="all" className="focus:bg-wg-primary/5">
                  All Status
                </SelectItem>
                <SelectItem
                  value={TransactionStatus.PENDING}
                  className="focus:bg-wg-primary/5"
                >
                  Pending
                </SelectItem>
                <SelectItem
                  value={TransactionStatus.APPROVED}
                  className="focus:bg-wg-primary/5"
                >
                  Approved
                </SelectItem>
                <SelectItem
                  value={TransactionStatus.REJECTED}
                  className="focus:bg-wg-primary/5"
                >
                  Rejected
                </SelectItem>
                <SelectItem
                  value={TransactionStatus.PAID}
                  className="focus:bg-wg-primary/5"
                >
                  Paid
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Range Filter */}
          <div className="space-y-2 col-span-2">
            <label className="text-sm font-medium text-wg-primary flex items-center gap-2">
              <CalendarIcon className="h-3.5 w-3.5" />
              Date Range
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal bg-wg-primary/5 border-wg-primary/20 hover:bg-wg-primary/10 hover:border-wg-accent/30 cursor-pointer"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-wg-primary/60" />
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} -{" "}
                        {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span className="text-wg-primary/60">
                      Pick a date range
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0 border-wg-primary/10"
                align="start"
              >
                <Calendar
                  initialFocus
                  mode="range"
                  required
                  defaultMonth={dateRange.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                  className="bg-wg-neutral"
                  classNames={{
                    day_selected:
                      "bg-wg-accent text-wg-neutral hover:bg-wg-accent hover:text-wg-neutral",
                    day_today: "bg-wg-primary/10 text-wg-primary",
                    day_outside: "text-wg-primary/30",
                    day_range_middle: "bg-wg-accent/20 text-wg-accent",
                    day_range_end: "bg-wg-accent text-wg-neutral",
                    day_range_start: "bg-wg-accent text-wg-neutral",
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Filter Actions */}
        <div className="flex gap-3">
          <Button
            onClick={handleFilterChange}
            className="gap-2 bg-gradient-to-r from-wg-primary to-wg-primary/80 hover:from-wg-secondary/90 hover:to-wg-secondary shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Filter className="h-4 w-4" />
            Apply Filters
          </Button>
          <Button
            variant="outline"
            onClick={handleResetFilters}
            className="border-wg-primary/20 text-wg-primary hover:bg-wg-secondary/5 hover:border-wg-secondary/30 cursor-pointer"
          >
            Reset Filters
          </Button>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="mt-8">
        <TransactionTable
          transactions={transactions || []}
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
          // isAdmin={user === "admin"}
          onAction={(transaction, action) => {
            // Handle admin actions
            console.log(`Action: ${action} on transaction: ${transaction.id}`);
          }}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (filters.page && filters.page > 1) {
                        setFilters({ ...filters, page: filters.page - 1 });
                      }
                    }}
                    className={`border-wg-primary/20 hover:bg-wg-primary/5 ${
                      filters.page === 1 ? "pointer-events-none opacity-50" : ""
                    }`}
                  />
                </PaginationItem>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setFilters({ ...filters, page: pageNum });
                        }}
                        isActive={filters.page === pageNum}
                        className={cn(
                          "border-wg-primary/20",
                          filters.page === pageNum
                            ? "bg-gradient-to-r from-wg-accent to-wg-accent/80 text-wg-neutral border-wg-accent hover:from-wg-accent/90 hover:to-wg-accent/70"
                            : "hover:bg-wg-primary/5"
                        )}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                {totalPages > 5 && (
                  <PaginationItem>
                    <span className="px-4 py-2 text-wg-primary/40">...</span>
                  </PaginationItem>
                )}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (filters.page && filters.page < totalPages) {
                        setFilters({ ...filters, page: filters.page + 1 });
                      }
                    }}
                    className={`border-wg-primary/20 hover:bg-wg-primary/5 ${
                      filters.page === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>

            <div className="text-center text-sm text-wg-primary/60 mt-4">
              Showing {((filters.page || 1) - 1) * limit + 1} to{" "}
              {Math.min((filters.page || 1) * limit, total)} of {total}{" "}
              transactions
            </div>
          </div>
        )}
      </div>

      {/* Transaction Details Modal */}
      <TransactionDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        transaction={selectedTransaction}
        // isAdmin={user?.role === "admin"}
        onAction={(transaction, action) => {
          // Handle admin actions
          console.log(`Action: ${action} on transaction: ${transaction.id}`);
        }}
      />
    </div>
  );
};

export default TransactionClient;
