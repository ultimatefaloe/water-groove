"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, Copy, Check, AlertCircle } from "lucide-react";

import { Modal } from "@/components/ui/modal";
import { FormStepProgress } from "@/components/forms/form-step-progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  INVESTMENT_CATEGORIES,
  BankDetails,
  InvestmentCategoryDto,
} from "@/types/type";
import {
  depositFormSchema,
  DepositFormValues,
  ProofUploadFormValues,
  proofUploadSchema,
} from "@/lib/zod";

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  investmentCategories: InvestmentCategoryDto[]
}

export function DepositModal({ isOpen, onClose, investmentCategories }: DepositModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [bankDetails, setBankDetails] = useState<BankDetails | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Step 1 Form
  const depositForm = useForm<DepositFormValues>({
    resolver: zodResolver(depositFormSchema as any),
    defaultValues: {
      investmentId: "",
      amount: 0,
      description: "",
    },
  });

  // Step 3 Form
  const proofForm = useForm<ProofUploadFormValues>({
    resolver: zodResolver(proofUploadSchema as any),
  });

  const steps = [
    { id: 1, label: "Fill Form", description: "Enter deposit details" },
    { id: 2, label: "Bank Details", description: "Send payment" },
    { id: 3, label: "Upload Proof", description: "Upload receipt" },
    { id: 4, label: "Pending", description: "Awaiting confirmation" },
  ];

  const handleDepositSubmit = async (data: DepositFormValues) => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      // Mock bank details response
      const mockBankDetails: BankDetails = {
        bankName: "Zenith Bank",
        accountNumber: "1012345678",
        accountName: "INVESTFLOW TECHNOLOGIES LTD",
        reference: `REF-${Date.now()}`,
      };

      setBankDetails(mockBankDetails);
      setCompletedSteps([1]);
      setCurrentStep(2);
      setIsSubmitting(false);
    }, 1500);
  };

  const handleProofSubmit = async (data: ProofUploadFormValues) => {
    setIsSubmitting(true);

    // Simulate upload
    setTimeout(() => {
      setCompletedSteps([...completedSteps, 2, 3]);
      setCurrentStep(4);
      setIsSubmitting(false);
    }, 1500);
  };

  const handleCopyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000); 
  };

  const resetModal = () => {
    setCurrentStep(1);
    setCompletedSteps([]);
    setBankDetails(null);
    depositForm.reset();
    proofForm.reset();
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Make a Deposit"
      description="Complete the following steps to deposit funds into your investment account"
      className="w-full max-w-[95%] sm:max-w-[520px] md:max-w-[600px] lg:max-w-[680px]"
    >
      <div className="px-1 sm:px-0">
        {/* Policy Alert */}
        <Alert className="mb-5 bg-blue-50 border-blue-200">
          <AlertCircle className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-700 text-sm leading-relaxed">
            <strong>Important:</strong> Ensure all deposit details are accurate.
            Deposits are processed within 24–48 hours.
          </AlertDescription>
        </Alert>

        {/* Step Progress */}
        <FormStepProgress
          steps={steps}
          currentStep={currentStep}
          completedSteps={completedSteps}
          className="mb-6"
        />

        {/* STEP 1 */}
        {currentStep === 1 && (
          <Form {...depositForm}>
            <form
              onSubmit={depositForm.handleSubmit(handleDepositSubmit)}
              className="space-y-5"
            >
              {/* Investment */}
              <FormField
                control={depositForm.control}
                name="investmentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Investment Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select investment category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {investmentCategories.map((investment) => (
                          <SelectItem key={investment.id} value={investment.id}>
                            <div className="flex gap-2 items-center">
                              <span>{investment.name}</span>
                              <span className="text-xs text-muted-foreground">
                                {investment.description}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription className="text-xs">
                      Choose the investment you want to fund
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Amount */}
              <FormField
                control={depositForm.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount (₦)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter amount"
                        inputMode="numeric"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Minimum deposit: ₦100,000
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={depositForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Enter deposit purpose or reference"
                        className="resize-none min-h-[90px]"
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Optional notes or reference
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                  {isSubmitting ? "Processing..." : "Continue to Payment"}
                </Button>
              </div>
            </form>
          </Form>
        )}

        {/* STEP 2 */}
        {currentStep === 2 && bankDetails && (
          <div className="space-y-6">
            <Alert className="bg-green-50 border-green-200">
              <AlertDescription className="text-green-700 text-sm">
                Transfer the exact amount using the reference below.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    label: "Bank Name",
                    value: bankDetails.bankName,
                    key: "bankName",
                  },
                  {
                    label: "Account Number",
                    value: bankDetails.accountNumber,
                    key: "accountNumber",
                  },
                ].map((item) => (
                  <div key={item.key} className="space-y-1">
                    <label className="text-sm font-medium">{item.label}</label>
                    <div className="flex items-center justify-between gap-3 p-3 border rounded-lg">
                      <span className="truncate font-medium text-sm">
                        {item.value}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleCopyToClipboard(item.value, item.key)
                        }
                      >
                        {copiedField === item.key ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Account Name */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Account Name</label>
                <div className="flex items-center justify-between gap-3 p-3 border rounded-lg">
                  <span className="truncate font-medium text-sm">
                    {bankDetails.accountName}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      handleCopyToClipboard(
                        bankDetails.accountName,
                        "accountName"
                      )
                    }
                  >
                    {copiedField === "accountName" ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Reference */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Reference</label>
                <div className="flex items-center justify-between gap-3 p-3 border rounded-lg bg-muted">
                  <span className="font-mono text-sm truncate">
                    {bankDetails.reference}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      handleCopyToClipboard(bankDetails.reference, "reference")
                    }
                  >
                    {copiedField === "reference" ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Use this reference during transfer
                </p>
              </div>
            </div>

            <Separator />

            <div className="flex flex-col-reverse gap-3 sm:flex-row">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(1)}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                className="flex-1"
                onClick={() => {
                  setCompletedSteps([...completedSteps, 2]);
                  setCurrentStep(3);
                }}
              >
                I’ve Sent Payment
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Upload Proof */}
        {currentStep === 3 && (
          <Form {...proofForm}>
            <form
              onSubmit={proofForm.handleSubmit(handleProofSubmit)}
              className="space-y-6"
            >
              <FormField
                control={proofForm.control}
                name="proofURL"
                render={({ field: { onChange, value, ...field } }) => (
                  <FormItem>
                    <FormLabel>Proof of Payment</FormLabel>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                      <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                      <p className="text-sm font-medium mb-2">
                        Upload your transfer receipt
                      </p>
                      <p className="text-xs text-muted-foreground mb-4">
                        Supported: JPG, PNG, PDF (Max 5MB)
                      </p>
                      <Input
                        type="file"
                        accept="image/jpeg,image/png,image/jpg,application/pdf"
                        onChange={(e) => onChange(e.target.files?.[0] || null)}
                        className="cursor-pointer"
                      />
                    </div>
                    {value && (
                      <div className="mt-4 p-3 border rounded-lg flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">{value.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(value.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                        <Badge variant="outline">Uploaded</Badge>
                      </div>
                    )}
                    <FormDescription>
                      Upload a clear screenshot or PDF of your bank transfer
                      receipt
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(2)}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? "Uploading..." : "Submit Proof"}
                </Button>
              </div>
            </form>
          </Form>
        )}

        {/* Step 4: Pending Confirmation */}
        {currentStep === 4 && (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center">
              <Check className="h-8 w-8 text-green-600" />
            </div>

            <div>
              <h3 className="text-xl font-semibold">
                Deposit Request Submitted
              </h3>
              <p className="text-muted-foreground mt-2">
                Your deposit is pending confirmation. We&apos;ll notify you once
                it&apos;s processed.
              </p>
            </div>

            <div className="space-y-2 text-sm">
              <p className="font-medium">Reference: {bankDetails?.reference}</p>
              <p className="text-muted-foreground">
                Processing time: 24-48 hours
              </p>
            </div>

            <div className="pt-6">
              <Button onClick={handleClose} className="w-full">
                Close
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
