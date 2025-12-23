"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, AlertCircle, Loader2 } from "lucide-react";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { withdrawalFormSchema, WithdrawalFormValues } from "@/lib/zod";
import {
  WithdrawalActionState,
  withdrawaRequestAction,
} from "@/actions/client.action";

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableBalance: number;
}

export function WithdrawalModal({
  isOpen,
  onClose,
  availableBalance,
}: WithdrawalModalProps) {
  const initialState: WithdrawalActionState = {
    success: false,
    error: undefined,
    validationErrors: undefined,
    message: "",
    data: {
      reference: "",
    },
  };
  const [isForm, setIsForm] = useState<boolean>(true)

  const [state, formAction, isPending] = useActionState(
    withdrawaRequestAction,
    initialState
  );

  const form = useForm<WithdrawalFormValues>({
    resolver: zodResolver(withdrawalFormSchema),
    defaultValues: {
      bankName: "",
      accountNumber: "",
      accountHolderName: "",
      amount: 0,
    },
  });

  const formRef = useRef<HTMLFormElement>(null);
  const previousIsOpenRef = useRef(isOpen);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen && previousIsOpenRef.current) {
      form.reset();
    }
    previousIsOpenRef.current = isOpen;
  }, [isOpen, form]);

  // Handle server validation errors
  useEffect(() => {
    if (state.validationErrors) {
      Object.entries(state.validationErrors).forEach(([field, message]) => {
        if (field in form.getValues()) {
          form.setError(field as keyof WithdrawalFormValues, {
            type: "server",
            message: Array.isArray(message) ? message[0] : message,
          });
        }
      });
    }

    if (state.success) {
      form.reset();
    }
  }, [state, form]);

  // Handle modal close with proper cleanup
  const handleClose = () => {
    if (isPending) return;
    form.reset();
    onClose();
    setIsForm(true)
  };

  // Format amount for display
  const formatAmount = (amount: number) => {
    return `₦${amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  // Check if amount exceeds available balance
  const amount = form.watch("amount") || 0;
  const amountError =
    amount > availableBalance
      ? "Amount exceeds available balance"
      : amount < 10000
      ? "Minimum withdrawal is ₦10,000"
      : undefined;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Withdraw Funds"
      description="Request withdrawal from your investment account"
      className="w-full max-w-[95%] sm:max-w-[460px] md:max-w-[520px]"
      disableClose={isPending}
    >
      <div className="px-1 sm:px-0">
        {isForm ? (
          <>
            {/* Available Balance */}
            <div className="mb-5 p-4 sm:p-5 bg-muted rounded-lg">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Available Balance
                  </p>
                  <p className="text-xl sm:text-2xl font-bold break-all">
                    {formatAmount(availableBalance)}
                  </p>
                </div>
                <Badge variant="outline" className="w-fit">
                  Withdrawable
                </Badge>
              </div>
              {amount > 0 && (
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Requested:</span>
                    <span className="font-medium">{formatAmount(amount)}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-muted-foreground">Remaining:</span>
                    <span
                      className={`font-medium ${
                        amount > availableBalance
                          ? "text-destructive"
                          : "text-green-600"
                      }`}
                    >
                      {formatAmount(Math.max(0, availableBalance - amount))}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Server Error Alert */}
            {state.error && !state.validationErrors && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}

            <Form {...form}>
              <form
                ref={formRef}
                action={async (formData: FormData) => {
                  // Parse form data before passing to server action
                  const data = {
                    bankName: formData.get("bankName") as string,
                    accountHolderName: formData.get(
                      "accountHolderName"
                    ) as string,
                    accountNumber: formData.get("accountNumber") as string,
                    amount: parseFloat(formData.get("amount") as string) || 0,
                  };

                  // Validate client-side first
                  const result = await form.trigger();
                  if (!result) return;

                  // Create new FormData with proper types
                  const validatedFormData = new FormData();
                  validatedFormData.append("bankName", data.bankName);
                  validatedFormData.append(
                    "accountHolderName",
                    data.accountHolderName
                  );
                  validatedFormData.append("accountNumber", data.accountNumber);
                  validatedFormData.append("amount", data.amount.toString());

                  // Call server action
                  return formAction(validatedFormData);

                  if(state.success) setIsForm(false)
                }}
                className="space-y-5"
              >
                {/* Account Holder */}
                <FormField
                  control={form.control}
                  name="accountHolderName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Holder Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter account holder name"
                          {...field}
                          disabled={isPending}
                          aria-disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Bank Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="bankName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bank Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Zenith Bank"
                            {...field}
                            disabled={isPending}
                            aria-disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="accountNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="10-digit number"
                            inputMode="numeric"
                            maxLength={10}
                            pattern="[0-9]*"
                            {...field}
                            disabled={isPending}
                            aria-disabled={isPending}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, "");
                              field.onChange(value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Amount */}
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount (₦)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="number"
                            inputMode="decimal"
                            placeholder="Enter amount"
                            {...field}
                            disabled={isPending}
                            aria-disabled={isPending}
                            onChange={(e) => {
                              const value = parseFloat(e.target.value);
                              field.onChange(isNaN(value) ? 0 : value);
                            }}
                            min={10000}
                            max={availableBalance}
                            step="0.01"
                          />
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            NGN
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.amount?.message || amountError}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                <Separator />

                {/* Info Alert */}
                <Alert className="bg-amber-50 border-amber-200">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-amber-700 text-sm leading-relaxed">
                    Withdrawals are processed within 24–72 hours. Minimum
                    withdrawal: ₦10,000
                  </AlertDescription>
                </Alert>

                {/* Actions */}
                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    className="flex-1"
                    disabled={isPending}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isPending || !!amountError || amount === 0}
                    className="flex-1 min-h-[40px]"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Request Withdrawal"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </>
        ) : (
          /* Success State */
          <div className="text-center py-6 sm:py-8 space-y-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center">
              <Check className="h-7 w-7 sm:h-8 sm:w-8 text-green-600" />
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-semibold">
                Withdrawal Request Sent
              </h3>
              <p className="text-muted-foreground mt-2 text-sm sm:text-base">
                {state.message ||
                  "Your request has been submitted successfully. Funds will be transferred within 24–72 hours."}
              </p>
            </div>

            <div className="space-y-1 text-sm">
              <p className="font-medium break-all">
                Reference: {state.data?.reference}
              </p>
              <p className="text-muted-foreground">
                You&apos;ll receive a confirmation email shortly
              </p>
            </div>

            <div className="pt-4">
              <Button onClick={handleClose} className="w-full">
                Close
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
