import { NavLinks } from "@/types/nav";
import {
  Users,
  ShieldCheck,
  Banknote,
  Settings,
  FileBarChart,
} from "lucide-react";


export const adminNavItems: NavLinks[] = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: ShieldCheck,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Deposits",
    href: "/admin/deposits",
    icon: Banknote,
  },
  {
    title: "Withdrawals",
    href: "/admin/withdrawals",
    icon: Banknote,
  },
  {
    title: "Reports",
    href: "/admin/reports",
    icon: FileBarChart,
  },
  // {
  //   title: "Settings",
  //   href: "/admin/settings",
  //   icon: Settings,
  // },
];
