"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Eye, BarChart3 } from "lucide-react"

interface MarketStock {
    symbol: string
    sector: string
    ltp: number
    dailyChange: number
    dailyChangePercent: number
    weekHigh52: number
    weekLow52: number
    volume: number
}

const topGainers: MarketStock[] = [
    {
        symbol: "MKHL",
        sector: "Hydropower",
        ltp: 884.15,
        dailyChange: 66.62,
        dailyChangePercent: 8.15,
        weekHigh52: 899.0,
        weekLow52: 450.80,
        volume: 40903,
    },
    {
        symbol: "SAPDBL",
        sector: "Development Banks",
        ltp: 995.88,
        dailyChange: 82.1,
        dailyChangePercent: 9.0,
        weekHigh52: 1595,
        weekLow52: 360,
        volume: 103688,
    },
    {
        symbol: "BARUN",
        sector: "Hydro Power",
        ltp: 401.88,
        dailyChange: 32.9,
        dailyChangePercent: 8.93,
        weekHigh52: 577.81,
        weekLow52: 293,
        volume: 711555,
    },
    {
        symbol: "PHCL",
        sector: "Hydro Power",
        ltp: 521.07,
        dailyChange: 34.7,
        dailyChangePercent: 7.14,
        weekHigh52: 745.6,
        weekLow52: 305,
        volume: 38660,
    },
    {
        symbol: "SMHL",
        sector: "Hydro Power",
        ltp: 1003.85,
        dailyChange: 64.3,
        dailyChangePercent: 6.84,
        weekHigh52: 1657,
        weekLow52: 565,
        volume: 21509,
    },
    {
        symbol: "CORBL",
        sector: "Development Banks",
        ltp: 2264.77,
        dailyChange: 132.4,
        dailyChangePercent: 6.2,
        weekHigh52: 2749,
        weekLow52: 516.2,
        volume: 6286,
    },
    {
        symbol: "NYADI",
        sector: "Hydro Power",
        ltp: 444.56,
        dailyChange: 24.3,
        dailyChangePercent: 5.8,
        weekHigh52: 868,
        weekLow52: 293,
        volume: 99793,
    },
    {
        symbol: "SFEF",
        sector: "Mutual Fund",
        ltp: 9.98,
        dailyChange: 0.48,
        dailyChangePercent: 5.05,
        weekHigh52: 0,
        weekLow52: 0,
        volume: 593169,
    },
    {
        symbol: "NICAD85/86",
        sector: "Corporate Debenture",
        ltp: 1154.94,
        dailyChange: 54.9,
        dailyChangePercent: 4.99,
        weekHigh52: 0,
        weekLow52: 0,
        volume: 100,
    },
    {
        symbol: "SPC",
        sector: "Hydro Power",
        ltp: 521.5,
        dailyChange: 24.8,
        dailyChangePercent: 4.98,
        weekHigh52: 715.1,
        weekLow52: 486,
        volume: 97446,
    },
]

const topLosers: MarketStock[] = [
    {
        symbol: "OMPL",
        sector: "Manufacturing And Processing",
        ltp: 1354.71,
        dailyChange: -87.4,
        dailyChangePercent: -6.06,
        weekHigh52: 1994.7,
        weekLow52: 297,
        volume: 21242,
    },
    {
        symbol: "PURE",
        sector: "Others",
        ltp: 942.94,
        dailyChange: -48.1,
        dailyChangePercent: -4.86,
        weekHigh52: 1207.2,
        weekLow52: 318.2,
        volume: 44968,
    },
    {
        symbol: "JOSHI",
        sector: "Hydro Power",
        ltp: 346.78,
        dailyChange: -16.1,
        dailyChangePercent: -4.45,
        weekHigh52: 511.4,
        weekLow52: 269.2,
        volume: 353539,
    },
    {
        symbol: "CREST",
        sector: "Life Insurance",
        ltp: 1397.79,
        dailyChange: -55.9,
        dailyChangePercent: -3.85,
        weekHigh52: 2234.8,
        weekLow52: 332.7,
        volume: 23027,
    },
    {
        symbol: "PPCL",
        sector: "Hydro Power",
        ltp: 384.37,
        dailyChange: -12.5,
        dailyChangePercent: -3.15,
        weekHigh52: 396.86,
        weekLow52: 230.4,
        volume: 226761,
    },
    {
        symbol: "CGH",
        sector: "Hotels",
        ltp: 966,
        dailyChange: -28.8,
        dailyChangePercent: -2.9,
        weekHigh52: 1320,
        weekLow52: 833.1,
        volume: 55944,
    },
    {
        symbol: "SFMF",
        sector: "Mutual Fund",
        ltp: 10.5,
        dailyChange: -0.3,
        dailyChangePercent: -2.78,
        weekHigh52: 0,
        weekLow52: 0,
        volume: 16400,
    },
    {
        symbol: "KKHC",
        sector: "Hydro Power",
        ltp: 392.29,
        dailyChange: -10.1,
        dailyChangePercent: -2.57,
        weekHigh52: 471.6,
        weekLow52: 221,
        volume: 90926,
    },
    {
        symbol: "NGPL",
        sector: "Hydro Power",
        ltp: 390.79,
        dailyChange: -10.2,
        dailyChangePercent: -2.54,
        weekHigh52: 571,
        weekLow52: 252.1,
        volume: 818138,
    },
    {
        symbol: "RAWA",
        sector: "Hydro Power",
        ltp: 781.1,
        dailyChange: -20.0,
        dailyChangePercent: -2.49,
        weekHigh52: 966,
        weekLow52: 557,
        volume: 6664,
    },
]

