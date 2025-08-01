"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Star, TrendingUp, TrendingDown, MoreHorizontal, Users, Target, Zap } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Watchlist {
    id: string
    name: string
    description: string
    stockCount: number
    avgChange: number
    isPositive: boolean
    color: string
    icon: React.ComponentType<{ className?: string }>
    category: "personal" | "sector" | "strategy"
}

const watchlists: Watchlist[] = [
    {
        id: "main",
        name: "Main Watchlist",
        description: "Primary stocks I'm tracking",
        stockCount: 12,
        avgChange: 2.34,
        isPositive: true,
        color: "bg-blue-100 text-blue-800 border-blue-200",
        icon: Star,
        category: "personal",
    },
    {
        id: "banking",
        name: "Banking Sector",
        description: "All banking and financial stocks",
        stockCount: 8,
        avgChange: 1.87,
        isPositive: true,
        color: "bg-green-100 text-green-800 border-green-200",
        icon: TrendingUp,
        category: "sector",
    },
    {
        id: "hydropower",
        name: "Hydropower",
        description: "Renewable energy investments",
        stockCount: 6,
        avgChange: -0.45,
        isPositive: false,
        color: "bg-cyan-100 text-cyan-800 border-cyan-200",
        icon: Zap,
        category: "sector",
    },
    {
        id: "high-dividend",
        name: "High Dividend",
        description: "Dividend-focused investments",
        stockCount: 5,
        avgChange: 3.21,
        isPositive: true,
        color: "bg-purple-100 text-purple-800 border-purple-200",
        icon: Target,
        category: "strategy",
    },
    {
        id: "family-picks",
        name: "Family Picks",
        description: "Stocks recommended by family",
        stockCount: 4,
        avgChange: 0.89,
        isPositive: true,
        color: "bg-orange-100 text-orange-800 border-orange-200",
        icon: Users,
        category: "personal",
    },
]

interface WatchlistGroupsProps {
    selectedWatchlist: string
    onWatchlistChange: (watchlistId: string) => void
    onCreateNew: () => void
}

export function WatchlistGroups({ selectedWatchlist, onWatchlistChange, onCreateNew }: WatchlistGroupsProps) {
    const getCategoryLabel = (category: string) => {
        switch (category) {
            case "personal":
                return "Personal"
            case "sector":
                return "Sector"
            case "strategy":
                return "Strategy"
            default:
                return "Other"
        }
    }

    const groupedWatchlists = watchlists.reduce(
        (acc, watchlist) => {
            if (!acc[watchlist.category]) {
                acc[watchlist.category] = []
            }
            acc[watchlist.category].push(watchlist)
            return acc
        },
        {} as Record<string, Watchlist[]>,
    )

    return (
        <div className="space-y-6">
            {Object.entries(groupedWatchlists).map(([category, categoryWatchlists]) => (
                <div key={category}>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">{getCategoryLabel(category)} Watchlists</h3>
                        <Badge variant="outline" className="text-xs">
                            {categoryWatchlists.length} lists
                        </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {categoryWatchlists.map((watchlist) => (
                            <Card
                                key={watchlist.id}
                                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${selectedWatchlist === watchlist.id
                                        ? "ring-2 ring-green-500 border-green-200"
                                        : "border-gray-200 hover:border-gray-300"
                                    }`}
                                onClick={() => onWatchlistChange(watchlist.id)}
                            >
                                <CardContent className="p-4">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className={`p-2 rounded-lg ${watchlist.color}`}>
                                            <watchlist.icon className="w-4 h-4" />
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>Edit Watchlist</DropdownMenuItem>
                                                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                                <DropdownMenuItem>Export</DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    <h4 className="font-semibold text-gray-900 mb-1">{watchlist.name}</h4>
                                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{watchlist.description}</p>

                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-gray-600">
                                            <span className="font-medium">{watchlist.stockCount}</span> stocks
                                        </div>
                                        <div
                                            className={`flex items-center text-sm ${watchlist.isPositive ? "text-green-600" : "text-red-600"}`}
                                        >
                                            {watchlist.isPositive ? (
                                                <TrendingUp className="w-3 h-3 mr-1" />
                                            ) : (
                                                <TrendingDown className="w-3 h-3 mr-1" />
                                            )}
                                            {Math.abs(watchlist.avgChange)}%
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        {/* Create New Watchlist Card for each category */}
                        {category === "personal" && (
                            <Card
                                className="cursor-pointer border-2 border-dashed border-gray-300 hover:border-green-400 transition-colors duration-200"
                                onClick={onCreateNew}
                            >
                                <CardContent className="p-4 flex flex-col items-center justify-center h-full min-h-[140px]">
                                    <Plus className="w-8 h-8 text-gray-400 mb-2" />
                                    <p className="text-sm font-medium text-gray-600">Create New Watchlist</p>
                                    <p className="text-xs text-gray-500 text-center mt-1">Organize your stocks by theme</p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}
