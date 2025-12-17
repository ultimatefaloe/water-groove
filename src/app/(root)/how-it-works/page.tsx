import React from "react";
import Link from "next/link";
import { Metadata } from 'next'
import {
  UserPlus,
  Upload,
  ShieldCheck,
  TrendingUp,
  Wallet,
  ArrowRight,
  CheckCircle,
  Users,
  BarChart3,
  Clock,
  HelpCircle,
  Mail,
  Phone,
  Shield,
  Lock,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const HowItWorks = () => {
  const metadata: Metadata = {
    title: "How It Works | WG",
    
  }

  const steps = [
    {
      number: "01",
      icon: <UserPlus className="h-10 w-10" />,
      title: "Account Creation",
      description: "Register and access your personal investment dashboard",
      details: [
        "Complete secure registration form",
        "Verify identity with required documents",
        "Access personalized dashboard",
      ],
      time: "5-10 minutes",
    },
    {
      number: "02",
      icon: <Upload className="h-10 w-10" />,
      title: "Funds Deposit",
      description: "Transfer funds and upload payment confirmation",
      details: [
        "Select investment amount",
        "Transfer to secure bank account",
        "Upload payment confirmation",
      ],
      time: "15-30 minutes",
    },
    {
      number: "03",
      icon: <ShieldCheck className="h-10 w-10" />,
      title: "Verification Process",
      description: "Manual review and approval of all deposits",
      details: [
        "Compliance team review",
        "Payment validation",
        "Account funding notification",
      ],
      time: "1-4 hours",
    },
    {
      number: "04",
      icon: <TrendingUp className="h-10 w-10" />,
      title: "Monthly Returns",
      description: "Track returns through your dashboard",
      details: [
        "Receive monthly investment returns",
        "Real-time performance tracking",
        "Detailed transaction history",
      ],
      time: "Monthly",
    },
    {
      number: "05",
      icon: <Wallet className="h-10 w-10" />,
      title: "Withdrawal Requests",
      description: "Withdraw returns based on eligibility",
      details: [
        "Submit withdrawal request",
        "Processing and approval",
        "Funds transfer to account",
      ],
      time: "24-48 hours",
    },
  ];

  // Split steps into two rows: first 3, last 2
  const firstRowSteps = steps.slice(0, 3);
  const secondRowSteps = steps.slice(3, 5);

  const faqs = [
    {
      question: "What is the minimum investment amount?",
      answer: "The minimum investment starts at ₦2,000,000 (₦2M). This allows optimal returns while maintaining portfolio diversification.",
      icon: <Wallet className="h-6 w-6" />,
    },
    {
      question: "How are returns calculated?",
      answer: "Returns are calculated monthly based on invested amount and project performance. Average annual returns range from 12-15%.",
      icon: <BarChart3 className="h-6 w-6" />,
    },
    {
      question: "How long does verification take?",
      answer: "Manual verification typically takes 1-4 hours during business hours. Weekend deposits are processed next business day.",
      icon: <Clock className="h-6 w-6" />,
    },
    {
      question: "When can I withdraw my returns?",
      answer: "You can withdraw ROI monthly after it's credited. Principal withdrawals follow specific project terms.",
      icon: <RefreshCw className="h-6 w-6" />,
    },
    {
      question: "Is my investment secure?",
      answer: "Yes, all investments are asset-backed with rigorous due diligence and strict regulatory compliance.",
      icon: <Shield className="h-6 w-6" />,
    },
    {
      question: "Can I track investment performance?",
      answer: "Yes, real-time dashboard access with detailed performance metrics and transaction history.",
      icon: <TrendingUp className="h-6 w-6" />,
    },
  ];

  const benefits = [
    {
      icon: <Shield className="h-7 w-7" />,
      title: "Secure & Regulated",
      description: "All investments undergo compliance checks",
    },
    {
      icon: <Users className="h-7 w-7" />,
      title: "Manual Oversight",
      description: "Every transaction reviewed by experts",
    },
    {
      icon: <BarChart3 className="h-7 w-7" />,
      title: "Transparent Reporting",
      description: "Dashboard with detailed analytics",
    },
    {
      icon: <Lock className="h-7 w-7" />,
      title: "Capital Protection",
      description: "Asset-backed with multiple safeguards",
    },
  ];

  return (
    <div className="min-h-screen bg-sidebar">
      {/* Hero Section */}
      <section className="relative pt-28 pb-24 overflow-hidden bg-gradient-to-b from-white via-wg-primary/5 to-white">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-wg-primary/5 border border-wg-primary/20 mb-8">
              <TrendingUp className="h-4 w-4 text-wg-primary" />
              <span className="text-sm font-medium text-wg-primary">
                Structured Investment Process
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-semibold text-wg-primary mb-8 tracking-tight">
              How Water Grove
              <span className="block text-wg-secondary mt-3">Investment Process Works</span>
            </h1>

            <p className="text-xl text-wg-primary/70 mb-12 max-w-3xl mx-auto leading-relaxed">
              Our structured 5-step process ensures transparency, security, and clarity 
              at every stage of your investment journey.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-wg-primary hover:bg-wg-primary/90 text-white px-10 py-7 text-base"
                >
                  Begin Investing <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/investment-sectors">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-wg-primary text-wg-primary hover:bg-wg-primary/5 px-10 py-7 text-base"
                >
                  Explore Investment Opportunities
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Overview */}
      <section className="py-16 bg-gradient-to-r from-wg-primary/5 to-transparent">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-sidebar-border hover:border-wg-primary/30 transition-colors"
              >
                <div className="p-4 rounded-xl bg-wg-primary/10 mb-4">
                  <div className="text-wg-primary">{benefit.icon}</div>
                </div>
                <h3 className="font-semibold text-wg-primary text-base mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-wg-primary/60">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5-Step Flow - Split into 3 + 2 rows */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-semibold text-wg-primary mb-6">
              5-Step Investment Process
            </h2>
            <p className="text-xl text-wg-primary/70 max-w-3xl mx-auto leading-relaxed">
              Structured approach ensuring clarity and security at every stage
            </p>
          </div>

          {/* First Row - 3 Steps */}
          <div className="max-w-7xl mx-auto mb-12 lg:mb-16">
            <div className="grid lg:grid-cols-3 gap-8">
              {firstRowSteps.map((step, index) => (
                <div key={index} className="relative">
                  {/* Step Card */}
                  <div className="bg-white border-2 border-sidebar-border rounded-2xl p-8 transition-all duration-300 hover:border-wg-primary/40 hover:shadow-xl hover:-translate-y-2 group h-full">
                    {/* Step Number */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-wg-primary to-wg-primary/80 text-white flex items-center justify-center text-xl font-bold shadow-lg">
                        {step.number}
                      </div>
                    </div>

                    {/* Icon */}
                    <div className="flex justify-center mb-8 pt-4">
                      <div className="p-5 rounded-2xl bg-gradient-to-br from-wg-primary/5 to-wg-secondary/5 group-hover:scale-105 transition-transform duration-300">
                        <div className="text-wg-primary">{step.icon}</div>
                      </div>
                    </div>

                    {/* Time Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-wg-secondary/20 mb-6">
                      <Clock className="h-4 w-4 text-wg-primary" />
                      <span className="text-sm font-medium text-wg-primary">
                        {step.time}
                      </span>
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="text-2xl font-semibold text-wg-primary mb-4">
                        {step.title}
                      </h3>
                      <p className="text-wg-primary/70 mb-6 leading-relaxed">
                        {step.description}
                      </p>

                      {/* Details List */}
                      <div className="space-y-3">
                        {step.details.map((detail, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                              <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                              </div>
                            </div>
                            <span className="text-sm text-wg-primary/80">
                              {detail}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-wg-primary/10 transition-all duration-300 pointer-events-none"></div>
                  </div>

                  {/* Connection Arrow for Desktop */}
                  {index < firstRowSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ArrowRight className="h-6 w-6 text-wg-primary/40" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Second Row - 2 Steps (Centered) */}
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {secondRowSteps.map((step, index) => (
                <div key={index} className="relative">
                  {/* Step Card */}
                  <div className="bg-white border-2 border-sidebar-border rounded-2xl p-8 transition-all duration-300 hover:border-wg-primary/40 hover:shadow-xl hover:-translate-y-2 group h-full">
                    {/* Step Number */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-wg-primary to-wg-primary/80 text-white flex items-center justify-center text-xl font-bold shadow-lg">
                        {step.number}
                      </div>
                    </div>

                    {/* Icon */}
                    <div className="flex justify-center mb-8 pt-4">
                      <div className="p-5 rounded-2xl bg-gradient-to-br from-wg-primary/5 to-wg-secondary/5 group-hover:scale-105 transition-transform duration-300">
                        <div className="text-wg-primary">{step.icon}</div>
                      </div>
                    </div>

                    {/* Time Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-wg-secondary/20 mb-6">
                      <Clock className="h-4 w-4 text-wg-primary" />
                      <span className="text-sm font-medium text-wg-primary">
                        {step.time}
                      </span>
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="text-2xl font-semibold text-wg-primary mb-4">
                        {step.title}
                      </h3>
                      <p className="text-wg-primary/70 mb-6 leading-relaxed">
                        {step.description}
                      </p>

                      {/* Details List */}
                      <div className="space-y-3">
                        {step.details.map((detail, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                              <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                              </div>
                            </div>
                            <span className="text-sm text-wg-primary/80">
                              {detail}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-wg-primary/10 transition-all duration-300 pointer-events-none"></div>
                  </div>

                  {/* Connection Arrow for Desktop (only between step 4 and 5) */}
                  {index === 0 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ArrowRight className="h-6 w-6 text-wg-primary/40" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Stats Dashboard */}
          <div className="mt-24 max-w-5xl mx-auto">
            <div className="bg-white border-2 border-sidebar-border rounded-3xl p-10">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-semibold text-wg-primary mb-4">
                  Investment Metrics
                </h3>
                <p className="text-xl text-wg-primary/70 max-w-2xl mx-auto">
                  Key figures for informed investment decisions
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    value: "₦2M+",
                    label: "Minimum Investment",
                    icon: <Wallet className="h-8 w-8" />,
                    description: "Entry point for portfolio participation",
                    gradient: "from-blue-500/10 to-blue-600/10",
                  },
                  {
                    value: "12-15%",
                    label: "Average Annual Return",
                    icon: <TrendingUp className="h-8 w-8" />,
                    description: "Historical performance range",
                    gradient: "from-green-500/10 to-green-600/10",
                  },
                  {
                    value: "24-48h",
                    label: "Withdrawal Processing",
                    icon: <RefreshCw className="h-8 w-8" />,
                    description: "Standard processing timeframe",
                    gradient: "from-purple-500/10 to-purple-600/10",
                  },
                ].map((stat, index) => (
                  <div key={index} className="group">
                    <div className="bg-white border-2 border-sidebar-border rounded-2xl p-8 text-center transition-all duration-300 hover:border-wg-primary/40 hover:shadow-xl hover:-translate-y-2 h-full">
                      <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${stat.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <div className="text-wg-primary">
                          {stat.icon}
                        </div>
                      </div>

                      <div className="text-4xl font-bold text-wg-primary mb-2">
                        {stat.value}
                      </div>
                      
                      <div className="text-lg font-semibold text-wg-primary mb-2">
                        {stat.label}
                      </div>
                      
                      <div className="text-sm text-wg-primary/60">
                        {stat.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Information */}
              <div className="mt-16 pt-12 border-t border-sidebar-border">
                <div className="grid md:grid-cols-4 gap-6">
                  {[
                    { icon: <ShieldCheck className="h-6 w-6" />, text: "Manual Verification" },
                    { icon: <BarChart3 className="h-6 w-6" />, text: "Real-time Tracking" },
                    { icon: <Lock className="h-6 w-6" />, text: "Secure Transactions" },
                    { icon: <Users className="h-6 w-6" />, text: "Expert Support" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-transparent to-wg-primary/5 hover:to-wg-primary/10 transition-all duration-200">
                      <div className="p-3 rounded-lg bg-wg-primary/10">
                        <div className="text-wg-primary">{item.icon}</div>
                      </div>
                      <span className="font-medium text-wg-primary">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gradient-to-b from-white to-sidebar border-t border-sidebar-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-semibold text-wg-primary mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-wg-primary/70 max-w-3xl mx-auto leading-relaxed">
              Common questions about our investment process
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {faqs.map((faq, index) => (
                <Card
                  key={index}
                  className="bg-white border-2 border-sidebar-border hover:border-wg-primary/30 transition-colors"
                >
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-wg-primary/10 flex-shrink-0">
                        <div className="text-wg-primary">{faq.icon}</div>
                      </div>
                      <CardTitle className="text-lg font-semibold text-wg-primary">
                        {faq.question}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-wg-primary/70 text-base leading-relaxed">
                      {faq.answer}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-16">
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="border-wg-primary text-wg-primary hover:bg-wg-primary/5 px-8 py-6 text-base"
                >
                  <HelpCircle className="mr-2 h-5 w-5" />
                  Additional Questions? Contact Support
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-r from-wg-primary to-wg-primary/90 rounded-3xl p-12 border border-wg-primary/20">
              <div className="text-center">
                <h2 className="text-4xl font-semibold text-white mb-8">
                  Ready to Begin Investing?
                </h2>
                <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
                  Join investors who trust Water Grove for structured growth opportunities
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link href="/register">
                    <Button
                      size="lg"
                      className="bg-white text-wg-primary hover:bg-white/90 px-10 py-7 text-base"
                    >
                      Create Investment Account
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white/40 text-white hover:bg-white/10 px-10 py-7 text-base"
                    >
                      <Phone className="mr-2 h-5 w-5" />
                      Schedule Consultation
                    </Button>
                  </Link>
                </div>

                <div className="mt-16 pt-8 border-t border-white/20">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white/90">
                    <div className="flex items-center justify-center gap-3">
                      <ShieldCheck className="h-6 w-6" />
                      <span className="font-medium">Comprehensive Due Diligence</span>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <TrendingUp className="h-6 w-6" />
                      <span className="font-medium">Structured Returns</span>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <Wallet className="h-6 w-6" />
                      <span className="font-medium">Managed Withdrawals</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;