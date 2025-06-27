import { TrendingUp, TrendingDown } from "lucide-react"

interface MarketData {
  name: string
  value: string
  change: string
  percent: string
  positive: boolean
}

interface MarketTickerProps {
  data?: MarketData[]
}

const marketData: MarketData[] = [
  { name: "NEPSE", value: "2600.53", change: "-0.22", percent: "+0.9%", positive: true },
  { name: "SENSITIVE", value: "445.17", change: "+0.1", percent: "+0.02%", positive: true },
  { name: "SENFLOAT", value: "151.4", change: "+0.18", percent: "+0.12%", positive: true },
  { name: "FLOAT", value: "177.47", change: "+0.09", percent: "+0.05%", positive: true },
  { name: "DEVBANK", value: "5242.6", change: "-22.24", percent: "-0.42%", positive: false },
  { name: "MANUFACTUR", value: "7032.58", change: "+29.57", percent: "+0.42%", positive: true },
]

export function MarketTicker({ data }: MarketTickerProps) {
  const rows = data ?? marketData
  return (
    <div className="bg-gray-50 border-b border-gray-200 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-sm text-gray-600 mb-2">
          As of Tuesday, June 25, 2025 2:59 PM | CMFI Rs. 10.85 1.21% ↗ | MBLDB7 Rs. 1045 0.45% ↗ | RSY Rs. 0.0% ↗ |
          MLBSP Rs. 0.0% ↗
        </div>
        <div className="flex space-x-6 overflow-x-auto pb-2">
          {rows.map((item, index) => (
            <div key={index} className="flex-shrink-0 bg-white rounded-lg p-3 border border-gray-200 min-w-[140px]">
              <div className="text-xs text-gray-500 mb-1">{item.name}</div>
              <div className="font-semibold text-gray-900">{item.value}</div>
              <div className={`text-xs flex items-center ${item.positive ? "text-green-600" : "text-red-600"}`}>
                <span>{item.change}</span>
                <span className="ml-1">{item.percent}</span>
                {item.positive ? <TrendingUp className="w-3 h-3 ml-1" /> : <TrendingDown className="w-3 h-3 ml-1" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
