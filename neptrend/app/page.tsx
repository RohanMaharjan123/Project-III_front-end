import { Navigation } from "@/components/navigation"
import { MarketTicker } from "@/components/market-ticker"
import { TelegramBanner } from "@/components/telegram-banner"
import { HeroSection } from "@/components/hero-section"
import { StockCards } from "@/components/stock-cards"
import { FeaturesGrid } from "@/components/features-grid"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <MarketTicker />
      <TelegramBanner />

      {/* Main Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          <HeroSection />
          <StockCards />
        </div>
      </div>

      <FeaturesGrid />
      <CTASection />
      <Footer />
    </div>
  )
}
