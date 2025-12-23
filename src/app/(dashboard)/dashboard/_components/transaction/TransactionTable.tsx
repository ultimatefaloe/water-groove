import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TransactionType, TransactionStatus } from "@prisma/client";
import { Eye, Download, Calendar, ArrowRightLeft } from "lucide-react";
import { formatDate, formatCurrency } from "@/lib/utils";
import { TransactionDto } from "@/types/type";

interface TransactionTableProps {
  transactions: TransactionDto[];
  loading: boolean;
  onViewDetails: (transaction: TransactionDto) => void;
  onDownloadProof?: (transaction: TransactionDto) => void;
  isAdmin?: boolean;
  onAction?: (transaction: TransactionDto, action: string) => void;
}

export function TransactionTable({
  transactions,
  loading,
  onViewDetails,
  onDownloadProof,
  isAdmin = false,
  onAction,
}: TransactionTableProps) {
  const getTypeBadge = (type: TransactionType) => {
    const config = {
      [TransactionType.DEPOSIT]: { label: "Deposit", variant: "wg-primary" },
      [TransactionType.WITHDRAWAL]: {
        label: "Withdrawal",
        variant: "wg-secondary",
      },
      [TransactionType.INTEREST]: { label: "Interest", variant: "wg-accent" },
    };

    const { label, variant } = config[type];
    return (
      <Badge className={`bg-${variant} text-wg-neutral hover:bg-${variant}/90`}>
        {label}
      </Badge>
    );
  };

  const getStatusBadge = (status: TransactionStatus) => {
    const config = {
      [TransactionStatus.PENDING]: {
        label: "Pending",
        className: "bg-amber-100 text-amber-800 hover:bg-amber-100/80",
      },
      [TransactionStatus.APPROVED]: {
        label: "Approved",
        className: "bg-emerald-100 text-emerald-800 hover:bg-emerald-100/80",
      },
      [TransactionStatus.REJECTED]: {
        label: "Rejected",
        className: "bg-rose-100 text-rose-800 hover:bg-rose-100/80",
      },
      [TransactionStatus.PAID]: {
        label: "Paid",
        className: "bg-blue-100 text-blue-800 hover:bg-blue-100/80",
      },
    };

    const { label, className } = config[status];
    return <Badge className={className}>{label}</Badge>;
  };

  const getAmountColor = (type: TransactionType) => {
    return type === TransactionType.WITHDRAWAL
      ? "text-rose-600"
      : "text-emerald-600";
  };

  const getAmountPrefix = (type: TransactionType) => {
    return type === TransactionType.WITHDRAWAL ? "-" : "+";
  };

  return (
    <div className="rounded-lg border border-wg-primary/10">
      {/* Container for horizontal scrolling - allows table to maintain its structure */}
      <div className="grid">
        {/* Table with minimum width to prevent distortion */}
        <Table>
          <TableHeader className="bg-gradient-to-r from-wg-primary/5 to-wg-primary/0">
            <TableRow className="hover:bg-transparent">
              {/* Fixed column widths with responsive adjustments */}
              <TableHead className="font-semibold text-wg-primary py-3 px-4 w-[140px] min-w-[140px]">
                <div className="flex items-center gap-1">
                  Date & Time
                </div>
              </TableHead>

              <TableHead className="font-semibold text-wg-primary py-3 px-4 w-[160px] min-w-[160px]">
                <div className="flex items-center gap-1">
                  Transaction ID
                </div>
              </TableHead>

              <TableHead className="font-semibold text-wg-primary py-3 px-4 w-[120px] min-w-[120px]">
                <div className="flex items-center gap-1">
                  Type
                </div>
              </TableHead>

              <TableHead className="font-semibold text-wg-primary py-3 px-4 w-[120px] min-w-[120px]">
                <div className="flex items-center gap-1">
                  Status
                </div>
              </TableHead>

              <TableHead className="font-semibold text-wg-primary py-3 px-4 w-[140px] min-w-[140px] text-right">
                <div className="flex items-center justify-end gap-1">
                  Amount
                </div>
              </TableHead>

              <TableHead className="font-semibold text-wg-primary py-3 px-4 w-[180px] min-w-[180px] text-right">
                <div className="flex items-center justify-end gap-1">
                  Actions
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-64 text-center p-0">
                  <div className="flex flex-col items-center justify-center gap-4 py-16">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-wg-accent border-t-transparent"></div>
                    <p className="text-wg-primary/60">
                      Loading transactions...
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : transactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-48 text-center p-0">
                  <div className="flex flex-col items-center justify-center gap-3 py-16">
                    <div className="h-16 w-16 rounded-full bg-wg-primary/5 flex items-center justify-center">
                      <Eye className="h-8 w-8 text-wg-primary/40" />
                    </div>
                    <p className="text-wg-primary/60 font-medium">
                      No transactions found
                    </p>
                    <p className="text-sm text-wg-primary/40">
                      Try adjusting your filters
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  className="hover:bg-wg-primary/2.5 transition-colors duration-150 border-b border-wg-primary/5 last:border-0"
                >
                  {/* Date & Time - Fixed width */}
                  <TableCell className="py-3 px-4 w-[140px] min-w-[140px] align-top">
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-wg-primary">
                        {formatDate(transaction?.createdAt)}
                      </div>
                      <div className="text-xs text-wg-primary/60 font-mono">
                        {new Date(transaction.createdAt).toLocaleTimeString(
                          [],
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </div>
                    </div>
                  </TableCell>

                  {/* Transaction ID - Fixed width with truncation */}
                  <TableCell className="py-3 px-4 w-[160px] min-w-[160px] align-top">
                    <div className="space-y-1">
                      <div className="font-medium text-wg-primary">
                        <div className="truncate" title={transaction.id}>
                          Txn: {transaction.id.slice(0, 10)}...
                        </div>
                      </div>
                      {transaction.investmentId && (
                        <div
                          className="text-xs text-wg-primary/50 truncate"
                          title={transaction.investmentId}
                        >
                          Inv: {transaction.investmentId.substring(0, 10)}...
                        </div>
                      )}
                    </div>
                  </TableCell>

                  {/* Type - Fixed width */}
                  <TableCell className="py-3 px-4 w-[120px] min-w-[120px] align-top">
                    <div className="flex">{getTypeBadge(transaction.type)}</div>
                  </TableCell>

                  {/* Status - Fixed width */}
                  <TableCell className="py-3 px-4 w-[120px] min-w-[120px] align-top">
                    <div className="flex">
                      {getStatusBadge(transaction.status)}
                    </div>
                  </TableCell>

                  {/* Amount - Fixed width with right alignment */}
                  <TableCell
                    className={`py-3 px-4 w-[140px] min-w-[140px] align-top text-right font-semibold ${getAmountColor(
                      transaction.type
                    )}`}
                  >
                    <div className="flex flex-col items-end">
                      <div className="text-lg">
                        {getAmountPrefix(transaction.type)}
                        {formatCurrency(+transaction.amount)}
                      </div>
                      <div className="text-xs text-wg-primary/60 mt-1">NGN</div>
                    </div>
                  </TableCell>

                  {/* Actions - Fixed width with responsive button sizing */}
                  <TableCell className="py-3 px-4 w-[180px] min-w-[180px] align-top text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewDetails(transaction)}
                        className="h-8 px-2 sm:px-3 text-wg-primary hover:text-wg-accent hover:bg-wg-accent/10"
                      >
                        <Eye className="h-3.5 w-3.5 mr-1 sm:mr-1.5" />
                        <span className="hidden sm:inline">View</span>
                      </Button>

                      {isAdmin && onAction && (
                        <div className="flex gap-1">
                          {transaction.status === TransactionStatus.PENDING && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 px-2 border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
                                onClick={() => onAction(transaction, "approve")}
                              >
                                <span className="hidden sm:inline">
                                  Approve
                                </span>
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 px-2 border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                                onClick={() => onAction(transaction, "reject")}
                              >
                                <span className="hidden sm:inline">Reject</span>
                              </Button>
                            </>
                          )}
                        </div>
                      )}

                      {transaction.proofUrl && onDownloadProof && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDownloadProof(transaction)}
                          className="h-8 px-2 text-wg-primary hover:text-wg-secondary hover:bg-wg-secondary/10"
                        >
                          <Download className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
