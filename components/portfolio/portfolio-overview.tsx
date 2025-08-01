"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, PieChart, BarChart3, Target } from "lucide-react"

interface PortfolioOverviewProps {
  portfolioId: string
}

const portfolioStats = {
  personal: {
    totalValue: "Rs. 2,45,000",
    totalInvested: "Rs. 2,30,000",
    totalGainLoss: "+Rs. 15,000",
    gainLossPercent: "+6.52%",
    isPositive: true,
    dayChange: "+Rs. 2,500",
    dayChangePercent: "+1.02%",
    totalStocks: 12,
    sectors: 5,
  },
  family: {
    totalValue: "Rs. 8,75,000",
    totalInvested: "Rs. 8,30,000",
    totalGainLoss: "+Rs. 45,000",
    gainLossPercent: "+5.43%",
    isPositive: true,
    dayChange: "+Rs. 8,200",
    dayChangePercent: "+0.95%",
    totalStocks: 28,
    sectors: 8,
  },
  joint: {
    totalValue: "Rs. 1,25,000",
    totalInvested: "Rs. 1,30,000",
    totalGainLoss: "-Rs. 5,000",
    gainLossPercent: "-3.85%",
    isPositive: false,
    dayChange: "-Rs. 1,200",
    dayChangePercent: "-0.95%",
    totalStocks: 8,
    sectors: 3,
  },
}

export function PortfolioOverview({ portfolioId }: PortfolioOverviewProps) {
  const stats = portfolioStats[portfolioId as keyof typeof portfolioStats] || portfolioStats.personal

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Portfolio Value */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Value</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalValue}</div>
          <div className={`text-xs flex items-center ${stats.isPositive ? "text-green-600" : "text-red-600"}`}>
            {stats.isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
            {stats.dayChange} ({stats.dayChangePercent})
          </div>
        </CardContent>
      </Card>

      {/* Total Gain/Loss */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Gain/Loss</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${stats.isPositive ? "text-green-600" : "text-red-600"}`}>
            {stats.totalGainLoss}
          </div>
          <div className={`text-xs ${stats.isPositive ? "text-green-600" : "text-red-600"}`}>
            {stats.gainLossPercent} overall return
          </div>
        </CardContent>
      </Card>

      {/* Total Invested */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalInvested}</div>
          <p className="text-xs text-muted-foreground">Principal amount</p>
        </CardContent>
      </Card>

      {/* Portfolio Diversity */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Diversity</CardTitle>
          <PieChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalStocks}</div>
          <p className="text-xs text-muted-foreground">{stats.sectors} sectors</p>
        </CardContent>
      </Card>
    </div>
  )
}
