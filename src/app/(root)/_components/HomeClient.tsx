/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react/no-unescaped-entities */
'use client';

import React, { useState, useEffect } from 'react';
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

const HomeClient = () => {
  const [showSparkles, setShowSparkles] = useState(false);
  const [floatingParticles, setFloatingParticles] = useState<Array<{x: number, y: number, size: number, delay: number}>>([]);

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
      icon: <Wallet className="h-6 w-6" />,
      title: 'Fund Your Wallet',
      description: 'Deposit through approved payment channels with manual admin confirmation',
      gradient: 'from-emerald-500/20 to-green-500/20'
    },
    {
      step: '03',
      icon: <Package className="h-6 w-6" />,
      title: 'Choose Investment Package',
      description: 'Select a plan matching your capital (₦100k minimum)',
      gradient: 'from-orange-500/20 to-amber-500/20'
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

  // Initialize floating particles
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Generate fixed positions for particles
      const particles = Array.from({ length: 15 }, (_, i) => ({
        x: (i * 7) % 100,
        y: (i * 11) % 100,
        size: 5 + (i % 10),
        delay: i * 0.3
      }));
      setFloatingParticles(particles);
      
      // Sparkle animation trigger
      const sparkleInterval = setInterval(() => {
        setShowSparkles(true);
        setTimeout(() => setShowSparkles(false), 1000);
      }, 5000);
      
      return () => clearInterval(sparkleInterval);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-wg-primary/5 via-white to-wg-primary/5 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-24 md:pb-20 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-wg-primary2 via-wg-primary to-wg-primary/80 opacity-95">
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
        </div>
        
        {/* Animated border */}
        <div className="absolute top-0 left-0 right-0 h-1">
          <div className="h-full bg-gradient-to-r from-wg-secondary via-wg-accent to-wg-secondary animate-border-pulse"></div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {floatingParticles.map((particle, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-wg-accent/10 animate-float"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${15 + (i % 10)}s`,
              }}
            />
          ))}
        </div>

        {/* Sparkle effects */}
        {showSparkles && (
          <>
            <div className="absolute top-1/4 left-1/4 animate-ping">
              <Sparkles className="h-6 w-6 text-wg-secondary/50" />
            </div>
            <div className="absolute top-1/3 right-1/4 animate-ping" style={{ animationDelay: '0.2s' }}>
              <Sparkles className="h-4 w-4 text-wg-accent/50" />
            </div>
            <div className="absolute bottom-1/4 left-1/3 animate-ping" style={{ animationDelay: '0.4s' }}>
              <Sparkles className="h-5 w-5 text-wg-secondary/50" />
            </div>
          </>
        )}

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Trust badge with animation */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-wg-secondary/90 text-wg-primary mb-8 animate-pulse animate-duration-2000 hover:scale-105 transition-transform duration-300 cursor-pointer group">
              <CheckCircle className="h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
              <span className="text-sm font-semibold">Invest With Confidence. Grow With Purpose.</span>
            </div>
            
            {/* Main headline with typewriter effect */}
            <div className="relative">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-wg-neutral mb-6 leading-tight animate-fade-up">
                Build Wealth
                <span className="block text-wg-secondary mt-2 animate-fade-up" style={{ animationDelay: '0.2s' }}>
                  With Water Grove
                </span>
              </h1>
              
              {/* Underline animation */}
              <div className="absolute bottom-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-transparent via-wg-secondary to-transparent animate-underline"></div>
            </div>
            
            {/* Subheadline */}
            <div className="max-w-3xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: '0.4s' }}>
              <p className="text-lg md:text-xl text-wg-neutral/90 mb-6 leading-relaxed">
                Water Grove Investment Platform provides access to carefully structured, asset-backed 
                investment opportunities across real estate, agriculture, logistics, public financing, and more — 
                designed to deliver consistent monthly returns with transparency and control.
              </p>
              
              <div className="bg-wg-primary/30 backdrop-blur-sm rounded-xl p-6 border border-wg-accent/20 hover:border-wg-accent/40 transition-all duration-300 animate-fade-up" style={{ animationDelay: '0.6s' }}>
                <p className="text-wg-neutral font-medium italic relative">
                  <span className="absolute -left-4 top-0 text-wg-secondary text-2xl">"</span>
                  Whether you are starting with <span className="text-wg-secondary font-bold animate-pulse animate-duration-3000">₦100,000</span> or investing at a larger scale, 
                  Water Grove offers a clear pathway to grow your capital responsibly.
                  <span className="absolute -right-4 bottom-0 text-wg-secondary text-2xl">"</span>
                </p>
              </div>
            </div>
            
            {/* CTA Buttons with enhanced animations */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: '0.8s' }}>
              <Link href="/register">
                <Button 
                  size="lg" 
                  className="bg-wg-secondary hover:bg-wg-secondary/90 text-wg-primary font-bold px-8 py-6 text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    Start Investing Today 
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </Button>
              </Link>
              <Link href="/investment-packages">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-wg-accent text-wg-neutral hover:bg-wg-accent/20 hover:border-wg-accent px-8 py-6 text-base rounded-xl hover:scale-105 transition-all duration-300 group relative"
                >
                  <span className="relative z-10">View Investment Packages</span>
                  <div className="absolute inset-0 border-2 border-transparent rounded-xl group-hover:border-wg-accent/30 transition-all duration-300"></div>
                </Button>
              </Link>
            </div>
            
            {/* Minimum investment badge with bounce animation */}
            <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-wg-primary border border-wg-accent animate-bounce-subtle">
              <Target className="h-4 w-4 text-wg-secondary animate-spin-slow" />
              <span className="text-sm text-wg-neutral">Minimum Investment: <span className="font-bold text-wg-secondary">₦100,000</span></span>
            </div>

            {/* Scroll indicator */}
            <div className="mt-12 animate-bounce">
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs text-wg-neutral/60">Scroll to explore</span>
                <div className="w-6 h-10 border-2 border-wg-neutral/40 rounded-full flex justify-center">
                  <div className="w-1 h-3 bg-wg-neutral/60 rounded-full mt-2 animate-scroll-indicator"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative wave with animation */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
          <svg className="w-full h-16 text-wg-primary2 animate-wave" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"></path>
          </svg>
        </div>
      </section>

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
      <Link href="/register" className="fixed bottom-6 right-6 z-50 animate-fade-in" style={{ animationDelay: '2s' }}>
        <Button className="bg-wg-secondary hover:bg-wg-secondary/90 text-wg-primary font-bold px-6 py-6 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group">
          <Wallet className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
          <span className="ml-2 hidden sm:inline">Invest Now</span>
        </Button>
      </Link>

      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        
        @keyframes border-pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes underline {
          0% {
            transform: scaleX(0);
          }
          100% {
            transform: scaleX(1);
          }
        }
        
        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes scroll-indicator {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(15px);
            opacity: 0;
          }
        }
        
        @keyframes wave {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-25%);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
          background: linear-gradient(to right, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%);
          background-size: 1000px 100%;
        }
        
        .animate-border-pulse {
          animation: border-pulse 2s ease-in-out infinite;
        }
        
        .animate-fade-up {
          animation: fade-up 0.8s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        
        .animate-underline {
          animation: underline 1s ease-out forwards;
          transform-origin: left;
        }
        
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-scroll-indicator {
          animation: scroll-indicator 1.5s ease-in-out infinite;
        }
        
        .animate-wave {
          animation: wave 20s linear infinite;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: var(--color-wg-primary/5);
        }
        
        ::-webkit-scrollbar-thumb {
          background: var(--color-wg-accent);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: var(--color-wg-secondary);
        }
      `}</style>
    </div>
  );
};

export default HomeClient;