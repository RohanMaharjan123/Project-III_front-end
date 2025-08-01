"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Search, TrendingUp, TrendingDown, MoreHorizontal, Star, Eye, ShoppingCart } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"

interface WatchlistStock {
    symbol: string
    name: string
    sector: string
    currentPrice: number
    dayChange: number
    dayChangePercent: number
    weekChange: number
    monthChange: number
    threeMonthChange: number
    sixMonthChange: number
    yearChange: number
    weekHigh52: number
    weekLow52: number
    marketCap: string
    isPositive: boolean
    addedDate: string
    targetPrice?: number
    notes?: string
}

const watchlistStocks: WatchlistStock[] = [
    {
        symbol: "NABIL",
        name: "Nabil Bank Limited",
        sector: "Banking",
        currentPrice: 1245,
        dayChange: 15.5,
        dayChangePercent: 1.26,
        weekChange: 3.45,
        monthChange: -2.15,
        threeMonthChange: 8.92,
        sixMonthChange: 15.67,
        yearChange: 24.67,
        weekHigh52: 1350,
        weekLow52: 980,
        marketCap: "45.2B",
        isPositive: true,
        addedDate: "2024-12-01",
        targetPrice: 1300,
        notes: "Strong quarterly results",
    },
    {
        symbol: "SHL",
        name: "Shivam Cements Ltd",
        sector: "Manufacturing",
        currentPrice: 425,
        dayChange: -8.2,
        dayChangePercent: -1.89,
        weekChange: -5.67,
        monthChange: 8.92,
        threeMonthChange: -12.34,
        sixMonthChange: 5.43,
        yearChange: -8.21,
        weekHigh52: 580,
        weekLow52: 380,
        marketCap: "12.8B",
        isPositive: false,
        addedDate: "2024-11-28",
        targetPrice: 450,
    },
    {
        symbol: "UPPER",
        name: "Upper Tamakoshi Hydropower",
        sector: "Hydropower",
        currentPrice: 820,
        dayChange: 19.2,
        dayChangePercent: 2.39,
        weekChange: 5.67,
        monthChange: 12.34,
        threeMonthChange: 18.92,
        sixMonthChange: 22.45,
        yearChange: 35.67,
        weekHigh52: 950,
        weekLow52: 600,
        marketCap: "28.5B",
        isPositive: true,
        addedDate: "2024-12-05",
        targetPrice: 900,
        notes: "Monsoon season boost",
    },
    {
        symbol: "LICN",
        name: "Life Insurance Nepal",
        sector: "Insurance",
        currentPrice: 903,
        dayChange: -4.1,
        dayChangePercent: -0.45,
        weekChange: -1.23,
        monthChange: 6.78,
        threeMonthChange: 4.56,
        sixMonthChange: 12.89,
        yearChange: 18.34,
        weekHigh52: 1100,
        weekLow52: 750,
        marketCap: "18.7B",
        isPositive: false,
        addedDate: "2024-11-30",
        targetPrice: 950,
    },
]

interface WatchlistTableProps {
    watchlistId: string
    viewMode: "grid" | "table"
    onAddStock: () => void
}

