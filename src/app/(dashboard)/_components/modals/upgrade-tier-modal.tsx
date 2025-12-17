"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, TrendingUp, Zap, Shield, Crown, Star } from "lucide-react";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { INVESTMENT_CATEGORIES, InvestmentCategory } from "@/types/invesment";
import { DepositModal } from "./deposit-modal";
import { UpgradeFormValues, upgradeFormSchema } from "@/lib/zod";

interface UpgradeTierModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTier?: InvestmentCategory;
}

export function UpgradeTierModal({
  isOpen,
  onClose,
  currentTier = InvestmentCategory.STARTER,
}: UpgradeTierModalProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<InvestmentCategory | null>(null);
  const [showDepositModal, setShowDepositModal] = useState(false);

  const form = useForm<UpgradeFormValues>({
    resolver: zodResolver(upgradeFormSchema as any),
  });

  const handleSubmit = (data: UpgradeFormValues) => {
    setSelectedCategory(data.investmentCategory);
    form.reset();
    onClose();
    setShowDepositModal(true);
  };

  const getTierIcon = (tier: InvestmentCategory) => {
    switch (tier) {
      case InvestmentCategory.STARTER:
        return <Star className="h-5 w-5" />;
      case InvestmentCategory.GROWTH:
        return <TrendingUp className="h-5 w-5" />;
      case InvestmentCategory.PREMIUM:
        return <Zap className="h-5 w-5" />;
      case InvestmentCategory.ELITE:
        return <Shield className="h-5 w-5" />;
      case InvestmentCategory.EXECUTIVE:
        return <Crown className="h-5 w-5" />;
      default:
        return <Star className="h-5 w-5" />;
    }
  };

  const getTierColor = (tier: InvestmentCategory) => {
    switch (tier) {
      case InvestmentCategory.STARTER:
        return "border-blue-200 bg-blue-50";
      case InvestmentCategory.GROWTH:
        return "border-green-200 bg-green-50";
      case InvestmentCategory.PREMIUM:
        return "border-purple-200 bg-purple-50";
      case InvestmentCategory.ELITE:
        return "border-amber-200 bg-amber-50";
      case InvestmentCategory.EXECUTIVE:
        return "border-red-200 bg-red-50";
      default:
        return "";
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Upgrade Investment Tier"
        description="Select your desired investment tier and start funding"
        className="w-full max-w-[95%] sm:max-w-[520px] md:max-w-[600px] lg:max-w-[680px]"
      >
        <div className="px-1 sm:px-0 space-y-6">
          {/* Current Tier */}
          <div className="p-4 sm:p-5 border rounded-lg">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                {getTierIcon(currentTier)}
                <div>
                  <p className="text-sm text-muted-foreground">Current Tier</p>
                  <p className="font-semibold break-words">
                    {
                      INVESTMENT_CATEGORIES.find(
                        (cat) => cat.value === currentTier
                      )?.label
                    }
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="w-fit">
                Active
              </Badge>
            </div>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              {/* Tier Selection */}
              <FormField
                control={form.control}
                name="investmentCategory"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormLabel>Select New Investment Tier</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                      >
                        {INVESTMENT_CATEGORIES.map((category) => {
                          const isCurrent = currentTier === category.value;

                          const currentMin =
                            INVESTMENT_CATEGORIES.find(
                              (c) => c.value === currentTier
                            )?.minAmount ?? 0;

                          const isHigher = category.minAmount > currentMin;

                          return (
                            <FormItem key={category.value} className="relative">
                              <FormControl>
                                <RadioGroupItem
                                  value={category.value}
                                  id={category.value}
                                  className="sr-only"
                                  disabled={!isHigher}
                                />
                              </FormControl>

                              <FormLabel
                                htmlFor={category.value}
                                className={`
                            relative flex flex-col h-full p-4 sm:p-5 border rounded-lg
                            cursor-pointer transition-all
                            ${getTierColor(category.value)}
                            ${
                              field.value === category.value
                                ? "ring-2 ring-primary"
                                : ""
                            }
                            ${
                              !isHigher
                                ? "opacity-60 cursor-not-allowed"
                                : "hover:border-primary"
                            }
                          `}
                              >
                                <div className="flex items-start justify-between gap-2 mb-2">
                                  <div className="flex items-center gap-2">
                                    {getTierIcon(category.value)}
                                    <span className="font-semibold">
                                      {category.label}
                                    </span>
                                  </div>
                                  {isCurrent && (
                                    <Badge
                                      variant="secondary"
                                      className="shrink-0"
                                    >
                                      Current
                                    </Badge>
                                  )}
                                </div>

                                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                                  {category.description}
                                </p>

                                <div className="space-y-1 text-sm">
                                  <div className="flex justify-between gap-2">
                                    <span>Minimum:</span>
                                    <span className="font-medium break-all">
                                      ₦{category.minAmount.toLocaleString()}
                                    </span>
                                  </div>
                                  <div className="flex justify-between gap-2">
                                    <span>Maximum:</span>
                                    <span className="font-medium break-all">
                                      {category.maxAmount === 50000000
                                        ? "₦10M+"
                                        : `₦${category.maxAmount.toLocaleString()}`}
                                    </span>
                                  </div>
                                </div>

                                {!isHigher && (
                                  <div className="absolute inset-0 bg-white/70 rounded-lg flex items-center justify-center px-4 text-center">
                                    <span className="text-sm font-medium text-muted-foreground">
                                      Current or lower tier
                                    </span>
                                  </div>
                                )}
                              </FormLabel>
                            </FormItem>
                          );
                        })}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />

              {/* Benefits */}
              <div className="space-y-3">
                <h4 className="font-medium">Benefits of Upgrading:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {[
                    "Higher returns on investment",
                    "Priority customer support",
                    "Access to premium investment opportunities",
                    "Lower withdrawal fees",
                  ].map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-600 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="w-full"
                >
                  Cancel
                </Button>
                <Button type="submit" className="w-full">
                  Continue to Deposit
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </Modal>

      {/* Show deposit modal after tier selection */}
      {selectedCategory && (
        <DepositModal
          isOpen={showDepositModal}
          onClose={() => setShowDepositModal(false)}
        />
      )}
    </>
  );
}
