'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

interface ProcessStepsProps {
  steps: ProcessStep[];
}

const ProcessSteps: React.FC<ProcessStepsProps> = ({ steps }) => {
  return (
    <section className="py-20 bg-gradient-to-b from-sidebar to-wg-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-semibold text-wg-primary mb-4">Investment Process</h2>
          <p className="text-lg text-wg-primary/70 max-w-2xl mx-auto">
            Structured approach to portfolio management
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {steps.map((step, index) => (
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
  );
};

export default ProcessSteps;