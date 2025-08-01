"use client"

import React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Portfolio } from "@/types/portfolio.d.ts"

interface PortfolioSelectorProps {
  portfolios: Portfolio[]
  selectedPortfolioId: number
  onPortfolioChange: (id: number) => void
  onEdit: (id: number) => void
  onDelete: (id: number) => void
}

export function PortfolioSelector({
  portfolios,
  selectedPortfolioId,
  onPortfolioChange,
  onEdit,
  onDelete,
}: PortfolioSelectorProps) {
  return (
    <div className="flex items-center gap-4">
      <Select onValueChange={(value) => onPortfolioChange(Number(value))} value={String(selectedPortfolioId)}>
        <SelectTrigger className="w-full md:w-[280px]">
          <SelectValue placeholder="Select a portfolio" />
        </SelectTrigger>
        <SelectContent>
          {portfolios.map((p) => (
            <SelectItem key={p.id} value={String(p.id)}>
              {p.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onEdit(selectedPortfolioId)}>Edit Portfolio</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onDelete(selectedPortfolioId)} className="text-red-600">
            Delete Portfolio
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}