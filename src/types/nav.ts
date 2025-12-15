import { ComponentType } from "react";

export type NavLinks = {
  title: string;
  href: string;
  variant?: string
  icon?: ComponentType<{ className?: string }>;
};
