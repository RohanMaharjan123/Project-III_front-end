"use client"

import React, { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { NEPSE_STOCKS } from "@/lib/constants/nepse-stocks"


interface Stock {
  id: number
  symbol: string
  name: string
}

interface StockSearchProps {
  onSelect: (stockSymbol: string) => void
  initialStockSymbol?: string
}

export function StockSearch({ onSelect, initialStockSymbol }: StockSearchProps) {
  const [open, setOpen] = useState(false)
  const [stocks, setStocks] = useState<Stock[]>([])
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const filteredStocks = NEPSE_STOCKS.filter(stock =>
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setStocks(filteredStocks);
  }, [searchTerm]);

  useEffect(() => {
    if (initialStockSymbol) {
      const stock = NEPSE_STOCKS.find((s) => s.symbol === initialStockSymbol);
      if (stock) {
        setSelectedStock(stock);
      }
    }
  }, [initialStockSymbol]);

  const handleSelect = (stock: Stock) => {
    setSelectedStock(stock)
    onSelect(stock.symbol)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedStock ? selectedStock.symbol : "Select stock..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput
            placeholder="Search stock..."
            value={searchTerm}
            onValueChange={setSearchTerm}
          />
          <CommandList>
            <CommandEmpty>No stock found.</CommandEmpty>
            <CommandGroup>
              {stocks.map((stock) => (
                <CommandItem
                  key={stock.id}
                  value={stock.symbol}
                  onSelect={() => handleSelect(stock)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedStock?.id === stock.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {stock.symbol} - {stock.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}