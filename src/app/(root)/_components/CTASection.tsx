'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
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
  );
};

export default CTASection;