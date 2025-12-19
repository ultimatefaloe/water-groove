"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, AlertCircle } from "lucide-react";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<WithdrawalFormValues>({
    resolver: zodResolver(withdrawalFormSchema as any),
    defaultValues: {
      bankHolderName: "",
      bankName: "",
      bankAccountNumber: "",
      amount: 0,
      narration: "",
    },
  });

  const handleSubmit = async (data: WithdrawalFormValues) => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsSubmitting(false);
    }, 1500);
  };

  const resetModal = () => {
    setIsSubmitted(false);
    form.reset();
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Withdraw Funds"
      description="Request withdrawal from your investment account"
      className="w-full max-w-[95%] sm:max-w-[460px] md:max-w-[520px]"
    >
      <div className="px-1 sm:px-0">
        {!isSubmitted ? (
          <>
            {/* Available Balance */}
            <div className="mb-5 p-4 sm:p-5 bg-muted rounded-lg">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Available Balance
                  </p>
                  <p className="text-xl sm:text-2xl font-bold break-all">
                    ₦{availableBalance.toLocaleString()}
                  </p>
                </div>
                <Badge variant="outline" className="w-fit">
                  Withdrawable
                </Badge>
              </div>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-5"
              >
                {/* Account Holder */}
                <FormField
                  control={form.control}
                  name="bankHolderName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Holder Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter account holder name"
                          {...field}
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
                          <Input placeholder="e.g., Zenith Bank" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bankAccountNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="10-digit number"
                            inputMode="numeric"
                            {...field}
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
                        <Input
                          type="number"
                          inputMode="numeric"
                          placeholder="Enter amount"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Narration */}
                <FormField
                  control={form.control}
                  name="narration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Narration</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter withdrawal purpose"
                          className="resize-none min-h-[90px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator />

                {/* Alert */}
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
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    {isSubmitting ? "Processing..." : "Request Withdrawal"}
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
                Your request has been submitted successfully. Funds will be
                transferred within 24–72 hours.
              </p>
            </div>

            <div className="space-y-1 text-sm">
              <p className="font-medium break-all">
                Reference: WTH-{Date.now()}
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
