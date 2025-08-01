"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Star, Eye, BarChart3 } from "lucide-react"

const overviewStats = {
    totalWatchlists: 5,
    totalStocks: 28,
    topGainer: { symbol: "UMHL", change: 0.11 },
    topLoser: { symbol: "OMPL", change: -6.06 },
    avgGain: 42.34,
    sectorsTracked: 8,
}

export function WatchlistOverview() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Watchlists */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Watchlists</CardTitle>
                    <Star className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{overviewStats.totalWatchlists}</div>
                    <p className="text-xs text-muted-foreground">Active watchlists</p>
                </CardContent>
            </Card>

            {/* Total Stocks */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Stocks Tracked</CardTitle>
                    <Eye className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{overviewStats.totalStocks}</div>
                    <p className="text-xs text-muted-foreground">{overviewStats.sectorsTracked} sectors covered</p>
                </CardContent>
            </Card>

            {/* Top Gainer */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Top Gainer</CardTitle>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-green-600">{overviewStats.topGainer.symbol}</div>
                    <p className="text-xs text-green-600">+{overviewStats.topGainer.change}% today</p>
                </CardContent>
            </Card>

            {/* Average Performance */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg Performance</CardTitle>
                    <BarChart3 className="h-4 w-4 text-purple-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-green-600">+{overviewStats.avgGain}%</div>
                    <p className="text-xs text-muted-foreground">Across all watchlists</p>
                </CardContent>
            </Card>
        </div>
    )
}
