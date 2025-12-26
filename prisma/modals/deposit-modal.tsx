"use client";

import {
  useActionState,
  useEffect,
  useState,
  useRef,
  useCallback,
  startTransition,
} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, Copy, Check, AlertCircle, X } from "lucide-react";

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
import { BankDetails, CategoryDto } from "@/types/type";
import {
  depositFormSchema,
  DepositFormValues,
  ProofUploadFormValues,
  proofUploadSchema,
} from "@/lib/zod";
import {
  createDeposit,
  createProofUpload,
  DepositActionState,
  UploadProofActionState,
} from "@/actions/client.action";
import { useDepositStepStore } from "@/store/deposit.store";

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  investmentCategories: CategoryDto[];
}

interface FormState {
  error?: string;
  success?: boolean;
  bankDetails?: BankDetails;
}

export function DepositModal({
  isOpen,
  onClose,
  investmentCategories,
}: DepositModalProps) {
  // Zustand store for step persistence only
  const {
    currentStep,
    completedSteps,
    bankDetails: storedBankDetails,
    setCurrentStep,
    setCompletedSteps,
    addCompletedStep,
    setBankDetails,
    reset,
    hasUnsavedProgress,
  } = useDepositStepStore();

  // Local state for form data (not persisted)
  const [depositData, setDepositData] = useState<DepositFormValues | null>(
    null
  );
  const [localBankDetails, setLocalBankDetails] = useState<BankDetails | null>(
    storedBankDetails || null
  );
  const [proofFile, setProofFile] = useState<File | null>(null);

  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showUnsavedChangesAlert, setShowUnsavedChangesAlert] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const initialState: DepositActionState = {
    success: false,
    error: undefined,
    bankDetails: undefined,
  };

  const proofInitialState: UploadProofActionState = {
    success: false,
    error: undefined,
    data: {
      reference: "",
    },
  };

  const [state, formAction, isPending] = useActionState(
    createDeposit,
    initialState
  );
  const [proofState, proofFormAction, isProofPending] = useActionState(
    createProofUpload,
    proofInitialState
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize forms
  const depositForm = useForm<DepositFormValues>({
    resolver: zodResolver(depositFormSchema as any),
    defaultValues: {
      investmentCatId: "",
      amount: 0,
      description: "",
    },
  });

  const proofForm = useForm<ProofUploadFormValues>({
    resolver: zodResolver(proofUploadSchema as any),
    defaultValues: {
      proofFile: undefined,
    },
  });

  // Sync local state with store on mount
  useEffect(() => {
    if (storedBankDetails) {
      setLocalBankDetails(storedBankDetails);
    }
  }, [storedBankDetails]);

  // Handle server response for bank details
  useEffect(() => {
    if (state.success && state.bankDetails) {
      setLocalBankDetails(state.bankDetails);
      setBankDetails(state.bankDetails); // Persist to store
      setCompletedSteps([1]);
      setCurrentStep(2);
    }
  }, [state, setBankDetails, setCompletedSteps, setCurrentStep]);

  // Handle server response for bank details
  useEffect(() => {
    if (proofState.success) {
      setCompletedSteps([3]);
      setCurrentStep(4);
    }
  }, [proofState, setCompletedSteps, setCurrentStep]);


  // Display error in a toast/alert
  useEffect(() => {
    if (state.error) {
      // Scroll to top to show error
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [state.error]);

  // Warn user about unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isOpen && hasUnsavedProgress() && currentStep < 4) {
        e.preventDefault();
        e.returnValue =
          "You have unsaved deposit progress. Are you sure you want to leave?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isOpen, hasUnsavedProgress, currentStep]);

  const steps = [
    { id: 1, label: "Fill Form", description: "Enter deposit details" },
    { id: 2, label: "Bank Details", description: "Send payment" },
    { id: 3, label: "Upload Proof", description: "Upload receipt" },
    { id: 4, label: "Pending", description: "Awaiting confirmation" },
  ];

  const handleDepositSubmit = (data: DepositFormValues) => {
    setDepositData(data);

    const formData = new FormData();
    formData.append("investmentCatId", data.investmentCatId);
    formData.append("amount", String(data.amount));
    formData.append("description", data.description);

    startTransition(() => {
      formAction(formData);
    });
  };

  const handleProofSubmit = async (data: ProofUploadFormValues) => {
    if (!data.proofFile || !localBankDetails?.reference) {
      return;
    }

    const formData = new FormData();
    formData.append("proofFile", data.proofFile);
    formData.append("reference", localBankDetails.reference);

    startTransition(() => {
      proofFormAction(formData);
    });
  };

  const handleCopyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleClose = useCallback(() => {
    if (currentStep < 4 && hasUnsavedProgress()) {
      setShowUnsavedChangesAlert(true);
    } else {
      performClose();
    }
  }, [currentStep, hasUnsavedProgress]);

  const performClose = useCallback(() => {
    setIsClosing(true);

    // Only reset if process is complete
    if (currentStep === 4) {
      reset();
      setDepositData(null);
      setLocalBankDetails(null);
      setProofFile(null);
    }

    setShowUnsavedChangesAlert(false);
    depositForm.reset();
    proofForm.reset();

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  }, [currentStep, reset, depositForm, proofForm, onClose]);

  const handleBackToForm = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    } else if (currentStep === 3) {
      setCurrentStep(2);
    }
  };

  const validateFile = (file: File): string | null => {
    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "application/pdf",
    ];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      return "File type not supported. Please upload JPG, PNG, or PDF.";
    }

    if (file.size > maxSize) {
      return "File size exceeds 5MB limit.";
    }

    return null;
  };

  const resetModal = () => {
    reset();
    setDepositData(null);
    setLocalBankDetails(null);
    setProofFile(null);
    setCurrentStep(1);
    depositForm.reset();
    proofForm.reset();

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, handleClose]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title="Make a Deposit"
        description="Complete the following steps to deposit funds into your investment account."
        className="w-full max-w-[95%] sm:max-w-[520px] md:max-w-[600px] lg:max-w-[680px]"
        disableClose={hasUnsavedProgress() && currentStep < 4}
      >
        <div className="px-1 sm:px-0">
          {/* Global Error Display - Only at top */}
          {state?.error || proofState.error && (
              <Alert
                variant="destructive"
                className="mb-5 animate-in slide-in-from-top duration-300 bg-red-500/20 border border-red-500 rounded-lg"
              >
                <X className="h-4 w-4 text-red-500"/>
                <AlertDescription className="text-sm text-red-500">
                  {state.error || proofState.error}
                </AlertDescription>
              </Alert>
            )}

          {/* Progress Saved Alert */}
          {completedSteps.length > 0 && currentStep < 4 && !state?.error && (
            <Alert className="mb-5 bg-green-50 border-green-200">
              <Check className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700 text-sm">
                Your progress is saved. You can safely close this window and
                return later.
              </AlertDescription>
            </Alert>
          )}

          {/* Policy Alert */}
          <Alert className="mb-5 bg-blue-50 border-blue-200">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-700 text-sm leading-relaxed">
              <strong>Important:</strong> Ensure all deposit details are
              accurate. Deposits are processed within 24–48 hours.
            </AlertDescription>
          </Alert>

          {/* Step Progress */}
          <FormStepProgress
            steps={steps}
            currentStep={currentStep}
            completedSteps={completedSteps}
            className="mb-6"
          />

          {/* STEP 1: Deposit Form */}
          {currentStep === 1 && (
            <Form {...depositForm}>
              <form
                onSubmit={depositForm.handleSubmit(handleDepositSubmit)}
                className="space-y-5"
                noValidate
              >
                {/* Investment Category */}
                <FormField
                  control={depositForm.control}
                  name="investmentCatId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Investment Category</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={isPending}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select investment category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {investmentCategories.map((investment) => (
                            <SelectItem
                              key={investment.id}
                              value={investment?.code}
                            >
                              <div className="flex flex-col">
                                <span className="font-medium">
                                  {investment.name}
                                </span>
                                <span className="text-xs text-muted-foreground truncate">
                                  {investment.description}
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                          min="100000"
                          step="1000"
                          disabled={isPending}
                          {...field}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
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
                          disabled={ isPending}
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
                    disabled={ isPending}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={ isPending}
                    className="flex-1"
                  >
                    { isPending ? (
                      <>
                        <span className="animate-spin mr-2">⟳</span>
                        Processing...
                      </>
                    ) : (
                      "Continue to Payment"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          )}

          {/* STEP 2: Bank Details */}
          {currentStep === 2 && localBankDetails && (
            <div className="space-y-6">
              <Alert className="bg-green-50 border-green-200">
                <AlertDescription className="text-green-700 text-sm">
                  Transfer the exact amount using the reference below. Your
                  progress is saved.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      label: "Bank Name",
                      value: localBankDetails.bankName,
                      key: "bankName",
                    },
                    {
                      label: "Account Number",
                      value: localBankDetails.accountNumber,
                      key: "accountNumber",
                    },
                  ].map((item) => (
                    <div key={item.key} className="space-y-1">
                      <label className="text-sm font-medium">
                        {item.label}
                      </label>
                      <div className="flex items-center justify-between gap-3 p-3 border rounded-lg bg-gray-50">
                        <span className="truncate font-medium text-sm">
                          {item.value}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleCopyToClipboard(item.value, item.key)
                          }
                          className="shrink-0"
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
                  <div className="flex items-center justify-between gap-3 p-3 border rounded-lg bg-gray-50">
                    <span className="truncate font-medium text-sm">
                      {localBankDetails.accountHolderName}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        handleCopyToClipboard(
                          localBankDetails.accountHolderName,
                          "accountHolderName"
                        )
                      }
                      className="shrink-0"
                    >
                      {copiedField === "accountHolderName" ? (
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
                  <div className="flex items-center justify-between gap-3 p-3 border rounded-lg bg-blue-50">
                    <span className="font-mono text-sm truncate">
                      {localBankDetails.reference}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        handleCopyToClipboard(
                          localBankDetails.reference ? localBankDetails?.reference : '',
                          "reference"
                        )
                      }
                      className="shrink-0"
                    >
                      {copiedField === "reference" ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Include this reference in your transfer. Required for
                    verification.
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex flex-col-reverse gap-3 sm:flex-row">
                <Button
                  variant="outline"
                  onClick={handleBackToForm}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => {
                    addCompletedStep(2);
                    setCurrentStep(3);
                  }}
                >
                  I've Sent Payment
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: Upload Proof */}
          {currentStep === 3 && (
            <Form {...proofForm}>
              <form
                onSubmit={proofForm.handleSubmit(handleProofSubmit)}
                className="space-y-6"
                noValidate
              >
                <FormField
                  control={proofForm.control}
                  name="proofFile"
                  render={({ field: { onChange, value, ...field } }) => (
                    <FormItem>
                      <FormLabel>Proof of Payment</FormLabel>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 sm:p-8 text-center">
                        <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                        <p className="text-sm font-medium mb-2">
                          Upload your transfer receipt
                        </p>
                        <p className="text-xs text-muted-foreground mb-4">
                          Supported: JPG, PNG, PDF (Max 5MB)
                        </p>
                        <Input
                          ref={fileInputRef}
                          type="file"
                          accept="image/jpeg,image/png,image/jpg,application/pdf"
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            if (file) {
                              const error = validateFile(file);
                              if (error) {
                                proofForm.setError("proofFile", {
                                  message: error,
                                });
                                return;
                              }
                              onChange(file);
                              proofForm.clearErrors("proofFile");
                            } else {
                              onChange(null);
                            }
                          }}
                          className="cursor-pointer"
                          disabled={isProofPending}
                        />
                      </div>
                      {value && (
                        <div className="mt-4 p-3 border rounded-lg flex items-center justify-between">
                          <div className="truncate">
                            <p className="text-sm font-medium truncate">
                              {value.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {(value.size / 1024).toFixed(2)} KB •{" "}
                              {value.type.split("/")[1].toUpperCase()}
                            </p>
                          </div>
                          <Badge variant="outline">Uploaded</Badge>
                        </div>
                      )}
                      <FormDescription>
                        Upload a clear screenshot or PDF of your bank transfer
                        receipt.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBackToForm}
                    className="flex-1"
                    disabled={isProofPending}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={ !proofForm.watch("proofFile")}
                    className="flex-1"
                  >
                    {isProofPending ? (
                      <>
                        <span className="animate-spin mr-2">⟳</span>
                        Uploading...
                      </>
                    ) : (
                      "Submit Proof"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          )}

          {/* STEP 4: Pending Confirmation */}
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
                  Your deposit is pending confirmation. We'll notify you once
                  it's processed.
                </p>
              </div>

              <div className="space-y-2 text-sm">
                <p className="font-medium">
                  Reference: {localBankDetails?.reference}
                </p>
                <p className="text-muted-foreground">
                  Processing time: 24-48 hours
                </p>
              </div>

              <div className="pt-6 space-y-3">
                <Button
                  onClick={performClose}
                  className="w-full"
                  disabled={isProofPending}
                >
                  {isProofPending ? "Closing..." : "Close"}
                </Button>
                <Button
                  variant="outline"
                  onClick={resetModal}
                  className="w-full"
                >
                  Start New Deposit
                </Button>
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* Unsaved Changes Alert */}
      {showUnsavedChangesAlert && (
        <Modal
          isOpen={showUnsavedChangesAlert}
          onClose={() => setShowUnsavedChangesAlert(false)}
          title="Unsaved Progress"
          description="You have unsaved deposit progress. What would you like to do?"
          className="max-w-md"
        >
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              Your deposit progress is saved locally. You can continue later or
              discard it now.
            </p>
            <div className="flex flex-col gap-3 pt-4">
              <Button
                onClick={() => setShowUnsavedChangesAlert(false)}
                variant="outline"
              >
                Continue Deposit
              </Button>
              <Button
                onClick={() => {
                  reset();
                  performClose();
                }}
                variant="destructive"
              >
                Discard & Close
              </Button>
              <Button onClick={performClose}>
                Save & Close (Keep Progress)
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
