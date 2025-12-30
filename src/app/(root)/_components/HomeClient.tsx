/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react/no-unescaped-entities */
'use client';

import React from 'react';
import Link from 'next/link';
import { 
  TrendingUp, 
  Shield, 
  Globe, 
  Users, 
  BarChart3, 
  Target,
  CheckCircle,
  ArrowRight,
  Building,
  Leaf,
  Truck,
  Utensils,
  FileText,
  Building2,
  Fuel,
  Wallet,
  Package,
  Zap,
  PieChart,
  RefreshCw,
  Download,
  Eye,
  Sparkles,
  DollarSign,
  Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import InvestmentSectors from './InvestmentSectors';
import StatsSection from './StatsSection';
import ProcessSteps from './ProcessSteps';
import Features from './Features';
import CTASection from './CTASection';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import HeroSection from './HeroSection';

const HomeClient = () => {
  const investmentSectors = [
    {
      icon: <Building className="h-10 w-10" />,
      title: 'Real Estate & Land Banking',
      description: 'Strategic land acquisitions, residential developments, and property assets in high-growth areas',
      projects: 24,
      color: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      icon: <Leaf className="h-10 w-10" />,
      title: 'Agricultural Investments',
      description: 'Scalable agricultural projects including crop farming, processing, and distribution',
      projects: 18,
      color: 'from-emerald-500/20 to-green-500/20'
    },
    {
      icon: <Truck className="h-10 w-10" />,
      title: 'Logistics Operations',
      description: 'Transportation, distribution, and fulfillment services across various industries',
      projects: 15,
      color: 'from-orange-500/20 to-amber-500/20'
    },
    {
      icon: <Utensils className="h-10 w-10" />,
      title: 'Food & Event Businesses',
      description: 'Food production, catering, and event-related ventures with strong market demand',
      projects: 22,
      color: 'from-rose-500/20 to-pink-500/20'
    },
    {
      icon: <FileText className="h-10 w-10" />,
      title: 'Structured Loans',
      description: 'Vetted loan products with defined repayment terms and controlled risk exposure',
      projects: 35,
      color: 'from-purple-500/20 to-violet-500/20'
    },
    {
      icon: <Building2 className="h-10 w-10" />,
      title: 'Public Financing',
      description: 'Public and private sector project financing with predefined returns',
      projects: 12,
      color: 'from-sky-500/20 to-blue-500/20'
    },
    {
      icon: <Fuel className="h-10 w-10" />,
      title: 'Oil & Gas Ventures',
      description: 'Downstream and service-based operations with clear revenue channels',
      projects: 8,
      color: 'from-yellow-500/20 to-amber-500/20'
    }
  ];

  const stats = [
    { value: '₦10B+', label: 'Platform Investments', icon: <DollarSign className="h-5 w-5" />, color: 'text-wg-secondary' },
    { value: '2,500+', label: 'Active Investors', icon: <Users className="h-5 w-5" />, color: 'text-wg-accent' },
    { value: '45+', label: 'Completed Projects', icon: <CheckCircle className="h-5 w-5" />, color: 'text-wg-secondary' },
    { value: '98%', label: 'On-time ROI Payments', icon: <TrendingUp className="h-5 w-5" />, color: 'text-wg-accent' }
  ];

  const features = [
    {
      icon: <Shield className="h-7 w-7" />,
      title: 'Asset-Backed Investments',
      description: 'All opportunities backed by real economic activities and tangible assets',
      gradient: 'from-wg-primary/10 to-wg-accent/10'
    },
    {
      icon: <BarChart3 className="h-7 w-7" />,
      title: 'Monthly Returns',
      description: 'Consistent monthly ROI structure with transparent reporting',
      gradient: 'from-wg-secondary/10 to-amber-500/10'
    },
    {
      icon: <Users className="h-7 w-7" />,
      title: 'Professional Management',
      description: 'Managed by experienced professionals with sector-specific expertise',
      gradient: 'from-wg-primary/20 to-wg-primary2/10'
    },
    {
      icon: <PieChart className="h-7 w-7" />,
      title: 'Portfolio Diversification',
      description: 'Spread investments across 7+ sectors to minimize risk exposure',
      gradient: 'from-wg-accent/10 to-blue-500/10'
    },
    {
      icon: <Eye className="h-7 w-7" />,
      title: 'Full Transparency',
      description: 'Manual confirmation of all transactions with clear investment terms',
      gradient: 'from-wg-secondary/20 to-wg-primary/10'
    },
    {
      icon: <RefreshCw className="h-7 w-7" />,
      title: 'Reinvestment Options',
      description: 'Automatically reinvest earnings directly from your wallet',
      gradient: 'from-wg-primary/10 to-wg-accent/20'
    }
  ];

  const processSteps = [
    {
      step: '01',
      icon: <Users className="h-6 w-6" />,
      title: 'Create an Account',
      description: 'Sign up with basic details and access your personal investment dashboard',
      gradient: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      step: '02',
      icon: <Package className="h-6 w-6" />,
      title: 'Choose Investment Package',
      description: 'Select a plan matching your capital (₦100k minimum)',
      gradient: 'from-orange-500/20 to-amber-500/20'
    },
    {
      step: '03',
      icon: <Wallet className="h-6 w-6" />,
      title: 'Fund Your Wallet',
      description: 'Deposit through approved payment channels with manual admin confirmation',
      gradient: 'from-emerald-500/20 to-green-500/20'
    },
    {
      step: '04',
      icon: <Zap className="h-6 w-6" />,
      title: 'Investment Activation',
      description: 'Once confirmed, your investment becomes active and starts generating returns',
      gradient: 'from-rose-500/20 to-pink-500/20'
    },
    {
      step: '05',
      icon: <TrendingUp className="h-6 w-6" />,
      title: 'Earn Monthly ROI',
      description: 'Returns calculated monthly and credited to your dashboard in real-time',
      gradient: 'from-purple-500/20 to-violet-500/20'
    },
    {
      step: '06',
      icon: <Download className="h-6 w-6" />,
      title: 'Request Withdrawal',
      description: 'Withdraw directly from dashboard (manually reviewed by admin team)',
      gradient: 'from-sky-500/20 to-blue-500/20'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-wg-primary/5 via-white to-wg-primary/5 overflow-hidden">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <StatsSection stats={stats} />

      {/* Investment Sectors */}
      <InvestmentSectors sectors={investmentSectors} />

      {/* How It Works */}
      <ProcessSteps steps={processSteps} />

      {/* Features / Why Choose Us */}
      <Features features={features} />

      {/* CTA Section */}
      <CTASection />

      {/* Floating action button for quick access */}
      <Link href="/register" className="fixed bottom-6 right-6 z-50">
        <Button className="bg-wg-secondary hover:bg-wg-secondary/90 text-wg-primary font-bold px-6 py-6 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 group">
          <Wallet className="h-5 w-5" />
          <span className="ml-2 hidden sm:inline">Invest Now</span>
        </Button>
      </Link>
    </div>
  );
};

export default HomeClient;