// CTASection.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, TrendingUp, Users } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-wg-primary2 via-wg-primary to-wg-primary/90 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-wg-accent/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-wg-secondary/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-wg-neutral mb-6">
            Ready to <span className="text-wg-secondary">Build Wealth</span> with Water Grove?
          </h2>
          
          <div className="bg-wg-primary/30 backdrop-blur-sm rounded-2xl p-8 border border-wg-accent/20 mb-10">
            <p className="text-lg md:text-xl text-wg-neutral/90 mb-8 leading-relaxed">
              Join thousands of investors who trust Water Grove for structured, transparent, and asset-backed investment opportunities. Start with just <span className="text-wg-secondary font-bold">₦100,000</span> and grow your capital across diversified sectors.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center gap-3 justify-center">
                <div className="p-2 rounded-lg bg-wg-secondary/20">
                  <Shield className="h-5 w-5 text-wg-secondary" />
                </div>
                <span className="text-wg-neutral font-medium">Asset-Backed</span>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <div className="p-2 rounded-lg bg-wg-accent/20">
                  <TrendingUp className="h-5 w-5 text-wg-accent" />
                </div>
                <span className="text-wg-neutral font-medium">Monthly Returns</span>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <div className="p-2 rounded-lg bg-wg-secondary/20">
                  <Users className="h-5 w-5 text-wg-secondary" />
                </div>
                <span className="text-wg-neutral font-medium">2,500+ Investors</span>
              </div>
            </div>
          </div>
          
          
          
          
        </div>
      </div>
    </section>
  );
};

export default CTASection;