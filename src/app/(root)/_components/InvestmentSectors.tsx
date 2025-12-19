'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Sector {
  icon: React.ReactNode;
  title: string;
  description: string;
  projects: number;
}

interface InvestmentSectorsProps {
  sectors: Sector[];
}

const InvestmentSectors: React.FC<InvestmentSectorsProps> = ({ sectors }) => {
  return (
    <section className="py-20 bg-sidebar">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-semibold text-wg-primary mb-4">Investment Sectors</h2>
          <p className="text-lg text-wg-primary/70 max-w-2xl mx-auto">
            Diversified opportunities across high-growth sectors
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sectors.map((sector, index) => (
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
  );
};

export default InvestmentSectors;