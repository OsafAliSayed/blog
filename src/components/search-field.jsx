"use client"

import { useState } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function SearchField({ onSearch, placeholder = "Search posts..." }) {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (value) => {
    setSearchTerm(value)
    onSearch(value)
  }

  const clearSearch = () => {
    setSearchTerm("")
    onSearch("")
  }

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="relative header-glossy rounded-full border border-border/20">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-12 pr-12 h-14 rounded-full border-0 bg-transparent backdrop-blur-lg focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-base placeholder:text-muted-foreground/70 focus:placeholder:text-muted-foreground/50"
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-3 top-1/2 h-8 w-8 -translate-y-1/2 p-0 hover:bg-primary/10 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-105"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
