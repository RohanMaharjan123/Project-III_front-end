"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Search, Star, TrendingUp, TrendingDown, Plus } from "lucide-react"
import { useState } from "react"

// Sample NEPSE stocks
const nepseStocks = [
    { symbol: "NABIL", name: "Nabil Bank Limited", sector: "Banking", ltp: 1245, change: 1.26, positive: true },
    { symbol: "SHL", name: "Shivam Cements Ltd", sector: "Manufacturing", ltp: 425, change: -1.89, positive: false },
    { symbol: "UPPER", name: "Upper Tamakoshi Hydropower", sector: "Hydropower", ltp: 820, change: 2.34, positive: true },
    { symbol: "LICN", name: "Life Insurance Nepal", sector: "Insurance", ltp: 903, change: -0.45, positive: false },
    {
        symbol: "HIDCL",
        name: "Hydropower Development Company",
        sector: "Hydropower",
        ltp: 567,
        change: 0.87,
        positive: true,
    },
    { symbol: "GBIME", name: "Global IME Bank Limited", sector: "Banking", ltp: 456, change: -0.23, positive: false },
    { symbol: "SANIMA", name: "Sanima Bank Limited", sector: "Banking", ltp: 389, change: 1.45, positive: true },
    {
        symbol: "CHCL",
        name: "Chilime Hydropower Company",
        sector: "Hydropower",
        ltp: 678,
        change: -0.67,
        positive: false,
    },
]

interface AddStockModalProps {
    isOpen: boolean
    onClose: () => void
    watchlistId: string
}

export function AddStockModal({ isOpen, onClose, watchlistId }: AddStockModalProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedStocks, setSelectedStocks] = useState<typeof nepseStocks>([])
    const [targetPrice, setTargetPrice] = useState("")
    const [notes, setNotes] = useState("")

    const filteredStocks = nepseStocks.filter(
        (stock) =>
            (stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                stock.sector.toLowerCase().includes(searchTerm.toLowerCase())) &&
            !selectedStocks.find((s) => s.symbol === stock.symbol),
    )

    const handleStockSelect = (stock: (typeof nepseStocks)[0]) => {
        setSelectedStocks([...selectedStocks, stock])
    }

    const handleStockRemove = (symbol: string) => {
        setSelectedStocks(selectedStocks.filter((stock) => stock.symbol !== symbol))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log({
            watchlistId,
            stocks: selectedStocks,
            targetPrice: targetPrice ? Number.parseFloat(targetPrice) : undefined,
            notes,
        })

        // Reset form
        setSelectedStocks([])
        setTargetPrice("")
        setNotes("")
        setSearchTerm("")
        onClose()
    }

    const getSectorColor = (sector: string) => {
        const colors = {
            Banking: "bg-blue-100 text-blue-800",
            Manufacturing: "bg-purple-100 text-purple-800",
            Hydropower: "bg-green-100 text-green-800",
            Insurance: "bg-orange-100 text-orange-800",
            Finance: "bg-yellow-100 text-yellow-800",
        }
        return colors[sector as keyof typeof colors] || "bg-gray-100 text-gray-800"
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add Stocks to Watchlist</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Stock Search */}
                    <div className="space-y-3">
                        <Label>Search & Select Stocks</Label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                placeholder="Search NEPSE stocks by symbol, name, or sector..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>

                        {/* Search Results */}
                        {searchTerm && (
                            <div className="border border-gray-200 rounded-lg max-h-64 overflow-y-auto">
                                {filteredStocks.slice(0, 10).map((stock) => (
                                    <div
                                        key={stock.symbol}
                                        className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 flex items-center justify-between"
                                        onClick={() => handleStockSelect(stock)}
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <p className="font-semibold text-gray-900">{stock.symbol}</p>
                                                <Badge className={getSectorColor(stock.sector)} variant="secondary">
                                                    {stock.sector}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-gray-600">{stock.name}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold">Rs. {stock.ltp.toLocaleString()}</p>
                                            <div
                                                className={`text-xs flex items-center ${stock.positive ? "text-green-600" : "text-red-600"}`}
                                            >
                                                {stock.positive ? (
                                                    <TrendingUp className="w-3 h-3 mr-1" />
                                                ) : (
                                                    <TrendingDown className="w-3 h-3 mr-1" />
                                                )}
                                                {Math.abs(stock.change)}%
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {filteredStocks.length === 0 && <div className="p-3 text-center text-gray-500">No stocks found</div>}
                            </div>
                        )}
                    </div>

                    {/* Selected Stocks */}
                    {selectedStocks.length > 0 && (
                        <div className="space-y-3">
                            <Label>Selected Stocks ({selectedStocks.length})</Label>
                            <div className="space-y-2 max-h-32 overflow-y-auto">
                                {selectedStocks.map((stock) => (
                                    <div
                                        key={stock.symbol}
                                        className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded-lg"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Star className="w-4 h-4 text-green-600" />
                                            <div>
                                                <p className="font-semibold text-gray-900">{stock.symbol}</p>
                                                <p className="text-xs text-gray-600">{stock.name}</p>
                                            </div>
                                            <Badge className={getSectorColor(stock.sector)} variant="secondary">
                                                {stock.sector}
                                            </Badge>
                                        </div>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleStockRemove(stock.symbol)}
                                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Optional Fields */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="targetPrice">Target Price (Optional)</Label>
                            <Input
                                id="targetPrice"
                                type="number"
                                step="0.01"
                                placeholder="Enter target price in Rs."
                                value={targetPrice}
                                onChange={(e) => setTargetPrice(e.target.value)}
                            />
                            <p className="text-xs text-gray-500">Set a target price to track when stocks reach your desired level</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="notes">Notes (Optional)</Label>
                            <Textarea
                                id="notes"
                                placeholder="Add notes about why you're tracking these stocks..."
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                rows={3}
                            />
                        </div>
                    </div>

                    {/* Quick Add Suggestions */}
                    {selectedStocks.length === 0 && !searchTerm && (
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-blue-900 mb-2">Popular Stocks to Track:</h4>
                            <div className="flex flex-wrap gap-2">
                                {nepseStocks.slice(0, 6).map((stock) => (
                                    <Button
                                        key={stock.symbol}
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleStockSelect(stock)}
                                        className="h-8 px-3 text-xs border-blue-300 hover:bg-blue-100"
                                    >
                                        <Plus className="w-3 h-3 mr-1" />
                                        {stock.symbol}
                                    </Button>
                                ))}
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
                            disabled={selectedStocks.length === 0}
                        >
                            Add {selectedStocks.length} Stock{selectedStocks.length !== 1 ? "s" : ""} to Watchlist
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