export function MarketTrends() {
    const getSectorColor = (sector: string) => {
        const colors = {
            "Development Banks": "bg-blue-100 text-blue-800",
            "Hydro Power": "bg-green-100 text-green-800",
            "Manufacturing And Processing": "bg-purple-100 text-purple-800",
            "Life Insurance": "bg-orange-100 text-orange-800",
            "Mutual Fund": "bg-yellow-100 text-yellow-800",
            "Corporate Debenture": "bg-gray-100 text-gray-800",
            Others: "bg-pink-100 text-pink-800",
            Hotels: "bg-indigo-100 text-indigo-800",
        }
        return colors[sector as keyof typeof colors] || "bg-gray-100 text-gray-800"
    }

    const formatVolume = (volume: number) => {
        if (volume >= 1000000) return `${(volume / 1000000).toFixed(1)}M`
        if (volume >= 1000) return `${(volume / 1000).toFixed(1)}K`
        return volume.toString()
    }

    const MarketTable = ({ stocks, title, isGainer }: { stocks: MarketStock[]; title: string; isGainer: boolean }) => (
        <Card>
            <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        {isGainer ? (
                            <TrendingUp className="w-5 h-5 text-green-600" />
                        ) : (
                            <TrendingDown className="w-5 h-5 text-red-600" />
                        )}
                        {title}
                        <Badge variant="outline">{stocks.length} stocks</Badge>
                    </CardTitle>
                    <Button variant="outline" size="sm">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        View All
                    </Button>
                </div>
                <p className="text-sm text-gray-600">१२ असार २०८२ / 2025-06-26 • Real-time market data from NEPSE</p>
            </CardHeader>
            <CardContent>
                {/* Mobile View */}
                <div className="md:hidden space-y-3">
                    {stocks.slice(0, 5).map((stock, index) => (
                        <div key={stock.symbol} className="border border-gray-200 rounded-lg p-3">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-gray-500">#{index + 1}</span>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{stock.symbol}</h3>
                                        <Badge className={`${getSectorColor(stock.sector)} text-xs`} variant="secondary">
                                            {stock.sector}
                                        </Badge>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm">
                                    <Eye className="w-4 h-4" />
                                </Button>
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                    <p className="text-gray-600">LTP</p>
                                    <p className="font-semibold">Rs. {stock.ltp.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Change</p>
                                    <div className={`font-semibold ${isGainer ? "text-green-600" : "text-red-600"}`}>
                                        {isGainer ? "+" : ""}
                                        {stock.dailyChangePercent.toFixed(2)}%
                                    </div>
                                </div>
                                <div>
                                    <p className="text-gray-600">52W H/L</p>
                                    <p className="text-xs">{stock.weekHigh52 > 0 ? `${stock.weekHigh52} / ${stock.weekLow52}` : "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Volume</p>
                                    <p className="text-xs">{formatVolume(stock.volume)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-2 font-medium text-gray-600">#</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">Symbol</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">Sector</th>
                                <th className="text-right py-3 px-4 font-medium text-gray-600">LTP</th>
                                <th className="text-right py-3 px-4 font-medium text-gray-600">Daily Change</th>
                                <th className="text-right py-3 px-4 font-medium text-gray-600">52W H/L</th>
                                <th className="text-right py-3 px-4 font-medium text-gray-600">Volume</th>
                                <th className="text-center py-3 px-4 font-medium text-gray-600">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stocks.map((stock, index) => (
                                <tr key={stock.symbol} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-3 px-2 text-sm font-bold text-gray-500">#{index + 1}</td>
                                    <td className="py-3 px-4">
                                        <p className="font-semibold text-gray-900">{stock.symbol}</p>
                                    </td>
                                    <td className="py-3 px-4">
                                        <Badge className={getSectorColor(stock.sector)} variant="secondary">
                                            {stock.sector}
                                        </Badge>
                                    </td>
                                    <td className="py-3 px-4 text-right font-semibold">Rs. {stock.ltp.toLocaleString()}</td>
                                    <td className="py-3 px-4 text-right">
                                        <div className={`${isGainer ? "text-green-600" : "text-red-600"}`}>
                                            <p className="font-semibold">
                                                {isGainer ? "+" : ""}
                                                {stock.dailyChangePercent.toFixed(2)}%
                                            </p>
                                            <p className="text-sm">
                                                ({isGainer ? "+" : ""}
                                                {stock.dailyChange.toFixed(1)})
                                            </p>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                        {stock.weekHigh52 > 0 ? (
                                            <div className="text-sm">
                                                <div className="text-green-600 font-medium">{stock.weekHigh52}</div>
                                                <div className="text-red-600">{stock.weekLow52}</div>
                                            </div>
                                        ) : (
                                            <span className="text-gray-400">N/A</span>
                                        )}
                                    </td>
                                    <td className="py-3 px-4 text-right text-sm">{formatVolume(stock.volume)}</td>
                                    <td className="py-3 px-4 text-center">
                                        <Button variant="ghost" size="sm">
                                            <Eye className="w-4 h-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Show More Button */}
                <div className="mt-4 text-center">
                    <Button variant="outline" size="sm">
                        View All {isGainer ? "Gainers" : "Losers"} ({stocks.length})
                    </Button>
                </div>
            </CardContent>
        </Card>
    )

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Market Trends</h2>
                    <p className="text-gray-600">Top performing stocks in NEPSE today</p>
                </div>
                <Badge variant="outline" className="text-green-600 border-green-300">
                    Live Data
                </Badge>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <MarketTable stocks={topGainers} title="Top Gainers" isGainer={true} />
                <MarketTable stocks={topLosers} title="Top Losers" isGainer={false} />
            </div>
        </div>
    )
}
