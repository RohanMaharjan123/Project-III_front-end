"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Eye } from "lucide-react"

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
    ltp: 884.17,
    dailyChange: 66.62,
    dailyChangePercent: 8.15,
    weekHigh52: 899,
    weekLow52: 450.80,
    volume: 40903,
  },
  {
    symbol: "MANDU",
    sector: "Hydropower",
    ltp: 931.78,
    dailyChange: 59.00,
    dailyChangePercent: 6.76,
    weekHigh52: 1493.10,
    weekLow52: 805.60,
    volume: 103688,
  },
  {
    symbol: "SMATA",
    sector: "Microfinance",
    ltp: 881.34,
    dailyChange: 54.36,
    dailyChangePercent: 6.57,
    weekHigh52: 1271.00,
    weekLow52: 734,
    volume: 33648,
  },
  {
    symbol: "BGWT",
    sector: "Hydropower",
    ltp: 1091.90,
    dailyChange:  66.85,
    dailyChangePercent: 6.52,
    weekHigh52: 1241.00,
    weekLow52: 857.60,
    volume: 115863,
  },
  {
    symbol: "SANIMA",
    sector: "Commercial Banks",
    ltp: 358.11,
    dailyChange:  16.40,
    dailyChangePercent: 4.80,
    weekHigh52: 382.00,
    weekLow52: 262.20,
    volume: 747527,
  },
  {
    symbol: "SBI",
    sector: "Hydro Power",
    ltp: 444.56,
    dailyChange: 24.3,
    dailyChangePercent: 5.8,
    weekHigh52: 868,
    weekLow52: 293,
    volume: 99793,
  },
  {
    symbol: "SPL",
    sector: "Mutual Fund",
    ltp: 9.98,
    dailyChange: 0.48,
    dailyChangePercent: 5.05,
    weekHigh52: 0,
    weekLow52: 0,
    volume: 593169,
  },
  {
    symbol: "ACLBSL",
    sector: "Corporate Debenture",
    ltp: 1154.94,
    dailyChange: 54.9,
    dailyChangePercent: 4.99,
    weekHigh52: 0,
    weekLow52: 0,
    volume: 100,
  },
  {
    symbol: "LSL",
    sector: "Hydro Power",
    ltp: 521.5,
    dailyChange: 24.8,
    dailyChangePercent: 4.98,
    weekHigh52: 715.1,
    weekLow52: 486,
    volume: 97446,
  },
  {
    symbol: "MIBSF2",
    sector: "Hydro Power",
    ltp: 401.88,
    dailyChange: 32.9,
    dailyChangePercent: 8.93,
    weekHigh52: 577.81,
    weekLow52: 293,
    volume: 25343,
  },
]

