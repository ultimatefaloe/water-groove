import { NavLinks } from "@/types/nav";
import {
  TrendingUp,
  Wallet,
  ArrowDownToLine,
  BarChart3,
  User,
} from "lucide-react";

export const dashboardNavItems: NavLinks[] = [
  {
    title: "Investments",
    href: "/dashboard/investments",
    icon: TrendingUp,
  },
  {
    title: "Wallet",
    href: "/dashboard/wallet",
    icon: Wallet,
  },
  {
    title: "ROI",
    href: "/dashboard/roi",
    icon: BarChart3,
  },
  {
    title: "Withdrawals",
    href: "/dashboard/withdrawals",
    icon: ArrowDownToLine,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
];
