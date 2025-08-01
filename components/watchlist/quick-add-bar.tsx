"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, TrendingUp, TrendingDown } from "lucide-react"
import { useState } from "react"

// Sample NEPSE stocks for quick search
const popularStocks = [
    { symbol: "NABIL", name: "Nabil Bank Limited", price: 1245, change: 1.26, positive: true },
    { symbol: "SHL", name: "Shivam Cements Ltd", price: 425, change: -1.89, positive: false },
    { symbol: "UPPER", name: "Upper Tamakoshi Hydropower", price: 820, change: 2.34, positive: true },
    { symbol: "LICN", name: "Life Insurance Nepal", price: 903, change: -0.45, positive: false },
    { symbol: "HIDCL", name: "Hydropower Development Company", price: 567, change: 0.87, positive: true },
    { symbol: "GBIME", name: "Global IME Bank Limited", price: 456, change: -0.23, positive: false },
]

interface QuickAddBarProps {
    selectedWatchlist: string
}

export function QuickAddBar({ selectedWatchlist }: QuickAddBarProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const [showSuggestions, setShowSuggestions] = useState(false)

    const filteredStocks = popularStocks.filter(
        (stock) =>
            stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
            stock.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const handleQuickAdd = (stock: (typeof popularStocks)[0]) => {
        console.log(`Adding ${stock.symbol} to watchlist ${selectedWatchlist}`)
        setSearchTerm("")
        setShowSuggestions(false)
    }

    return (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
                {/* Quick Search */}
                <div className="flex-1 relative">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            placeholder="Quick add stocks to watchlist (e.g., NABIL, SHL)..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value)
                                setShowSuggestions(e.target.value.length > 0)
                            }}
                            onFocus={() => setShowSuggestions(searchTerm.length > 0)}
                            className="pl-10 h-11 border-green-300 focus:border-green-500 focus:ring-green-500 bg-white"
                        />
                    </div>

                    {/* Search Suggestions */}
                    {showSuggestions && searchTerm && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
                            {filteredStocks.slice(0, 6).map((stock) => (
                                <div
                                    key={stock.symbol}
                                    className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 flex items-center justify-between"
                                    onClick={() => handleQuickAdd(stock)}
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <p className="font-semibold text-gray-900">{stock.symbol}</p>
                                            <Badge variant="outline" className="text-xs">
                                                Quick Add
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-gray-600">{stock.name}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold">Rs. {stock.price.toLocaleString()}</p>
                                        <div className={`text-xs flex items-center ${stock.positive ? "text-green-600" : "text-red-600"}`}>
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

                {/* Popular Stocks Quick Add */}
                <div className="flex flex-wrap gap-2">
                    <span className="text-sm text-gray-600 font-medium">Popular:</span>
                    {popularStocks.slice(0, 4).map((stock) => (
                        <Button
                            key={stock.symbol}
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuickAdd(stock)}
                            className="h-8 px-3 text-xs border-green-300 hover:bg-green-50 hover:border-green-400"
                        >
                            <Plus className="w-3 h-3 mr-1" />
                            {stock.symbol}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-3 pt-3 border-t border-green-200">
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span>💡 Tip: Type stock symbols or names for quick suggestions</span>
                    <span>⭐ Click popular stocks to add instantly</span>
                </div>
            </div>
        </div>
    )
}
