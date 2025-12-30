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
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-wg-secondary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-wg-accent/5 rounded-full blur-3xl"></div>
        
        {/* Gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-tr from-wg-primary/20 via-transparent to-wg-secondary/10"></div>
      </div>

      {/* Glow effect at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-wg-secondary to-transparent"></div>
      
      {/* Top decorative line */}
      <div className="absolute top-0 left-0 right-0 h-1">
        <div className="h-full w-full bg-gradient-to-r from-transparent via-wg-secondary to-transparent animate-shimmer"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column: Content */}
          <div className="relative">
            {/* Trust badge with subtle animation */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-8 group hover:bg-white/10 transition-all duration-300"
            >
              <div className="relative">
                <Sparkles className="h-4 w-4 text-wg-secondary" />
                <div className="absolute inset-0 animate-ping opacity-20">
                  <Sparkles className="h-4 w-4 text-wg-secondary" />
                </div>
              </div>
              <span className="text-sm font-semibold text-white">
                Trusted by 2,500+ Investors Nationwide
              </span>
              <ChevronRight className="h-3 w-3 text-white/60 group-hover:translate-x-1 transition-transform" />
            </motion.div>

            {/* Main headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight"
            >
              <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-wg-secondary">
                Strategic Wealth
              </span>
              <span className="block mt-2">
                <span className="relative inline-block">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-wg-secondary via-wg-accent to-amber-300">
                    Building Platform
                  </span>
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-wg-secondary to-amber-300 rounded-full"></span>
                </span>
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed max-w-2xl"
            >
              Access professionally managed, asset-backed investment opportunities across 
              real estate, agriculture, logistics, and structured finance — delivering 
              predictable monthly returns with complete transparency.
            </motion.p>

            {/* Key features */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 gap-4 mb-10"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-wg-secondary/20 backdrop-blur-sm">
                  <TrendingUp className="h-5 w-5 text-wg-secondary" />
                </div>
                <div>
                  <p className="text-white font-semibold">Monthly Returns</p>
                  <p className="text-white/60 text-sm">Predictable income</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-wg-accent/20 backdrop-blur-sm">
                  <Shield className="h-5 w-5 text-wg-accent" />
                </div>
                <div>
                  <p className="text-white font-semibold">Asset-Backed</p>
                  <p className="text-white/60 text-sm">Tangible security</p>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <Link href="/register" className="group">
                <Button 
                  size="lg" 
                  className="relative bg-gradient-to-r from-wg-secondary to-amber-500 hover:from-wg-secondary/90 hover:to-amber-500/90 text-wg-primary font-bold px-8 py-7 text-base rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    Start Investing Now 
                    <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </Button>
              </Link>
              <Link href="/investment-sectors">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/30 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/50 text-white font-semibold px-8 py-7 text-base rounded-xl transition-all duration-300 group"
                >
                  <span className="flex items-center">
                    Explore Opportunities
                    <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Link>
            </motion.div>

            {/* Minimum investment & trust indicators */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-6"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="p-2 rounded-full bg-gradient-to-br from-wg-secondary to-amber-400">
                    <Zap className="h-4 w-4 text-wg-primary" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-white/70">Starting From</p>
                  <p className="text-xl font-bold text-white">₦100,000</p>
                </div>
              </div>
              
              <div className="hidden sm:block h-8 w-px bg-white/20"></div>
              
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-300 border-2 border-gray-900"></div>
                  ))}
                </div>
                <div>
                  <p className="text-sm text-white/70">Join</p>
                  <p className="font-semibold text-white">2,500+ Investors</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Visual Showcase */}
          <div className="relative">
            {/* Floating cards */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -top-6 -right-6 z-30"
            >
              <div className="bg-gradient-to-br from-emerald-500 to-green-500 p-4 rounded-2xl shadow-2xl transform rotate-3 animate-float">
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-6 w-6 text-white" />
                  <div>
                    <p className="text-sm text-white/90">Avg. Returns</p>
                    <p className="text-xl font-bold text-white">18-24% p.a.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -bottom-6 -left-6 z-30"
            >
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-4 rounded-2xl shadow-2xl transform -rotate-3 animate-float-delayed">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-white" />
                  <div>
                    <p className="text-sm text-white/90">Completed</p>
                    <p className="text-xl font-bold text-white">45+ Projects</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Main image container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 backdrop-blur-sm"
            >
              {/* Hero image */}
              <div className="relative h-[500px] w-full">
                <Image
                  src="/hero.jpg"
                  alt="Water Grove Investment Team - Professional Wealth Management"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>
                
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-wg-secondary via-wg-accent to-transparent"></div>
                
                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  {/* Sector indicators */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {[
                        { icon: Building, label: 'Real Estate', color: 'from-blue-500 to-cyan-500' },
                        { icon: Leaf, label: 'Agriculture', color: 'from-emerald-500 to-green-500' },
                        { icon: Truck, label: 'Logistics', color: 'from-orange-500 to-amber-500' },
                      ].map((sector, i) => (
                        <div 
                          key={i}
                          className={`px-4 py-2 rounded-full bg-gradient-to-r ${sector.color} bg-opacity-20 backdrop-blur-sm border border-white/10 flex items-center gap-2`}
                        >
                          <sector.icon className="h-4 w-4" />
                          <span className="text-white text-sm font-medium">{sector.label}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Main description */}
                    <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-lg bg-gradient-to-br from-wg-secondary to-amber-500">
                          <Users className="h-6 w-6 text-wg-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">Expert Portfolio Management</h3>
                          <p className="text-white/70 text-sm mt-1">
                            Each investment is carefully evaluated by our team of industry specialists
                          </p>
                        </div>
                      </div>
                      
                      {/* Stats row */}
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                        <div>
                          <p className="text-2xl font-bold text-white">₦10B+</p>
                          <p className="text-white/60 text-sm">Total Investments</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-white">98%</p>
                          <p className="text-white/60 text-sm">On-time Returns</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-wg-secondary to-transparent transform rotate-45 origin-top-right">
                  <div className="absolute bottom-4 left-4 text-wg-primary font-bold text-sm transform -rotate-45">
                    SECURE
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bottom floating element */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -bottom-3 right-1/4 z-20"
            >
              <div className="bg-gradient-to-r from-wg-primary to-wg-primary2 px-4 py-2 rounded-full border border-white/10 shadow-lg flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-wg-secondary animate-pulse"></div>
                <span className="text-white text-sm font-medium">Asset-Backed Security</span>
              </div>
            </motion.div>

            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-wg-secondary/20 to-wg-accent/20 rounded-3xl blur-2xl -z-10"></div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:block"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/50 text-sm">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </motion.div>

      {/* Bottom decorative wave */}
      <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden">
        <svg 
          className="w-full h-full text-gray-900" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            fill="currentColor"
          ></path>
        </svg>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(3deg); }
          50% { transform: translateY(-20px) rotate(3deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          50% { transform: translateY(-20px) rotate(-3deg); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 6s ease-in-out infinite 1s;
        }
        .animate-shimmer {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.1) 50%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;