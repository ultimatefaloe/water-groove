'use client';

import React from 'react';
import Link from 'next/link';
import { 
  TrendingUp, 
  ArrowRight, 
  Shield, 
  Lock, 
  BarChart3, 
  Target,
  Users,
  Clock,
  CheckCircle,
  Star,
  Trophy,
  Crown,
  Building,
  Leaf,
  Cpu,
  Globe,
  Award,
  Calendar,
  Percent,
  Zap,
  Info,
  Banknote,
  LineChart,
  Package
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const InvestmentSectorsClient = () => {
  // Updated categories based on your specifications
  const categories = [
    {
      name: 'Starter Groove',
      range: '₦100K – ₦499K',
      description: 'Entry-level investment category for new investors',
      icon: <Star className="h-10 w-10" />,
      color: 'from-blue-500/10 to-blue-600/10',
      borderColor: 'border-blue-500/20',
      features: [
        'Ideal for first-time investors',
        'Monthly ROI distributions',
        'Basic portfolio tracking',
        'Email support access'
      ],
      roi: '8-10%',
      investmentTerm: 'Monthly ROI',
      lockPeriod: '12 months',
      badge: 'Entry Level',
      exactMin: 100000,
      exactMax: 499000,
      capitalLock: 'Capital locked for 12 months'
    },
    {
      name: 'Growth Groove',
      range: '₦500K – ₦1M',
      description: 'Growth-focused investment with balanced returns',
      icon: <TrendingUp className="h-10 w-10" />,
      color: 'from-green-500/10 to-green-600/10',
      borderColor: 'border-green-500/20',
      features: [
        'Enhanced monthly returns',
        'Priority customer support',
        'Detailed analytics dashboard',
        'Sector diversification'
      ],
      roi: '10-12%',
      investmentTerm: 'Monthly ROI',
      lockPeriod: '15 months',
      badge: 'Most Popular',
      exactMin: 500000,
      exactMax: 1000000,
      capitalLock: 'Capital locked for 15 months'
    },
    {
      name: 'Premium Groove',
      range: '₦1M – ₦5M',
      description: 'Premium investment with enhanced returns',
      icon: <Trophy className="h-10 w-10" />,
      color: 'from-purple-500/10 to-purple-600/10',
      borderColor: 'border-purple-500/20',
      features: [
        'Premium monthly returns',
        'Personal account manager',
        'Advanced portfolio options',
        'Quarterly strategy reviews'
      ],
      roi: '12-14%',
      investmentTerm: 'Monthly ROI',
      lockPeriod: '18 months',
      badge: 'Premium',
      exactMin: 1000000,
      exactMax: 5000000,
      capitalLock: 'Capital locked for 18 months'
    },
    {
      name: 'Elite Groove',
      range: '₦5M – ₦10M',
      description: 'Institutional-grade investment category',
      icon: <Crown className="h-10 w-10" />,
      color: 'from-amber-500/10 to-amber-600/10',
      borderColor: 'border-amber-500/20',
      features: [
        'Institutional monthly returns',
        'Dedicated relationship manager',
        'Custom investment strategies',
        'Exclusive opportunities access'
      ],
      roi: '14-16%',
      investmentTerm: 'Monthly ROI',
      lockPeriod: '18 months',
      badge: 'Elite',
      exactMin: 5000000,
      exactMax: 10000000,
      capitalLock: 'Capital locked for 18 months'
    },
    {
      name: 'Executive Groove',
      range: '₦10M+',
      description: 'High-net-worth investor exclusive category',
      icon: <Award className="h-10 w-10" />,
      color: 'from-rose-500/10 to-rose-600/10',
      borderColor: 'border-rose-500/20',
      features: [
        'Maximum monthly returns',
        'Private wealth management',
        'Direct project participation',
        'Tailored investment solutions'
      ],
      roi: '16-20%',
      investmentTerm: 'Monthly ROI',
      lockPeriod: '24 months',
      badge: 'Executive',
      exactMin: 10000000,
      exactMax: null,
      capitalLock: 'Capital locked for 24 months'
    }
  ];

  const sectors = [
    {
      icon: <Building className="h-8 w-8" />,
      title: 'Real Estate',
      projects: '24 Active Projects',
      description: 'Commercial and residential developments with long-term appreciation',
      color: 'bg-blue-500/10',
      border: 'border-blue-500/20'
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      title: 'Renewable Energy',
      projects: '18 Active Projects',
      description: 'Solar, wind, and hydro power infrastructure investments',
      color: 'bg-green-500/10',
      border: 'border-green-500/20'
    },
    {
      icon: <Cpu className="h-8 w-8" />,
      title: 'Technology',
      projects: '32 Active Projects',
      description: 'Innovative tech startups and digital infrastructure',
      color: 'bg-purple-500/10',
      border: 'border-purple-500/20'
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: 'Infrastructure',
      projects: '15 Active Projects',
      description: 'Transportation, utilities, and public works developments',
      color: 'bg-amber-500/10',
      border: 'border-amber-500/20'
    }
  ];

  const features = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Asset-Backed',
      description: 'All investments secured by tangible assets'
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: 'Transparent Reporting',
      description: 'Real-time performance tracking'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Expert Management',
      description: 'Professional portfolio management'
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: 'Diversified Portfolio',
      description: 'Multi-sector investment allocation'
    }
  ];

  // Helper function to format numbers
  const formatNumber = (num: number | null): string => {
    if (num === null) return '';
    if (num >= 10000000) return '₦10M+';
    if (num >= 1000000) return `₦${(num / 1000000).toFixed(0)}M`;
    if (num >= 1000) return `₦${(num / 1000).toFixed(0)}K`;
    return `₦${num.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-sidebar">
      {/* Hero Section */}
      <section className="relative pt-28 pb-24 overflow-hidden bg-gradient-to-b from-white via-wg-primary/5 to-white">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-wg-primary/5 border border-wg-primary/20 mb-8">
              <Package className="h-4 w-4 text-wg-primary" />
              <span className="text-sm font-medium text-wg-primary">Structured Investment Categories</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-semibold text-wg-primary mb-8">
              Investment
              <span className="block text-wg-secondary mt-3">Categories & Terms</span>
            </h1>
            
            <p className="text-xl text-wg-primary/70 mb-12 max-w-3xl mx-auto leading-relaxed">
              Choose from our structured investment categories, each with defined capital ranges, 
              specific ROI rates, and clear investment terms for monthly returns.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/how-it-works">
                <Button size="lg" variant="outline" className="border-wg-primary text-wg-primary hover:bg-wg-primary/5 px-8 py-6">
                  Investment Process
                </Button>
              </Link>
              <Link href="#categories-section">
                <Button size="lg" variant="outline" className="border-wg-primary text-wg-primary hover:bg-wg-primary/5 px-8 py-6">
                  Explore Categories
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-16 bg-gradient-to-r from-wg-primary/5 to-transparent">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-sidebar-border hover:border-wg-primary/30 transition-colors">
                <div className="p-4 rounded-xl bg-wg-primary/10 mb-4">
                  <div className="text-wg-primary">{feature.icon}</div>
                </div>
                <h3 className="font-semibold text-wg-primary text-base mb-2">{feature.title}</h3>
                <p className="text-sm text-wg-primary/60">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Categories - Following How It Works layout */}
      <section id="categories-section" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-semibold text-wg-primary mb-6">
              Investment Categories
            </h2>
            <p className="text-xl text-wg-primary/70 max-w-3xl mx-auto leading-relaxed">
              Structured investment categories with clear capital ranges, ROI rates, and investment terms
            </p>
          </div>
          
          {/* First Row - 3 Categories (Starter, Growth, Premium) */}
          <div className="max-w-7xl mx-auto mb-12 lg:mb-16">
            <div className="grid lg:grid-cols-3 gap-8">
              {categories.slice(0, 3).map((category, index) => (
                <div key={index} className="relative">
                  {/* Category Card */}
                  <div className="bg-white border-2 border-sidebar-border rounded-2xl p-8 transition-all duration-300 hover:border-wg-primary/40 hover:shadow-xl hover:-translate-y-2 group h-full">
                    {/* Category Badge */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-wg-primary to-wg-primary/80 text-white flex items-center justify-center text-xl font-bold shadow-lg">
                        {index + 1}
                      </div>
                    </div>

                    {/* Icon */}
                    <div className="flex justify-center mb-8 pt-4">
                      <div className={`p-5 rounded-2xl bg-gradient-to-br ${category.color} group-hover:scale-105 transition-transform duration-300`}>
                        <div className="text-wg-primary">{category.icon}</div>
                      </div>
                    </div>

                    {/* Category Name and Description */}
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-semibold text-wg-primary mb-3">
                        {category.name}
                      </h3>
                      <div className="text-3xl font-bold text-wg-primary mb-2">
                        {category.range}
                      </div>
                      <p className="text-wg-primary/70">
                        {category.description}
                      </p>
                    </div>

                    {/* Capital Lock Notice */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-wg-secondary/20 mb-6">
                      <Lock className="h-4 w-4 text-wg-primary" />
                      <span className="text-sm font-medium text-wg-primary">
                        {category.capitalLock}
                      </span>
                    </div>

                    {/* Investment Details Grid */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      <div className="text-center p-3 rounded-xl bg-wg-primary/5 border border-wg-primary/10">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Percent className="h-4 w-4 text-wg-primary" />
                          <div className="text-lg font-bold text-wg-primary">{category.roi}</div>
                        </div>
                        <div className="text-xs text-wg-primary/70">Annual ROI</div>
                      </div>
                      <div className="text-center p-3 rounded-xl bg-wg-primary/5 border border-wg-primary/10">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Calendar className="h-4 w-4 text-wg-primary" />
                          <div className="text-lg font-bold text-wg-primary">{category.lockPeriod}</div>
                        </div>
                        <div className="text-xs text-wg-primary/70">Lock Period</div>
                      </div>
                      <div className="text-center p-3 rounded-xl bg-wg-primary/5 border border-wg-primary/10">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <TrendingUp className="h-4 w-4 text-wg-primary" />
                          <div className="text-lg font-bold text-wg-primary">{category.investmentTerm}</div>
                        </div>
                        <div className="text-xs text-wg-primary/70">Returns</div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                      <h4 className="text-base font-semibold text-wg-primary">Key Features:</h4>
                      {category.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-0.5">
                            <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                            </div>
                          </div>
                          <span className="text-sm text-wg-primary/80">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-wg-primary/10 transition-all duration-300 pointer-events-none"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Second Row - 2 Categories (Elite, Executive) */}
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {categories.slice(3, 5).map((category, index) => (
                <div key={index} className="relative">
                  {/* Category Card */}
                  <div className="bg-white border-2 border-sidebar-border rounded-2xl p-8 transition-all duration-300 hover:border-wg-primary/40 hover:shadow-xl hover:-translate-y-2 group h-full">
                    {/* Category Badge */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-wg-primary to-wg-primary/80 text-white flex items-center justify-center text-xl font-bold shadow-lg">
                        {index + 4}
                      </div>
                    </div>

                    {/* Icon */}
                    <div className="flex justify-center mb-8 pt-4">
                      <div className={`p-5 rounded-2xl bg-gradient-to-br ${category.color} group-hover:scale-105 transition-transform duration-300`}>
                        <div className="text-wg-primary">{category.icon}</div>
                      </div>
                    </div>

                    {/* Category Name and Description */}
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-semibold text-wg-primary mb-3">
                        {category.name}
                      </h3>
                      <div className="text-3xl font-bold text-wg-primary mb-2">
                        {category.range}
                      </div>
                      <p className="text-wg-primary/70">
                        {category.description}
                      </p>
                    </div>

                    {/* Capital Lock Notice */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-wg-secondary/20 mb-6">
                      <Lock className="h-4 w-4 text-wg-primary" />
                      <span className="text-sm font-medium text-wg-primary">
                        {category.capitalLock}
                      </span>
                    </div>

                    {/* Investment Details Grid */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      <div className="text-center p-3 rounded-xl bg-wg-primary/5 border border-wg-primary/10">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Percent className="h-4 w-4 text-wg-primary" />
                          <div className="text-lg font-bold text-wg-primary">{category.roi}</div>
                        </div>
                        <div className="text-xs text-wg-primary/70">Annual ROI</div>
                      </div>
                      <div className="text-center p-3 rounded-xl bg-wg-primary/5 border border-wg-primary/10">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Calendar className="h-4 w-4 text-wg-primary" />
                          <div className="text-lg font-bold text-wg-primary">{category.lockPeriod}</div>
                        </div>
                        <div className="text-xs text-wg-primary/70">Lock Period</div>
                      </div>
                      <div className="text-center p-3 rounded-xl bg-wg-primary/5 border border-wg-primary/10">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <TrendingUp className="h-4 w-4 text-wg-primary" />
                          <div className="text-lg font-bold text-wg-primary">{category.investmentTerm}</div>
                        </div>
                        <div className="text-xs text-wg-primary/70">Returns</div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                      <h4 className="text-base font-semibold text-wg-primary">Key Features:</h4>
                      {category.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-0.5">
                            <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                            </div>
                          </div>
                          <span className="text-sm text-wg-primary/80">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-wg-primary/10 transition-all duration-300 pointer-events-none"></div>
                  </div>

                  {/* Popular Badge */}
                  {category.badge === 'Most Popular' && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                      <div className="px-5 py-1.5 bg-gradient-to-r from-wg-primary to-wg-primary/80 rounded-full text-white text-sm font-semibold shadow-lg">
                        {category.badge}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Important Note */}
          <div className="mt-20 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-white to-wg-primary/5 border-2 border-wg-primary/20 rounded-3xl p-8">
              <div className="flex items-start gap-6">
                <div className="p-4 rounded-xl bg-wg-primary/10 flex-shrink-0">
                  <Info className="h-6 w-6 text-wg-primary" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-wg-primary mb-4">Important Investment Information</h4>
                  <p className="text-wg-primary/70 mb-6 leading-relaxed">
                    All investments earn monthly ROI. Capital remains locked for the specified investment duration. 
                    Early withdrawal terms vary by investment category. Returns are based on historical performance 
                    and are subject to project success. Past performance does not guarantee future results.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-wg-primary/5">
                      <Zap className="h-5 w-5 text-amber-500" />
                      <span className="text-sm font-medium text-wg-primary">Monthly ROI Distributions</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-wg-primary/5">
                      <Lock className="h-5 w-5 text-wg-primary" />
                      <span className="text-sm font-medium text-wg-primary">Capital Lock Periods</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-wg-primary/5">
                      <Clock className="h-5 w-5 text-blue-500" />
                      <span className="text-sm font-medium text-wg-primary">Defined Investment Terms</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Sectors */}
      <section id="sectors-section" className="py-24 bg-gradient-to-b from-white to-sidebar">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-semibold text-wg-primary mb-6">
              Investment Sectors
            </h2>
            <p className="text-xl text-wg-primary/70 max-w-3xl mx-auto leading-relaxed">
              Your capital is strategically allocated across multiple high-growth sectors 
              for optimal diversification and risk management
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {sectors.map((sector, index) => (
              <Card key={index} className={`bg-white border-2 ${sector.border} transition-all duration-300 group hover:shadow-xl hover:-translate-y-2`}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-4 rounded-xl ${sector.color}`}>
                      <div className="text-wg-primary">{sector.icon}</div>
                    </div>
                    <div className="text-sm font-semibold text-wg-primary bg-wg-secondary/20 px-4 py-1.5 rounded-full">
                      {sector.projects}
                    </div>
                  </div>
                  <CardTitle className="text-2xl text-wg-primary mt-2">{sector.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-wg-primary/70 text-base leading-relaxed">
                    {sector.description}
                  </CardDescription>
                  <Link href={`/investment-sectors/${sector.title.toLowerCase()}`}>
                    <Button variant="ghost" className="text-wg-primary mt-6 p-0 hover:bg-transparent group-hover:text-wg-primary/80 transition-colors">
                      Explore Sector Details <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-r from-wg-primary to-wg-primary/90 rounded-3xl p-12 overflow-hidden relative border border-wg-primary/20">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-80 h-80 border border-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-80 h-80 border border-white rounded-full translate-x-1/2 translate-y-1/2"></div>
              </div>
              
              <div className="text-center relative z-10">
                <h2 className="text-4xl md:text-5xl font-semibold text-white mb-8">
                  Begin Your Investment Journey
                </h2>
                <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
                  Select your investment category and join our community of investors 
                  committed to structured, sustainable growth
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link href="/register">
                    <Button size="lg" className="bg-white text-wg-primary hover:bg-white/90 px-10 py-7 text-base">
                      Create Investment Account
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 px-10 py-7 text-base">
                      Consult with Investment Advisor
                    </Button>
                  </Link>
                </div>
                
                <div className="mt-16 pt-8 border-t border-white/20">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white/90">
                    <div className="flex items-center justify-center gap-3">
                      <Shield className="h-6 w-6" />
                      <span className="font-medium">Asset-Backed Security</span>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <BarChart3 className="h-6 w-6" />
                      <span className="font-medium">Monthly ROI Returns</span>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <Users className="h-6 w-6" />
                      <span className="font-medium">Professional Management</span>
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

export default InvestmentSectorsClient;