"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, BarChart3, Activity } from "lucide-react"

const marketIndices = [
    { name: "NEPSE", value: "2,731.80", change: "+25.89", percent: "+0.95%", positive: true },
    { name: "SENSITIVE", value: "472.02", change: "+7.55", percent: "+1.62%", positive: true },
    { name: "FLOAT", value: "188.1", change: "+2.27", percent: "+1.22%", positive: true },
    { name: "BANKING", value: "1454.21", change: "≈+3.02%", percent: "≈+3.02%", positive: true },
    { name: "HYDROPOWER", value: "3563.94", change: "≈−0.22%", percent: "≈−0.22%", positive: false },
    { name: "MANUFACTURING", value: "7225.57", change: "+32.74", percent: "+0.46%", positive: true },
];

const marketStats = {
    totalTurnover: "Rs. 9.68B",
    totalVolume: "26.47M",
    totalTrades: "88,615",
    advancers: 161,
    decliners: 87,
    unchanged: 0,
};

export function MarketOverview() {
    return (
        <div className="space-y-6">
            {/* Market Indices */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Indices</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {marketIndices.map((index, i) => (
                        <Card key={i}>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">{index.name}</p>
                                        <p className="text-2xl font-bold text-gray-900">{index.value}</p>
                                        <div className={`flex items-center text-sm ${index.positive ? "text-green-600" : "text-red-600"}`}>
                                            {index.positive ? (
                                                <TrendingUp className="w-4 h-4 mr-1" />
                                            ) : (
                                                <TrendingDown className="w-4 h-4 mr-1" />
                                            )}
                                            <span>
                                                {index.change} ({index.percent})
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Market Statistics */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Turnover</CardTitle>
                            <BarChart3 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{marketStats.totalTurnover}</div>
                            <p className="text-xs text-muted-foreground">Today's trading volume</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Volume</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{marketStats.totalVolume}</div>
                            <p className="text-xs text-muted-foreground">Shares traded</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Trades</CardTitle>
                            <BarChart3 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{marketStats.totalTrades}</div>
                            <p className="text-xs text-muted-foreground">Number of transactions</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Market Breadth</CardTitle>
                            <TrendingUp className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="text-green-600">Advancers: {marketStats.advancers}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-red-600">Decliners: {marketStats.decliners}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Unchanged: {marketStats.unchanged}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
