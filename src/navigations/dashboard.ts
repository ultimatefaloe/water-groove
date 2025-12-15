import { NavLinks } from "@/types/nav";
import {
  TrendingUp,
  Wallet,
  ArrowDownToLine,
  BarChart3,
  User,
  LayoutDashboard,
  Banknote,
} from "lucide-react";

export const dashboardNavItems: NavLinks[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Deposits",
    href: "/dashboard/deposits",
    icon: Wallet,
  },
  {
    title: "Transactions",
    href: "/dashboard/transactions",
    icon: Banknote,
  },
  {
    title: "Withdrawals",
    href: "/dashboard/withdrawals",
    icon: ArrowDownToLine,
  },
  {
    title: "Investments",
    href: "/dashboard/investments",
    icon: TrendingUp,
  },
];
