"use client";

import type { ComponentType } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TrendingUp, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { publicNavItems } from "@/config/navigations";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        {/* Top Row */}
        <div className="flex h-16 items-center justify-between">
          {/* LEFT: Logo + Desktop Nav */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg">
                <TrendingUp className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Water Groove
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {publicNavItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon as ComponentType<{ className?: string }>;

                return (
                  <Button
                    key={item.href}
                    variant={isActive ? "secondary" : "ghost"}
                    asChild
                    className="gap-2 px-3"
                  >
                    <Link href={item.href}>
                      {Icon && <Icon className="h-4 w-4" />}
                      {item.title}
                    </Link>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Auth + Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-2">
              <Link href="/auth/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/auth/login">
                <Button>Get Started</Button>
              </Link>
            </div>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-80 h-full p-6">
                <div className="flex flex-col justify-between h-full">
                  <div className="flex flex-col gap-8">
                    {/* Mobile Header */}
                    <div className="flex items-center justify-between">
                      <Link href="/" className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg">
                          <TrendingUp className="h-5 w-5" />
                        </div>
                        <span className="text-lg font-bold">Water Groove</span>
                      </Link>
                    </div>

                    {/* Mobile Nav */}
                    <div className="flex flex-col gap-2">
                      {publicNavItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon as ComponentType<{
                          className?: string;
                        }>;

                        return (
                          <Button
                            key={item.href}
                            variant={isActive ? "secondary" : "ghost"}
                            asChild
                            className="justify-start gap-3 px-3"
                          >
                            <Link href={item.href}>
                              {Icon && <Icon className="h-5 w-5" />}
                              {item.title}
                            </Link>
                          </Button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Mobile Auth */}
                  <div className="flex flex-col gap-3 pt-4 border-t">
                    <Link href="/auth/login">
                      <Button variant="outline" className="w-full">
                        Login
                      </Button>
                    </Link>
                    <Link href="/auth/login">
                      <Button className="w-full">Get Started</Button>
                    </Link>
                    <p className="text-xs text-center">
                      © {new Date().getFullYear()} Water Groove Investment
                      Platform. All rights reserved.
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
