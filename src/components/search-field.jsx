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
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-12 pr-12 h-14 rounded-full border border-border/20 bg-gradient-to-r from-card/40 via-card/30 to-card/40 backdrop-blur-lg focus:border-primary/50 focus:bg-gradient-to-r focus:from-card/60 focus:via-card/50 focus:to-card/60 transition-all duration-300 shadow-xl hover:shadow-2xl focus:shadow-2xl text-base placeholder:text-muted-foreground/60"
          style={{
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.08)'
          }}
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-3 top-1/2 h-8 w-8 -translate-y-1/2 p-0 hover:bg-muted/30 rounded-full backdrop-blur-sm transition-all duration-200"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
