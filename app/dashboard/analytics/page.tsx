"use client"

import { MarketTrends } from "@/components/analytics/market-trends"
import { MarketOverview } from "@/components/analytics/market-overview"
import { SectorAnalysis } from "@/components/analytics/sector-analysis"
import { TechnicalIndicators } from "@/components/dashboard/technical-indicators"

export default function AnalyticsPage() {
  return (
    <div className="w-full max-w-none space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Market Analytics</h2>
        <p className="text-gray-600">Comprehensive analysis of NEPSE market trends and performance</p>
      </div>

      {/* Market Overview */}
      {/* <MarketOverview /> */}

      {/* Market Trends - Top Gainers and Losers */}
      <MarketTrends />

      {/* Sector Analysis */}
      <SectorAnalysis />

      {/* Technical Indicators */}
      <TechnicalIndicators />
    </div>
  )
}
