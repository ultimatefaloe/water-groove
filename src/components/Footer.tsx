import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {/* Replace with actual logo */}
              <div className="h-8 w-8 rounded bg-primary" />
              <span className="text-lg font-semibold">
                Water Groove Investment
              </span>
            </div>

            <p className="text-sm text-muted-foreground">
              A structured investment platform providing access to
              verified, asset-backed investment opportunities with
              transparent returns.
            </p>

            <address className="not-italic text-sm text-muted-foreground">
              Head Office: <br />
              Water Groove Investment Ltd <br />
              Lagos, Nigeria
            </address>
          </div>

          {/* Company Navigation */}
          <div>
            <h4 className="mb-4 text-sm font-semibold">Company</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-primary">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/investment-sectors" className="hover:text-primary">
                  Investment Sectors
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-primary">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Navigation */}
          <div>
            <h4 className="mb-4 text-sm font-semibold">Legal</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/legal/privacy-policy" className="hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/terms-conditions" className="hover:text-primary">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/legal/investment-disclaimer" className="hover:text-primary">
                  Investment Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/legal/refund-policy" className="hover:text-primary">
                  Refund & Withdrawal Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social & Trust */}
          <div>
            <h4 className="mb-4 text-sm font-semibold">Connect With Us</h4>

            <div className="flex gap-4">
              <Link href="#" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </Link>
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </Link>
              <Link href="#" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </Link>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              All investments carry risk. Returns are not guaranteed.
              Please read all legal documents before investing.
            </p>
          </div>
        </div>

        {/* Divider */}
        <Separator className="my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-muted-foreground md:flex-row md:text-left">
          <p>
            © {new Date().getFullYear()} Water Groove Investment Platform.
            All rights reserved.
          </p>

          <p>
            Built with transparency, discipline, and long-term value.
          </p>
        </div>
      </div>
    </footer>
  );
}
