"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

export function Navigation() {
  const pathname = usePathname()

  return (
    <div className="sticky top-4 z-50 w-full flex justify-center px-4">
      <nav className="nav-floating header-glossy rounded-full border border-border/20 max-w-3xl w-full">
        <div className="flex h-14 items-center justify-between px-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-lg font-bold">Osaf's Blog</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link 
              href="/" 
              className={cn(
                "nav-item text-sm font-medium px-3 py-1.5 rounded-full transition-colors hover:text-primary",
                pathname === "/" ? "nav-item-active" : "text-muted-foreground"
              )}
            >
              Home
            </Link>
            <Link 
              href="/blog" 
              className={cn(
                "nav-item text-sm font-medium px-3 py-1.5 rounded-full transition-colors hover:text-primary",
                pathname.startsWith("/blog") ? "nav-item-active" : "text-muted-foreground"
              )}
            >
              Blog
            </Link>
            <Button variant="outline" size="sm" asChild>
              <a 
                href="https://osafalisayed.com" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Portfolio
              </a>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </div>
  )
}
