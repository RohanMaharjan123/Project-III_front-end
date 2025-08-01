"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Search, X } from "lucide-react"
import { useState } from "react"

// Sample NEPSE stocks (in real app, this would be fetched from API)
const nepseStocks = [
  { symbol: "NABIL", name: "Nabil Bank Limited", sector: "Banking", ltp: 1245 },
  { symbol: "SHL", name: "Shivam Cements Ltd", sector: "Manufacturing", ltp: 425 },
  { symbol: "UPPER", name: "Upper Tamakoshi Hydropower", sector: "Hydropower", ltp: 820 },
  { symbol: "LICN", name: "Life Insurance Nepal", sector: "Insurance", ltp: 903 },
  { symbol: "HIDCL", name: "Hydropower Development Company", sector: "Hydropower", ltp: 567 },
  { symbol: "GBIME", name: "Global IME Bank Limited", sector: "Banking", ltp: 456 },
  { symbol: "SANIMA", name: "Sanima Bank Limited", sector: "Banking", ltp: 389 },
  { symbol: "CHCL", name: "Chilime Hydropower Company", sector: "Hydropower", ltp: 678 },
  // Add more stocks as needed...
]

interface AddTransactionModalProps {
  isOpen: boolean
  onClose: () => void
  portfolioId: string
}

export function AddTransactionModal({ isOpen, onClose, portfolioId }: AddTransactionModalProps) {
  const [transactionType, setTransactionType] = useState("BUY")
  const [selectedStock, setSelectedStock] = useState<(typeof nepseStocks)[0] | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [quantity, setQuantity] = useState("")
  const [price, setPrice] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [showStockSearch, setShowStockSearch] = useState(false)

  const filteredStocks = nepseStocks.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleStockSelect = (stock: (typeof nepseStocks)[0]) => {
    setSelectedStock(stock)
    setPrice(stock.ltp.toString())
    setShowStockSearch(false)
    setSearchTerm("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle transaction submission
    console.log({
      type: transactionType,
      stock: selectedStock,
      quantity: Number.parseInt(quantity),
      price: Number.parseFloat(price),
      date,
      portfolioId,
    })
    onClose()
  }

  const totalAmount = selectedStock && quantity && price ? Number.parseInt(quantity) * Number.parseFloat(price) : 0

  const estimatedFees = totalAmount * 0.005 // 0.5% fees

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Transaction</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Transaction Type */}
          <div className="space-y-2">
            <Label>Transaction Type</Label>
            <Select value={transactionType} onValueChange={setTransactionType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BUY">Buy</SelectItem>
                <SelectItem value="SELL">Sell</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Stock Selection */}
          <div className="space-y-2">
            <Label>Select Stock</Label>
            {selectedStock ? (
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50">
                <div>
                  <p className="font-semibold">{selectedStock.symbol}</p>
                  <p className="text-sm text-gray-600">{selectedStock.name}</p>
                  <Badge variant="outline" className="mt-1">
                    {selectedStock.sector}
                  </Badge>
                </div>
                <Button type="button" variant="ghost" size="sm" onClick={() => setSelectedStock(null)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search NEPSE stocks..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      setShowStockSearch(true)
                    }}
                    onFocus={() => setShowStockSearch(true)}
                    className="pl-10"
                  />
                </div>

                {showStockSearch && searchTerm && (
                  <div className="border border-gray-200 rounded-lg max-h-48 overflow-y-auto">
                    {filteredStocks.slice(0, 10).map((stock) => (
                      <div
                        key={stock.symbol}
                        className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                        onClick={() => handleStockSelect(stock)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold">{stock.symbol}</p>
                            <p className="text-sm text-gray-600">{stock.name}</p>
                            <Badge variant="outline" className="mt-1">
                              {stock.sector}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">Rs. {stock.ltp}</p>
                            <p className="text-xs text-gray-500">LTP</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {filteredStocks.length === 0 && (
                      <div className="p-3 text-center text-gray-500">No stocks found</div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quantity */}
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              required
            />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="price">Price per Share (Rs.)</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min="0"
              required
            />
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label htmlFor="date">Transaction Date</Label>
            <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>

          {/* Transaction Summary */}
          {totalAmount > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <h4 className="font-semibold text-gray-900">Transaction Summary</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Total Amount:</span>
                  <span>Rs. {totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Fees (0.5%):</span>
                  <span>Rs. {estimatedFees.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-semibold border-t border-gray-200 pt-1">
                  <span>Net Amount:</span>
                  <span>Rs. {(totalAmount + estimatedFees).toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700"
              disabled={!selectedStock || !quantity || !price}
            >
              Add Transaction
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
