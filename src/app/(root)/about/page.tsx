import React from 'react';
import Link from 'next/link';
import { 
  Shield, 
  Target, 
  TrendingUp, 
  Users, 
  Eye,
  Lock,
  BarChart3,
  Building,
  Leaf,
  Cpu,
  Globe,
  Award,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Us | WG",
};

const About = () => {
  const coreValues = [
    {
      icon: <Eye className="h-8 w-8" />,
      title: 'Transparency',
      description: 'Complete visibility into investment processes, fees, and performance metrics',
      color: 'from-blue-500/10 to-blue-600/10'
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: 'Capital Protection',
      description: 'Asset-backed investments with multiple layers of risk mitigation',
      color: 'from-green-500/10 to-green-600/10'
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: 'Structured Growth',
      description: 'Disciplined capital deployment focusing on sustainable returns',
      color: 'from-purple-500/10 to-purple-600/10'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Investor Control',
      description: 'Direct oversight and decision-making power for all investors',
      color: 'from-orange-500/10 to-orange-600/10'
    }
  ];

  const teamMembers = [
    {
      name: 'Michael Chen',
      role: 'Chief Investment Officer',
      experience: '25+ years in structured finance',
      specialty: 'Real Estate & Infrastructure'
    },
    {
      name: 'Sarah Johnson',
      role: 'Risk Management Director',
      experience: '20+ years in investment banking',
      specialty: 'Due Diligence & Compliance'
    },
    {
      name: 'David Rodriguez',
      role: 'Portfolio Manager',
      experience: '18+ years in asset management',
      specialty: 'Renewable Energy'
    },
    {
      name: 'Emma Williams',
      role: 'Investor Relations Head',
      experience: '15+ years in client services',
      specialty: 'Investor Communication'
    }
  ];

  const milestones = [
    { year: '2015', event: 'Water Grove Founded', detail: 'Started with real estate investments' },
    { year: '2017', event: 'Platform Launch', detail: 'Digital investment platform introduced' },
    { year: '2019', event: '$100M AUM', detail: 'Reached first major milestone' },
    { year: '2021', event: 'Sector Expansion', detail: 'Added renewable energy and tech' },
    { year: '2023', event: '5,000 Investors', detail: 'Community growth milestone' },
    { year: '2024', event: 'Global Reach', detail: 'Expanded to international markets' }
  ];

  const investmentApproach = [
    {
      step: '01',
      title: 'Opportunity Identification',
      description: 'Manual screening of investment opportunities across sectors',
      icon: <Target className="h-6 w-6" />
    },
    {
      step: '02',
      title: 'Due Diligence',
      description: 'Comprehensive vetting and risk assessment by our experts',
      icon: <Shield className="h-6 w-6" />
    },
    {
      step: '03',
      title: 'Capital Deployment',
      description: 'Structured capital allocation with clear terms',
      icon: <TrendingUp className="h-6 w-6" />
    },
    {
      step: '04',
      title: 'Ongoing Management',
      description: 'Active monitoring and transparent reporting',
      icon: <BarChart3 className="h-6 w-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-sidebar">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 bg-gradient-to-b from-sidebar to-wg-primary/10 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-wg-secondary/10 border border-wg-primary/20 mb-6">
              <Award className="h-4 w-4 text-wg-primary" />
              <span className="text-sm font-medium text-wg-primary">Since 2025</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-wg-primary mb-6">
              Building Sustainable
              <span className="text-wg-secondary block">Wealth Together</span>
            </h1>
            
            <div className="text-lg text-wg-primary/80 space-y-4 mb-10">
              <p>
                Water Grove is a structured investment platform designed to give investors access 
                to verified, asset-backed opportunities across multiple industries.
              </p>
              <p>
                Our approach combines disciplined capital management, manual transaction oversight, 
                and clear return tracking to ensure transparency, accountability, and sustainable growth.
              </p>
              <p>
                We prioritize long-term value creation by deploying investor funds into real economic 
                activities that generate measurable returns.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/investment-sectors">
                <Button size="lg" className="bg-wg-primary hover:bg-wg-primary/90 text-wg-secondary px-8">
                  View Investment Opportunities <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-wg-primary text-wg-primary hover:bg-wg-primary/10">
                  Contact Our Team
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-wg-primary mb-4">Our Core Values</h2>
            <p className="text-lg text-wg-primary/70 max-w-2xl mx-auto">
              The principles that guide every investment decision we make
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => (
              <Card key={index} className="bg-gradient-to-br from-sidebar to-white border-sidebar-border">
                <CardHeader>
                  <div className={`p-4 rounded-xl bg-gradient-to-br ${value.color} w-fit mb-4`}>
                    <div className="text-wg-primary">{value.icon}</div>
                  </div>
                  <CardTitle className="text-xl text-wg-primary">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-wg-primary/70">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 bg-gradient-to-b from-white to-sidebar">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-wg-primary mb-4">The Water Grove Approach</h2>
            <p className="text-lg text-wg-primary/70 max-w-3xl mx-auto">
              A disciplined, four-step process that ensures every investment meets our rigorous standards
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {investmentApproach.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-wg-primary text-wg-secondary flex items-center justify-center text-xl font-bold mb-6">
                    {step.step}
                  </div>
                  <div className="p-3 rounded-lg bg-wg-primary/10 mb-4">
                    <div className="text-wg-primary">{step.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-wg-primary mb-3">{step.title}</h3>
                  <p className="text-wg-primary/70">{step.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-7 left-full w-full h-0.5 bg-wg-primary/20 -translate-x-1/2"></div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-wg-primary/5 to-wg-secondary/5 rounded-2xl p-8 border border-sidebar-border">
              <h3 className="text-2xl font-bold text-wg-primary mb-4">Manual Oversight Advantage</h3>
              <p className="text-wg-primary/80 mb-6">
                Unlike automated platforms, every Water Grove investment undergoes manual review by our 
                experienced team. This human touch ensures:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'Personalized risk assessment for each opportunity',
                  'Direct communication with project sponsors',
                  'Regular on-site visits and audits',
                  'Customized investment structures'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="text-wg-primary/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      

     

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-wg-primary to-wg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Invest With Purpose?
            </h2>
            <p className="text-xl text-white/90 mb-10">
              Join investors who trust our structured, transparent approach to wealth creation
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register">
                <Button size="lg" className="bg-white text-wg-primary hover:bg-white/90 px-8">
                  Start Your Investment Journey
                </Button>
              </Link>
              <Link href="/investment-sectors">
                <Button size="lg" variant="outline" className="border-white text-black hover:bg-white/10">
                  Explore Opportunities
                </Button>
              </Link>
            </div>
            
            <div className="mt-12 grid grid-cols-3 gap-8 text-white/80">
              <div>
                <div className="text-2xl font-bold">250+</div>
                <div className="text-sm">Projects Vetted</div>
              </div>
              <div>
                <div className="text-2xl font-bold">$0</div>
                <div className="text-sm">Hidden Fees</div>
              </div>
              <div>
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm">Asset-Backed</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;