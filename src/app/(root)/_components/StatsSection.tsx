'use client';

import React from 'react';

interface Stat {
  value: string;
  label: string;
}

interface StatsSectionProps {
  stats: Stat[];
}

const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
  return (
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
  );
};

export default StatsSection;