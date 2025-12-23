import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TransactionType, TransactionStatus } from "@prisma/client";
import { Download, Copy, Calendar, Clock, FileText, Wallet } from "lucide-react";
import { formatDate, formatCurrency } from "@/lib/utils";
import { toast } from 'react-toastify'
import { TransactionDto } from "@/types/type";

interface TransactionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: TransactionDto | null;
  isAdmin?: boolean;
  onAction?: (transaction: TransactionDto, action: string) => void;
}

export function TransactionDetailsModal({
  isOpen,
  onClose,
  transaction,
  isAdmin = false,
  onAction,
}: TransactionDetailsModalProps) {
  if (!transaction) return null;

  const getTypeBadge = (type: TransactionType) => {
    const config = {
      [TransactionType.DEPOSIT]: { label: "Deposit", className: "bg-wg-primary text-wg-neutral" },
      [TransactionType.WITHDRAWAL]: { label: "Withdrawal", className: "bg-wg-secondary text-wg-primary" },
      [TransactionType.INTEREST]: { label: "Interest", className: "bg-wg-accent text-wg-neutral" },
    };

    const { label, className } = config[type];
    return <Badge className={className}>{label}</Badge>;
  };

  const getStatusBadge = (status: TransactionStatus) => {
    const config = {
      [TransactionStatus.PENDING]: {
        label: "Pending",
        className: "bg-amber-100 text-amber-800 border-amber-200",
      },
      [TransactionStatus.APPROVED]: {
        label: "Approved",
        className: "bg-emerald-100 text-emerald-800 border-emerald-200",
      },
      [TransactionStatus.REJECTED]: {
        label: "Rejected",
        className: "bg-rose-100 text-rose-800 border-rose-200",
      },
      [TransactionStatus.PAID]: {
        label: "Paid",
        className: "bg-blue-100 text-blue-800 border-blue-200",
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Transaction ID copied to clipboard")
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-gradient-to-b from-wg-neutral to-wg-neutral/95">
        <DialogHeader>
          <DialogTitle className="text-wg-primary flex items-center gap-2">
            <Wallet className="h-5 w-5 text-wg-accent" />
            Transaction Details
          </DialogTitle>
          <DialogDescription className="text-wg-primary/60">
            Complete information about this transaction
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-wg-primary/5 to-wg-primary/0 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-wg-primary/60">Amount</div>
                <div className={`text-2xl font-bold ${getAmountColor(transaction.type)}`}>
                  {getAmountPrefix(transaction.type)}
                  {formatCurrency(+transaction.amount)}
                </div>
              </div>
              <div className="flex gap-2">
                {getTypeBadge(transaction.type)}
                {getStatusBadge(transaction.status)}
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-sm font-medium text-wg-primary/60 flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                Created Date
              </div>
              <div className="text-wg-primary font-medium">
                {formatDate(transaction.createdAt)}
              </div>
            </div>

            {transaction.processedAt && (
              <div className="space-y-1">
                <div className="text-sm font-medium text-wg-primary/60 flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  Processed Date
                </div>
                <div className="text-wg-primary font-medium">
                  {formatDate(transaction.processedAt)}
                </div>
              </div>
            )}

            <div className="space-y-1 col-span-2">
              <div className="text-sm font-medium text-wg-primary/60">Transaction ID</div>
              <div className="flex items-center gap-2">
                <code className="text-sm font-mono text-wg-primary bg-wg-primary/5 px-3 py-1.5 rounded flex-1">
                  {transaction.id}
                </code>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(transaction.id)}
                  className="text-wg-primary hover:text-wg-accent hover:bg-wg-accent/10 cursor-pointer"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {transaction.investmentId && (
              <div className="space-y-1 col-span-2">
                <div className="text-sm font-medium text-wg-primary/60">Investment ID</div>
                <div className="flex items-center gap-2">
                  <code className="text-sm font-mono text-wg-primary bg-wg-primary/5 px-3 py-1.5 rounded flex-1">
                    {transaction.investmentId}
                  </code>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(transaction.investmentId!)}
                    className="text-wg-primary hover:text-wg-accent hover:bg-wg-accent/10 cursor-pointer"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          {transaction.description && (
            <div className="space-y-2">
              <div className="text-sm font-medium text-wg-primary/60 flex items-center gap-1">
                <FileText className="h-3.5 w-3.5" />
                Description
              </div>
              <div className="text-wg-primary bg-wg-primary/5 p-3 rounded-lg">
                {transaction.description}
              </div>
            </div>
          )}

          {/* Proof Document */}
          {transaction.proofUrl && (
            <div className="space-y-2">
              <div className="text-sm font-medium text-wg-primary/60">Proof Document</div>
              <a
                href={transaction.proofUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-wg-accent/10 text-wg-accent hover:bg-wg-accent/20 transition-colors"
              >
                <Download className="h-4 w-4" />
                Download Proof
              </a>
            </div>
          )}

          {/* Admin Actions */}
          {isAdmin && onAction && transaction.status === TransactionStatus.PENDING && (
            <div className="pt-4 border-t border-wg-primary/10">
              <div className="text-sm font-medium text-wg-primary mb-3">Admin Actions</div>
              <div className="flex gap-3">
                <Button
                  onClick={() => {
                    onAction(transaction, 'approve');
                    onClose();
                  }}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 cursor-pointer"
                >
                  Approve Transaction
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    onAction(transaction, 'reject');
                    onClose();
                  }}
                  className="flex-1 border-rose-300 text-rose-600 hover:bg-rose-50 hover:text-rose-700 cursor-pointer"
                >
                  Reject Transaction
                </Button>
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex justify-end pt-4 border-t border-wg-primary/10">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-wg-primary/20 text-wg-primary hover:bg-wg-primary/5 hover:text-wg-primary cursor-pointer"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}