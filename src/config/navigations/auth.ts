import { NavLinks } from "@/types/nav";

export const authNavItems: NavLinks[] = [
  {
    title: "Login",
    href: "/auth/login",
  },
  {
    title: "Get Started",
    href: "/auth/register",
    variant: "primary",
  },
];
