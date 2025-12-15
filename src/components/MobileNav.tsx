"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Wallet, TrendingUp, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"

const MobileBottomNav = () => {
    const pathname = usePathname()

    const navItems = [
        { title: "Dashboard", href: "/dashboard", icon: BarChart3 },
        { title: "Invest", href: "/invest", icon: TrendingUp },
        { title: "Search", href: "/search", icon: Search },
        { title: "Portfolio", href: "/portfolio", icon: Wallet },
        { title: "Account", href: "/account", icon: User },
    ]

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background md:hidden">
            <div className="flex h-16 items-center justify-around">
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Button
                            key={item.href}
                            variant={isActive ? "secondary" : "ghost"}
                            size="icon"
                            asChild
                            className="flex h-full w-full flex-col items-center justify-center rounded-none"
                        >
                            <Link href={item.href}>
                                <item.icon className={`h-5 w-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                                <span className={`mt-1 text-xs ${isActive ? "text-primary font-medium" : "text-muted-foreground"}`}>
                  {item.title}
                </span>
                            </Link>
                        </Button>
                    )
                })}
            </div>
        </div>
    )
}

export default MobileBottomNav