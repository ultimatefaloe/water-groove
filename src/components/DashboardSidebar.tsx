"use client";

import Link from "next/link";
import {
  ChevronRight,
  DollarSign,
  Headset,
  HelpCircle,
  LogOut,
  Settings,
} from "lucide-react";
import { dashboardNavItems } from "@/navigations";
import clsx from "clsx";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";
import { NavLinks } from "@/types/nav";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";

interface SidebarProps {
  pathname: string;
  onNavigate: () => void;
}

const secondaryNavItems: NavLinks[] = [
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Support",
    href: "/dashboard/support",
    icon: Headset,
  },
  {
    title: "Help Center",
    href: "/dashboard/help",
    icon: HelpCircle,
  },
];

export function DashboardSidebar({ pathname, onNavigate }: SidebarProps) {
  const router = useRouter();

  const { user, error, isLoading } = useUser();

  const handleLogout = () => {
    router.push("/auth/logout");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="px-6 py-5 border-b">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center">
            <DollarSign className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold">Water Groove</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {dashboardNavItems.map((item) => {
          const active = pathname === item.href;

          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={clsx(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition",
                active
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-700 hover:bg-neutral-100"
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="flex-1">{item.title}</span>
              {active && <ChevronRight className="h-4 w-4" />}
            </Link>
          );
        })}
      </nav>
      <div className="overflow-y-auto px-3 py-4">
        <Separator className="my-4" />

        {/* Secondary Navigation */}
        <nav className="space-y-1">
          {secondaryNavItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={clsx(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition",
                  isActive
                    ? "bg-neutral-900 text-white"
                    : "text-neutral-700 hover:bg-neutral-100"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="font-medium">{item.title}</span>
              </Link>
            );
          })}
        </nav>
        {/* User Profile Section */}
        <div className="px-2 py-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-neutral-200">
              {user?.picture ? (
                <AvatarImage src={user.picture} alt={user.name || "User"} />
              ) : (
                <AvatarFallback className="bg-neutral-800 text-white">
                  {user?.name ? getInitials(user.name) : "U"}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex-1 min-w-0">
              {isLoading ? (
                <>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-3 w-16" />
                </>
              ) : error ? (
                <>
                  <p className="text-sm font-medium text-neutral-900 truncate">
                    Error loading user
                  </p>
                  <p className="text-xs text-neutral-500">Please refresh</p>
                </>
              ) : user ? (
                <>
                  <p className="text-sm font-medium text-neutral-900 truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-neutral-500 truncate">
                    {user.email}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm font-medium text-neutral-900">Guest</p>
                  <p className="text-xs text-neutral-500">Not signed in</p>
                </>
              )}
            </div>
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-neutral-600 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              {/* <span className="font-medium">Logout</span> */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
