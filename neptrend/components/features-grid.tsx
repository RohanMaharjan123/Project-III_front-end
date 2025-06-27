import { TrendingUp, BarChart3, PieChart, MessageSquare } from "lucide-react"

const features = [
  {
    icon: TrendingUp,
    title: "Real-time Data",
    description: "Live market data and price movements for all NEPSE listed companies",
  },
  {
    icon: BarChart3,
    title: "Technical Analysis",
    description: "Advanced charting tools and technical indicators for market analysis",
  },
  {
    icon: PieChart,
    title: "Fundamental Data",
    description: "Company financials, ratios, and fundamental analysis metrics",
  },
  {
    icon: MessageSquare,
    title: "Sentiment Analysis",
    description: "AI-powered market sentiment tracking from news and social media",
  },
]

export function FeaturesGrid() {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Comprehensive NEPSE Analytics</h2>
          <p className="text-gray-600 text-lg">Everything you need to make informed investment decisions</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
