/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react/no-unescaped-entities */
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  CheckCircle,
  ArrowRight,
  Target,
  Users,
  TrendingUp,
  Shield,
  BarChart3,
  Sparkles,
  ChevronRight,
  Gem,
  Zap,
  Building,
  Leaf,
  Truck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-wg-primary to-wg-primary2">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
        
        {/* Floating orbs - smaller */}
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-wg-secondary/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-wg-accent/5 rounded-full blur-2xl"></div>
        
        {/* Gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-tr from-wg-primary/20 via-transparent to-wg-secondary/10"></div>
      </div>

      {/* Glow effect at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-wg-secondary to-transparent"></div>

      <div className="container relative z-10 mx-auto px-4 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column: Content */}
          <div className="relative">
            {/* Trust badge - smaller */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-6 group hover:bg-white/10 transition-all duration-300"
            >
              <div className="relative">
                <Sparkles className="h-3 w-3 text-wg-secondary" />
                <div className="absolute inset-0 animate-ping opacity-20">
                  <Sparkles className="h-3 w-3 text-wg-secondary" />
                </div>
              </div>
              <span className="text-xs font-medium text-white">
                Trusted by 2,500+ Investors
              </span>
              <ChevronRight className="h-2.5 w-2.5 text-white/60 group-hover:translate-x-0.5 transition-transform" />
            </motion.div>

            {/* Main headline - reduced spacing */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 leading-tight"
            >
              <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-wg-secondary">
                Strategic Wealth
              </span>
              <span className="block mt-1">
                <span className="relative inline-block">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-wg-secondary via-wg-accent to-amber-300">
                    Building Platform
                  </span>
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-wg-secondary to-amber-300 rounded-full"></span>
                </span>
              </span>
            </motion.h1>

            {/* Subheadline - smaller */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg text-white/80 mb-8 leading-relaxed max-w-xl"
            >
              Access professionally managed, asset-backed investment opportunities across 
              real estate, agriculture, logistics, and structured finance — delivering 
              predictable monthly returns with complete transparency.
            </motion.p>

            {/* Key features - tighter */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 gap-3 mb-8"
            >
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-wg-secondary/20 backdrop-blur-sm">
                  <TrendingUp className="h-4 w-4 text-wg-secondary" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">Monthly Returns</p>
                  <p className="text-white/60 text-xs">Predictable income</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-wg-accent/20 backdrop-blur-sm">
                  <Shield className="h-4 w-4 text-wg-accent" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">Asset-Backed</p>
                  <p className="text-white/60 text-xs">Tangible security</p>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons - smaller */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 mb-8"
            >
              <Link href="/auth/login" className="group flex-1">
                <Button 
                  size="lg" 
                  className="w-full relative bg-gradient-to-r from-wg-secondary to-amber-500 hover:from-wg-secondary/90 hover:to-amber-500/90 text-wg-primary font-bold px-6 py-5 text-sm md:text-base rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Start Investing Now 
                    <ArrowRight className="ml-2 h-4 w-4 md:ml-3 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </Button>
              </Link>
            </motion.div>

            {/* Minimum investment & trust indicators - smaller */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4"
            >
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="p-1.5 rounded-full bg-gradient-to-br from-wg-secondary to-amber-400">
                    <Zap className="h-3 w-3 text-wg-primary" />
                  </div>
                </div>
                <div>
                  <p className="text-xs text-white/70">Starting From</p>
                  <p className="text-lg font-bold text-white">₦100,000</p>
                </div>
              </div>
              
              <div className="hidden sm:block h-6 w-px bg-white/20"></div>
              
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1.5">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-cyan-300 border-2 border-gray-900"></div>
                  ))}
                </div>
                <div>
                  <p className="text-xs text-white/70">Join</p>
                  <p className="font-semibold text-white text-sm">2,500+ Investors</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Visual Showcase */}
          <div className="relative">
            {/* Floating cards - smaller */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -top-4 -right-4 z-30"
            >
              <div className="bg-gradient-to-br from-emerald-500 to-green-500 p-3 rounded-xl shadow-xl transform rotate-3 animate-float">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-white" />
                  <div>
                    <p className="text-xs text-white/90">Avg. Returns</p>
                    <p className="text-lg font-bold text-white">18-24% p.a.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -bottom-4 -left-4 z-30"
            >
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-xl shadow-xl transform -rotate-3 animate-float-delayed">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-white" />
                  <div>
                    <p className="text-xs text-white/90">Completed</p>
                    <p className="text-lg font-bold text-white">45+ Projects</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Main image container - smaller */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative rounded-2xl overflow-hidden shadow-xl border border-white/10 backdrop-blur-sm"
            >
              {/* Hero image - smaller height */}
              <div className="relative h-[400px] md:h-[450px] w-full">
                <img
                  src="/hero.jpg"
                  alt="Water Grove Investment Team - Professional Wealth Management"
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>
                
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-wg-secondary via-wg-accent to-transparent"></div>
                
                {/* Content overlay - reduced padding */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  {/* Sector indicators - smaller */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {[
                        { icon: Building, label: 'Real Estate', color: 'from-blue-500 to-cyan-500' },
                        { icon: Leaf, label: 'Agriculture', color: 'from-emerald-500 to-green-500' },
                        { icon: Truck, label: 'Logistics', color: 'from-orange-500 to-amber-500' },
                      ].map((sector, i) => (
                        <div 
                          key={i}
                          className={`px-3 py-1.5 rounded-full bg-gradient-to-r ${sector.color} bg-opacity-20 backdrop-blur-sm border border-white/10 flex items-center gap-1.5`}
                        >
                          <sector.icon className="h-3 w-3" />
                          <span className="text-white text-xs font-medium">{sector.label}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Main description - smaller */}
                    <div className="bg-white/5 backdrop-blur-md rounded-lg p-4 border border-white/10">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-wg-secondary to-amber-500">
                          <Users className="h-5 w-5 text-wg-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">Expert Portfolio Management</h3>
                          <p className="text-white/70 text-xs mt-0.5">
                            Each investment is carefully evaluated by our team of industry specialists
                          </p>
                        </div>
                      </div>
                      
                      {/* Stats row - smaller */}
                      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
                        <div>
                          <p className="text-xl font-bold text-white">₦10B+</p>
                          <p className="text-white/60 text-xs">Total Investments</p>
                        </div>
                        <div>
                          <p className="text-xl font-bold text-white">98%</p>
                          <p className="text-white/60 text-xs">On-time Returns</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Corner accent - smaller */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-wg-secondary to-transparent transform rotate-45 origin-top-right">
                  <div className="absolute bottom-3 left-2 text-wg-primary font-bold text-xs transform -rotate-45">
                    SECURE
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bottom floating element - smaller */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -bottom-2 right-1/4 z-20"
            >
              <div className="bg-gradient-to-r from-wg-primary to-wg-primary2 px-3 py-1.5 rounded-full border border-white/10 shadow-md flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-wg-secondary animate-pulse"></div>
                <span className="text-white text-xs font-medium">Asset-Backed</span>
              </div>
            </motion.div>

            {/* Glow effect - smaller */}
            <div className="absolute -inset-3 bg-gradient-to-r from-wg-secondary/20 to-wg-accent/20 rounded-2xl blur-xl -z-10"></div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - smaller */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 hidden lg:block"
      >
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-white/40 text-xs">Scroll to explore</span>
          <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white/40 rounded-full mt-1.5 animate-bounce"></div>
          </div>
        </div>
      </motion.div>

      {/* Bottom decorative wave - smaller */}
      <div className="absolute bottom-0 left-0 right-0 h-12 overflow-hidden">
        <svg 
          className="w-full h-full text-gray-900" 
          viewBox="0 0 1200 80" 
          preserveAspectRatio="none"
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;