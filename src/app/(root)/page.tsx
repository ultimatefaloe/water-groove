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
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Water Grove | Sustainable Investment Platform",
  description: "Professional investment platform for sustainable growth opportunities in real estate, renewable energy, and technology sectors."
}

const Home = () => {
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

  // Updated stats with naira (₦)
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
      <section className="relative pt-24 pb-20 overflow-hidden bg-gradient-to-b from-sidebar to-wg-primary/10">
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
              <Link href="/register">
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

      {/* Stats Section */}
      <section className="py-16 bg-sidebar border-y border-sidebar-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-semibold text-wg-primary mb-2">{stat.value}</div>
                <div className="text-sm text-wg-primary/70 tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Sectors */}
      <section className="py-20 bg-sidebar">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-semibold text-wg-primary mb-4">Investment Sectors</h2>
            <p className="text-lg text-wg-primary/70 max-w-2xl mx-auto">
              Diversified opportunities across high-growth sectors
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {investmentSectors.map((sector, index) => (
              <Card key={index} className="bg-sidebar border-sidebar-border hover:border-wg-primary/40 transition-colors shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-lg bg-wg-primary/10">
                      <div className="text-wg-primary">{sector.icon}</div>
                    </div>
                    <div className="text-sm font-medium text-wg-primary bg-wg-secondary/20 px-3 py-1 rounded-full">
                      {sector.projects} projects
                    </div>
                  </div>
                  <CardTitle className="text-xl text-wg-primary">{sector.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-wg-primary/70 leading-relaxed">
                    {sector.description}
                  </CardDescription>
                  <Link href="/investment-sectors">
                    <Button variant="ghost" className="text-wg-primary hover:text-wg-secondary hover:bg-wg-primary/10 mt-6 p-0">
                      Explore Sector <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-b from-sidebar to-wg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-semibold text-wg-primary mb-4">Investment Process</h2>
            <p className="text-lg text-wg-primary/70 max-w-2xl mx-auto">
              Structured approach to portfolio management
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center p-6">
                  <div className="w-20 h-20 rounded-full bg-wg-primary text-white flex items-center justify-center text-2xl font-bold mb-6 shadow">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold text-wg-primary mb-3">{step.title}</h3>
                  <p className="text-wg-primary/70 leading-relaxed">{step.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-10 left-3/4 w-full h-0.5 bg-wg-primary/30"></div>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center mt-14">
            <Link href="/how-it-works">
              <Button variant="outline" className="border-wg-primary text-wg-primary hover:bg-wg-secondary/20 hover:border-wg-secondary px-8 py-6">
                Detailed Process Overview <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-sidebar">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold text-wg-primary mb-6">
                Why Choose Water Grove
              </h2>
              <p className="text-lg text-wg-primary/70 mb-10 leading-relaxed">
                We combine deep industry expertise with transparent processes to deliver 
                structured investment opportunities with clear risk management.
              </p>
              
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-wg-secondary/10 transition-colors">
                    <div className="p-3 rounded-lg bg-wg-primary/10 flex-shrink-0">
                      <div className="text-wg-primary">{feature.icon}</div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-wg-primary mb-2">{feature.title}</h4>
                      <p className="text-wg-primary/70">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-10">
                <Link href="/about">
                  <Button className="bg-wg-primary hover:bg-wg-primary/90 text-white px-8 py-6">
                    Learn About Our Approach
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="bg-sidebar rounded-xl border border-sidebar-border p-8 shadow-sm">
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-wg-primary">Fully regulated investment platform</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-wg-primary">Minimum investment: ₦2,000,000</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-wg-primary">Comprehensive portfolio tracking</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-wg-primary">Expert due diligence on all projects</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-wg-primary">Quarterly performance reporting</span>
                </div>
              </div>
              
              <div className="mt-10 p-6 bg-wg-primary/5 rounded-lg border border-wg-primary/20">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-lg bg-white flex items-center justify-center border border-wg-primary/30">
                    <div className="text-2xl font-bold text-wg-primary">₦</div>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-wg-primary">12.8%</div>
                    <div className="text-sm text-wg-primary/70">Average Annual Return (Historical)</div>
                    <div className="text-xs text-wg-primary/50 mt-1">Past performance not indicative of future results</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-wg-primary to-wg-primary/90">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
              Begin Your Investment Journey
            </h2>
            <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join our community of investors committed to sustainable growth
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="bg-white text-wg-primary hover:bg-white/90 px-8 py-6 text-base rounded-lg shadow">
                  Start Investing Today
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-base rounded-lg">
                  Schedule Consultation
                </Button>
              </Link>
            </div>
            
            <div className="mt-10 pt-8 border-t border-white/20">
              <p className="text-white/80 text-sm tracking-wide">
                Water Grove Capital Management • SEC Registered • Established 2023
              </p>
              <p className="text-white/60 text-xs mt-2">
                Investment involves risk. Past performance is not indicative of future results.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;