export function WatchlistTable({ watchlistId, viewMode, onAddStock }: WatchlistTableProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const [sortBy, setSortBy] = useState("symbol")

    const filteredStocks = watchlistStocks.filter(
        (stock) =>
            stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
            stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            stock.sector.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const getSectorColor = (sector: string) => {
        const colors = {
            Banking: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
            Manufacturing: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300",
            Hydropower: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
            Insurance: "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300",
            Finance: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300",
        }
        return colors[sector as keyof typeof colors] || "bg-muted text-muted-foreground"
    }

    const handleQuickAction = (action: string, stock: WatchlistStock) => {
        console.log(`${action} action for ${stock.symbol}`)
    }

    return (
        <Card className="bg-card border-border">
            <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <CardTitle className="flex items-center gap-2 text-foreground">
                        <Star className="w-5 h-5 text-yellow-500" />
                        Watchlist Stocks
                        <Badge variant="outline" className="border-border text-muted-foreground">
                            {filteredStocks.length} stocks
                        </Badge>
                    </CardTitle>
                    <Button onClick={onAddStock} className="bg-green-600 hover:bg-green-700 text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Stock
                    </Button>
                </div>

                {/* Search and Filters */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                            placeholder="Search stocks by symbol, name, or sector..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground"
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSortBy("performance")}
                            className="border-border text-foreground hover:bg-accent"
                        >
                            Sort by Performance
                        </Button>
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                {viewMode === "grid" ? (
                    /* Grid View */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredStocks.map((stock) => (
                            <Card key={stock.symbol} className="border border-border hover:shadow-md transition-shadow bg-card">
                                <CardContent className="p-4">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="font-semibold text-foreground">{stock.symbol}</h3>
                                            <p className="text-sm text-muted-foreground line-clamp-1">{stock.name}</p>
                                            <Badge className={`${getSectorColor(stock.sector)} mt-1`} variant="secondary">
                                                {stock.sector}
                                            </Badge>
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="bg-popover border-border">
                                                <DropdownMenuItem
                                                    onClick={() => handleQuickAction("buy", stock)}
                                                    className="text-foreground hover:bg-accent"
                                                >
                                                    <ShoppingCart className="w-4 h-4 mr-2" />
                                                    Quick Buy
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handleQuickAction("view", stock)}
                                                    className="text-foreground hover:bg-accent"
                                                >
                                                    <Eye className="w-4 h-4 mr-2" />
                                                    View Details
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-foreground hover:bg-accent">Edit Notes</DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                                                    Remove
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-bold text-foreground">
                                                Rs. {stock.currentPrice.toLocaleString()}
                                            </span>
                                            <div
                                                className={`flex items-center text-sm font-medium ${stock.isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                                                    }`}
                                            >
                                                {stock.isPositive ? (
                                                    <TrendingUp className="w-4 h-4 mr-1" />
                                                ) : (
                                                    <TrendingDown className="w-4 h-4 mr-1" />
                                                )}
                                                {Math.abs(stock.dayChangePercent)}%
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                                            <div>
                                                <span>1W: </span>
                                                <span
                                                    className={
                                                        stock.weekChange > 0
                                                            ? "text-green-600 dark:text-green-400"
                                                            : "text-red-600 dark:text-red-400"
                                                    }
                                                >
                                                    {stock.weekChange > 0 ? "+" : ""}
                                                    {stock.weekChange}%
                                                </span>
                                            </div>
                                            <div>
                                                <span>1M: </span>
                                                <span
                                                    className={
                                                        stock.monthChange > 0
                                                            ? "text-green-600 dark:text-green-400"
                                                            : "text-red-600 dark:text-red-400"
                                                    }
                                                >
                                                    {stock.monthChange > 0 ? "+" : ""}
                                                    {stock.monthChange}%
                                                </span>
                                            </div>
                                            <div>
                                                <span>3M: </span>
                                                <span
                                                    className={
                                                        stock.threeMonthChange > 0
                                                            ? "text-green-600 dark:text-green-400"
                                                            : "text-red-600 dark:text-red-400"
                                                    }
                                                >
                                                    {stock.threeMonthChange > 0 ? "+" : ""}
                                                    {stock.threeMonthChange}%
                                                </span>
                                            </div>
                                            <div>
                                                <span>1Y: </span>
                                                <span
                                                    className={
                                                        stock.yearChange > 0
                                                            ? "text-green-600 dark:text-green-400"
                                                            : "text-red-600 dark:text-red-400"
                                                    }
                                                >
                                                    {stock.yearChange > 0 ? "+" : ""}
                                                    {stock.yearChange}%
                                                </span>
                                            </div>
                                            <div className="col-span-2">
                                                <span>52W H/L: </span>
                                                <span className="font-medium text-foreground">
                                                    Rs. {stock.weekHigh52} / Rs. {stock.weekLow52}
                                                </span>
                                            </div>
                                        </div>

                                        {stock.targetPrice && (
                                            <div className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
                                                Target: Rs. {stock.targetPrice.toLocaleString()}
                                            </div>
                                        )}

                                        {stock.notes && (
                                            <div className="text-xs text-muted-foreground bg-muted p-2 rounded">📝 {stock.notes}</div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    /* Table View */
                    <div className="space-y-4">
                        {/* Mobile Cards */}
                        <div className="md:hidden space-y-4">
                            {filteredStocks.map((stock) => (
                                <div key={stock.symbol} className="border border-border rounded-lg p-4 bg-card">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="font-semibold text-foreground">{stock.symbol}</h3>
                                            <p className="text-sm text-muted-foreground">{stock.name}</p>
                                            <Badge className={`${getSectorColor(stock.sector)} mt-1`} variant="secondary">
                                                {stock.sector}
                                            </Badge>
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="bg-popover border-border">
                                                <DropdownMenuItem
                                                    onClick={() => handleQuickAction("buy", stock)}
                                                    className="text-foreground hover:bg-accent"
                                                >
                                                    <ShoppingCart className="w-4 h-4 mr-2" />
                                                    Quick Buy
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handleQuickAction("view", stock)}
                                                    className="text-foreground hover:bg-accent"
                                                >
                                                    <Eye className="w-4 h-4 mr-2" />
                                                    View Details
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-foreground hover:bg-accent">Edit Notes</DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                                                    Remove
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-muted-foreground">Current Price</p>
                                            <p className="font-semibold text-foreground">Rs. {stock.currentPrice.toLocaleString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Day Change</p>
                                            <div
                                                className={`font-semibold ${stock.isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                                            >
                                                {stock.dayChange > 0 ? "+" : ""}
                                                {stock.dayChange} ({stock.dayChangePercent}%)
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Market Cap</p>
                                            <p className="font-semibold text-foreground">Rs. {stock.marketCap}</p>
                                        </div>
                                    </div>

                                    {stock.targetPrice && (
                                        <div className="mt-3 text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
                                            🎯 Target: Rs. {stock.targetPrice.toLocaleString()}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Desktop Table */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Stock</th>
                                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Sector</th>
                                        <th className="text-right py-3 px-4 font-medium text-muted-foreground">Price</th>
                                        <th className="text-right py-3 px-4 font-medium text-muted-foreground">Day Change</th>
                                        <th className="text-right py-3 px-4 font-medium text-muted-foreground">1W</th>
                                        <th className="text-right py-3 px-4 font-medium text-muted-foreground">1M</th>
                                        <th className="text-right py-3 px-4 font-medium text-muted-foreground">3M</th>
                                        <th className="text-right py-3 px-4 font-medium text-muted-foreground">6M</th>
                                        <th className="text-right py-3 px-4 font-medium text-muted-foreground">1Y</th>
                                        <th className="text-right py-3 px-4 font-medium text-muted-foreground">52W H/L</th>
                                        <th className="text-right py-3 px-4 font-medium text-muted-foreground">Target</th>
                                        <th className="text-center py-3 px-4 font-medium text-muted-foreground">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredStocks.map((stock) => (
                                        <tr key={stock.symbol} className="border-b border-border hover:bg-accent/50">
                                            <td className="py-4 px-4">
                                                <div>
                                                    <p className="font-semibold text-foreground">{stock.symbol}</p>
                                                    <p className="text-sm text-muted-foreground">{stock.name}</p>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <Badge className={getSectorColor(stock.sector)} variant="secondary">
                                                    {stock.sector}
                                                </Badge>
                                            </td>
                                            <td className="py-4 px-4 text-right font-semibold text-foreground">
                                                Rs. {stock.currentPrice.toLocaleString()}
                                            </td>
                                            <td className="py-4 px-4 text-right">
                                                <div
                                                    className={`${stock.isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                                                >
                                                    <p className="font-semibold">
                                                        {stock.dayChange > 0 ? "+" : ""}
                                                        {stock.dayChange}
                                                    </p>
                                                    <p className="text-sm">({stock.dayChangePercent}%)</p>
                                                </div>
                                            </td>
                                            <td
                                                className={`py-4 px-4 text-right ${stock.weekChange > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                                            >
                                                {stock.weekChange > 0 ? "+" : ""}
                                                {stock.weekChange}%
                                            </td>
                                            <td
                                                className={`py-4 px-4 text-right ${stock.monthChange > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                                            >
                                                {stock.monthChange > 0 ? "+" : ""}
                                                {stock.monthChange}%
                                            </td>
                                            <td
                                                className={`py-4 px-4 text-right ${stock.threeMonthChange > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                                            >
                                                {stock.threeMonthChange > 0 ? "+" : ""}
                                                {stock.threeMonthChange}%
                                            </td>
                                            <td
                                                className={`py-4 px-4 text-right ${stock.sixMonthChange > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                                            >
                                                {stock.sixMonthChange > 0 ? "+" : ""}
                                                {stock.sixMonthChange}%
                                            </td>
                                            <td
                                                className={`py-4 px-4 text-right ${stock.yearChange > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                                            >
                                                {stock.yearChange > 0 ? "+" : ""}
                                                {stock.yearChange}%
                                            </td>
                                            <td className="py-4 px-4 text-right">
                                                <div className="text-sm">
                                                    <div className="text-green-600 dark:text-green-400 font-medium">Rs. {stock.weekHigh52}</div>
                                                    <div className="text-red-600 dark:text-red-400">Rs. {stock.weekLow52}</div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 text-right">
                                                {stock.targetPrice ? (
                                                    <span className="text-blue-600 dark:text-blue-400 font-medium">
                                                        Rs. {stock.targetPrice.toLocaleString()}
                                                    </span>
                                                ) : (
                                                    <span className="text-muted-foreground">-</span>
                                                )}
                                            </td>
                                            <td className="py-4 px-4 text-center">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                                                            <MoreHorizontal className="w-4 h-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent className="bg-popover border-border">
                                                        <DropdownMenuItem
                                                            onClick={() => handleQuickAction("buy", stock)}
                                                            className="text-foreground hover:bg-accent"
                                                        >
                                                            <ShoppingCart className="w-4 h-4 mr-2" />
                                                            Quick Buy
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => handleQuickAction("view", stock)}
                                                            className="text-foreground hover:bg-accent"
                                                        >
                                                            <Eye className="w-4 h-4 mr-2" />
                                                            View Details
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="text-foreground hover:bg-accent">Edit Notes</DropdownMenuItem>
                                                        <DropdownMenuItem className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                                                            Remove
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {filteredStocks.length === 0 && (
                    <div className="text-center py-12">
                        <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground text-lg mb-2">No stocks in this watchlist yet</p>
                        <p className="text-muted-foreground mb-4">Start by adding some stocks to track</p>
                        <Button onClick={onAddStock} className="bg-green-600 hover:bg-green-700 text-white">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Your First Stock
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
