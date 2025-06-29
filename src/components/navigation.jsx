"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { SearchField } from "@/components/search-field"
import { useSearch } from "@/components/search-provider"

export function Navigation() {
  const pathname = usePathname()
  const { setSearchTerm } = useSearch()

  const handleSearch = (value) => {
    setSearchTerm(value)
  }

  return (
    <div className="sticky top-4 z-50 w-full flex justify-center px-4">
      <nav className="nav-floating header-glossy rounded-full border border-border/20 max-w-4xl w-full">
        <div className="flex h-14 items-center justify-between gap-4">
          <div className="flex-1 max-w-full">
            <SearchField 
              onSearch={handleSearch}
              placeholder="Search posts..."
            />
          </div>
        </div>
      </nav>
    </div>
  )
}
