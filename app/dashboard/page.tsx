import { StockOverview } from "@/components/dashboard/stock-overview"
import { SentimentSummary } from "@/components/dashboard/sentiment-summary"
import { NewsHeadlines } from "@/components/dashboard/news-headlines"
import { TechnicalIndicators } from "@/components/dashboard/technical-indicators"
// import { MarketSummary } from "@/components/dashboard/market-summary"
import { WatchlistCard } from "@/components/dashboard/watchlist-card"

export default function DashboardPage() {
  return (
    <div className="w-full max-w-none">
      {/* Market Summary */}
      <div className="mb-6">
        {/* <MarketSummary /> */}
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        {/* Left Column - Stock Analysis */}
        <div className="lg:col-span-2 space-y-6 min-w-0">
          <StockOverview />
          <SentimentSummary />
          <TechnicalIndicators />
        </div>

        {/* Right Column - News & Watchlist */}
        <div className="space-y-6 min-w-0">
          <NewsHeadlines />
          <WatchlistCard />
        </div>
      </div>
    </div>
  )
}
