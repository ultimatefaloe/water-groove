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
  Cpu,
  Target as TargetIcon,
  LineChart,
  Building2,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import InvestmentSectors from './InvestmentSectors';
import StatsSection from './StatsSection';
import ProcessSteps from './ProcessSteps';
import Features from './Features';
import CTASection from './CTASection';

const HomeClient = () => {
  const investmentSectors = [
    {
      icon: <Building2 className="h-10 w-10" />,
      title: 'Real Estate',
      description: 'Commercial and residential property investments with long-term value appreciation',
      projects: 24
    },
    {
      icon: <Zap className="h-10 w-10" />,
      title: 'Renewable Energy',
      description: 'Solar, wind, and hydro power infrastructure projects',
      projects: 18
    },
    {
      icon: <Cpu className="h-10 w-10" />,
      title: 'Technology',
      description: 'Innovative tech startups and digital infrastructure',
      projects: 32
    },
    {
      icon: <Globe className="h-10 w-10" />,
      title: 'Infrastructure',
      description: 'Transportation, utilities, and public works developments',
      projects: 15
    }
  ];

  const stats = [
    { value: '₦100B+', label: 'Assets Under Management' },
    { value: '5,000+', label: 'Investor Community' },
    { value: '89', label: 'Completed Projects' },
    { value: '12.8%', label: 'Avg. Annual Return' }
  ];

  const features = [
    {
      icon: <Shield className="h-7 w-7" />,
      title: 'Secure & Regulated',
      description: 'All investments are fully regulated and secured'
    },
    {
      icon: <BarChart3 className="h-7 w-7" />,
      title: 'Transparent Reporting',
      description: 'Real-time dashboard and performance tracking'
    },
    {
      icon: <Users className="h-7 w-7" />,
      title: 'Expert Management',
      description: 'Managed by industry veterans with 20+ years experience'
    },
    {
      icon: <TargetIcon className="h-7 w-7" />,
      title: 'Diversified Portfolio',
      description: 'Spread risk across multiple sectors and projects'
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Register Account',
      description: 'Complete secure verification and profile setup'
    },
    {
      step: '02',
      title: 'Select Opportunities',
      description: 'Review curated investment projects with full documentation'
    },
    {
      step: '03',
      title: 'Invest & Monitor',
      description: 'Allocate funds and track performance through your dashboard'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-20 overflow-hidden bg-gradient-to-b from-sidebar to-wg-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-wg-secondary/20 border border-wg-primary/30 mb-8">
              <TrendingUp className="h-4 w-4 text-wg-primary" />
              <span className="text-sm font-medium text-wg-primary">Trusted by 5,000+ Investors</span>
            </div>
            
            {/* Main headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-wg-primary mb-6 leading-tight tracking-tight">
              Professional Investment in
              <span className="block text-wg-secondary mt-2">Sustainable Growth</span>
            </h1>
            
            <p className="text-lg text-wg-primary/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Water Grove provides access to vetted, high-impact investment opportunities 
              across real estate, renewable energy, and technology sectors.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/login">
                <Button size="lg" className="bg-wg-primary hover:bg-wg-primary/90 text-white px-8 py-6 text-base rounded-lg">
                  Begin Investing <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button size="lg" variant="outline" className="border-wg-primary text-wg-primary hover:bg-wg-secondary/20 hover:border-wg-secondary px-8 py-6 text-base rounded-lg">
                  Learn How It Works
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Now a separate component */}
      <StatsSection stats={stats} />

      {/* Investment Sectors - Now a separate component */}
      <InvestmentSectors sectors={investmentSectors} />

      {/* Process Steps - Now a separate component */}
      <ProcessSteps steps={processSteps} />

      {/* Features - Now a separate component */}
      <Features features={features} />

      {/* CTA Section - Now a separate component */}
      <CTASection />
    </div>
  );
};

export default HomeClient;