const topLosers: MarketStock[] = [
  {
    symbol: "CORBL",
    sector: "Development Banks",
    ltp: 2340.4,
    dailyChange:  -257.69,
    dailyChangePercent: -9.92,
    weekHigh52: 2842.30,
    weekLow52: 574.30,
    volume: 28506,
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
    symbol: "RHGCL",
    sector: "Hydropower",
    ltp: 357.68,
    dailyChange: -24.73,
    dailyChangePercent: -6.47,
    weekHigh52: 708,
    weekLow52: 308,
    volume: 133897,
  },
  {
    symbol: "SINDHU",
    sector: "Development Banks",
    ltp: 882.74 ,
    dailyChange: -40.50,
    dailyChangePercent: -4.39,
    weekHigh52: 1482.00,
    weekLow52: 449.00,
    volume: 110196,
  },
  {
    symbol: "PMHPL",
    sector: "Hydropower",
    ltp: 388.53,
    dailyChange: -17.66,
    dailyChangePercent: -4.35,
    weekHigh52: 459.00,
    weekLow52: 223.00,
    volume:  56354,
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
    symbol: "GMLI",
    sector: "Life Insurance",
    ltp: 2241.03,
    dailyChange:  -85.37,
    dailyChangePercent: -3.67,
    weekHigh52: 2778.00,
    weekLow52: 301.00,
    volume: 2633,
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

const marketTrends = [
  {
    sector: "Banking",
    change: "+2.45%",
    positive: true,
    stocks: ["NABIL", "EBL", "BOKL"],
    volume: "High",
  },
  {
    sector: "Hydropower",
    change: "+1.87%",
    positive: true,
    stocks: ["UPPER", "CHCL", "AKPL"],
    volume: "Medium",
  },
  {
    sector: "Insurance",
    change: "-0.92%",
    positive: false,
    stocks: ["LICN", "NLICL", "SICL"],
    volume: "Low",
  },
  {
    sector: "Hotels",
    change: "+0.56%",
    positive: true,
    stocks: ["OHL", "TRH", "SHL"],
    volume: "Medium",
  },
]

const getSectorColor = (sector: string) => {
  const colors = {
    "Development Banks": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    "Hydro Power": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    "Manufacturing And Processing": "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    "Life Insurance": "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
    "Mutual Fund": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    "Corporate Debenture": "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
    Others: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
    Hotels: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
    Banking: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    Hydropower: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    Insurance: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  }
  return colors[sector as keyof typeof colors] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
}

const formatVolume = (volume: number) => {
  if (volume >= 1000000) return `${(volume / 1000000).toFixed(1)}M`
  if (volume >= 1000) return `${(volume / 1000).toFixed(1)}K`
  return volume.toString()
}

const MarketTable = ({ stocks, title, isGainer }: { stocks: MarketStock[]; title: string; isGainer: boolean }) => (
  <Card className="border-border shadow-sm">
    <CardHeader className="pb-3">
      <CardTitle className="flex items-center gap-2 text-base">
        {isGainer ? (
          <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
        ) : (
          <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400" />
        )}
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="pt-0">
      <div className="space-y-2">
        {stocks.slice(0, 5).map((stock, index) => (
          <div
            key={stock.symbol}
            className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
          >
            {/* Single Row Layout */}
            <div className="flex items-center justify-between w-full">
              {/* Left: Rank + Stock Info */}
              <div className="flex items-center gap-4 min-w-0 flex-1">
                <span className="text-xs font-bold text-muted-foreground flex-shrink-0">#{index + 1}</span>
                <div className="min-w-0">
                  <p className="font-semibold text-foreground text-sm">{stock.symbol}</p>
                </div>
                <div className="flex-shrink-0">
                  <Badge className={`${getSectorColor(stock.sector)} text-xs`} variant="secondary">
                    {stock.sector}
                  </Badge>
                </div>
              </div>

              {/* Center: Market Data */}
              <div className="flex items-center gap-6 text-xs">
                {/* LTP */}
                <div className="text-center min-w-[60px]">
                  <p className="text-muted-foreground mb-1">LTP</p>
                  <p className="font-semibold text-foreground">Rs. {stock.ltp.toLocaleString()}</p>
                </div>

                {/* Change */}
                <div className="text-center min-w-[60px]">
                  <p className="text-muted-foreground mb-1">Change</p>
                  <div
                    className={`font-semibold flex items-center justify-center ${
                      isGainer ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {isGainer ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                    {Math.abs(stock.dailyChangePercent).toFixed(2)}%
                  </div>
                </div>

                {/* 52W H/L */}
                <div className="text-center min-w-[60px]">
                  <p className="text-muted-foreground mb-1">52W H/L</p>
                  {stock.weekHigh52 > 0 ? (
                    <div>
                      <div className="text-green-600 dark:text-green-400 font-medium">{stock.weekHigh52}</div>
                      <div className="text-red-600 dark:text-red-400">{stock.weekLow52}</div>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">N/A</span>
                  )}
                </div>

                {/* Volume */}
                <div className="text-center min-w-[50px]">
                  <p className="text-muted-foreground mb-1">Volume</p>
                  <p className="font-medium text-foreground">{formatVolume(stock.volume)}</p>
                </div>
              </div>

              {/* Right: Action Button */}
              <div className="flex-shrink-0 ml-3">
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Eye className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      <div className="mt-4 text-center">
        <Button variant="outline" size="sm" className="text-xs bg-transparent">
          View All {stocks.length} {isGainer ? "Gainers" : "Losers"}
        </Button>
      </div>
    </CardContent>
  </Card>
)

export function MarketTrends() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Market Trends</h2>
          <p className="text-muted-foreground">Top performing stocks in NEPSE today</p>
        </div>
        {/* <Badge variant="outline" className="text-green-600 dark:text-green-400 border-green-300 dark:border-green-600">
          Live Data
        </Badge> */}
      </div>

      {/* Stacked Layout - Gainers first, then Losers */}
      <div className="space-y-6">
        <MarketTable stocks={topGainers} title="Top 10 Gainers" isGainer={true} />
        <MarketTable stocks={topLosers} title="Top 10 Losers" isGainer={false} />
      </div>

      {/* New Market Trends Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {marketTrends.map((trend, index) => (
          <Card key={index} className="border-border bg-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-card-foreground">{trend.sector}</CardTitle>
                <Badge
                  variant="outline"
                  className={`text-xs px-2 py-1 border-border ${
                    trend.positive
                      ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20"
                      : "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20"
                  }`}
                >
                  {trend.positive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                  {trend.change}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex flex-wrap gap-1">
                  {trend.stocks.map((stock, stockIndex) => (
                    <Badge key={stockIndex} variant="secondary" className="text-xs bg-muted text-muted-foreground">
                      {stock}
                    </Badge>
                  ))}
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">Volume:</span>
                  <span
                    className={`font-medium ${
                      trend.volume === "High"
                        ? "text-green-600 dark:text-green-400"
                        : trend.volume === "Medium"
                          ? "text-yellow-600 dark:text-yellow-400"
                          : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {trend.volume}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
