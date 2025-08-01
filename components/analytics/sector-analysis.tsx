"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react"

interface SectorData {
    name: string
    totalStocks: number
    marketCap: string
    avgChange: number
    topGainer: string
    topLoser: string
    volume: string
    isPositive: boolean
}

const sectorData: SectorData[] = [
    {
        name: "Banking",
        totalStocks: 27,
        marketCap: "Rs. 1.2T",
        avgChange: 1.45,
        topGainer: "NABIL (+2.3%)",
        topLoser: "SANIMA (-0.8%)",
        volume: "2.1M",
        isPositive: true,
    },
    {
        name: "Hydro Power",
        totalStocks: 45,
        marketCap: "Rs. 890B",
        avgChange: 2.87,
        topGainer: "BARUN (+8.9%)",
        topLoser: "JOSHI (-4.5%)",
        volume: "3.5M",
        isPositive: true,
    },
    {
        name: "Development Banks",
        totalStocks: 15,
        marketCap: "Rs. 245B",
        avgChange: 4.12,
        topGainer: "GRDBL (+9.2%)",
        topLoser: "MLBL (-1.2%)",
        volume: "890K",
        isPositive: true,
    },
    {
        name: "Manufacturing",
        totalStocks: 18,
        marketCap: "Rs. 156B",
        avgChange: -1.23,
        topGainer: "SHL (+1.8%)",
        topLoser: "OMPL (-6.1%)",
        volume: "567K",
        isPositive: false,
    },
    {
        name: "Life Insurance",
        totalStocks: 12,
        marketCap: "Rs. 134B",
        avgChange: -0.67,
        topGainer: "LICN (+0.5%)",
        topLoser: "CREST (-3.9%)",
        volume: "234K",
        isPositive: false,
    },
    {
        name: "Hotels & Tourism",
        totalStocks: 8,
        marketCap: "Rs. 45B",
        avgChange: -2.34,
        topGainer: "OHL (+1.2%)",
        topLoser: "CGH (-2.9%)",
        volume: "123K",
        isPositive: false,
    },
]

export function SectorAnalysis() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Sector Analysis</h2>
                    <p className="text-gray-600">Performance breakdown by industry sectors</p>
                </div>
                <Badge variant="outline" className="text-blue-600 border-blue-300">
                    6 Sectors
                </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sectorData.map((sector, index) => (
                    <Card key={index} className="border border-gray-200 hover:shadow-md transition-shadow">
                        <CardHeader className="pb-4">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg font-semibold">{sector.name}</CardTitle>
                                <div className={`flex items-center ${sector.isPositive ? "text-green-600" : "text-red-600"}`}>
                                    {sector.isPositive ? (
                                        <TrendingUp className="w-4 h-4 mr-1" />
                                    ) : (
                                        <TrendingDown className="w-4 h-4 mr-1" />
                                    )}
                                    <span className="font-semibold">
                                        {sector.avgChange > 0 ? "+" : ""}
                                        {sector.avgChange}%
                                    </span>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600">{sector.totalStocks} listed companies</p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-600">Market Cap</p>
                                    <p className="font-semibold">{sector.marketCap}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Volume</p>
                                    <p className="font-semibold">{sector.volume}</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600">Top Gainer:</span>
                                    <span className="text-green-600 font-medium">{sector.topGainer}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600">Top Loser:</span>
                                    <span className="text-red-600 font-medium">{sector.topLoser}</span>
                                </div>
                            </div>

                            <div className="pt-2 border-t border-gray-200">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Sector Performance</span>
                                    <Badge
                                        variant="outline"
                                        className={sector.isPositive ? "text-green-600 border-green-300" : "text-red-600 border-red-300"}
                                    >
                                        {sector.isPositive ? "Bullish" : "Bearish"}
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Sector Performance Chart Placeholder */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5" />
                        Sector Performance Comparison
                    </CardTitle>
                    <p className="text-sm text-gray-600">Daily percentage change across all sectors</p>
                </CardHeader>
                <CardContent>
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                        <div className="text-center">
                            <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                            <p className="text-gray-500">Sector Performance Chart</p>
                            <p className="text-sm text-gray-400">Interactive chart coming soon</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
