'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FeaturesProps {
  features: Feature[];
}

const Features: React.FC<FeaturesProps> = ({ features }) => {
  return (
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
  );
};

export default Features;