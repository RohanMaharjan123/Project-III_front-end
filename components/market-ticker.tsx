"use client"

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
  { name: "NEPSE",          value: "2731.80", change: "+25.89", percent: "+0.95%", positive: true },
  { name: "SENSITIVE",      value: "472.02",  change: "+7.55",  percent: "+1.62%", positive: true },
  { name: "SENFLOAT",       value: "161.53",  change: "+2.65",  percent: "+1.67%", positive: true },
  { name: "FLOAT",          value: "188.10",  change: "+2.68",  percent: "+1.45%", positive: true },
  { name: "DEVBANK",        value: "5653.27",       change: "+62.62",     percent: "+1.12",     positive: true }, 
  { name: "MANUFACTURE",     value: "7225.6",       change: "32.74",     percent: "+0.46",     positive: true }, 
  { name: "BANKING",        value: "1454.21", change: "+42.78",percent: "+3.02%", positive: true },
  { name: "HYDROPOWER",     value: "3563.9",       change: "−7.92",     percent: "−0.22",     positive: false },
  { name: "FINANCE",        value: "2488.8",       change: "+12.68",     percent: "+0.51",     positive: true }, 
  { name: "LIFEINSU",      value: "13276.8",       change: "362.68",     percent: "+0.19",     positive: true }, 
]

export function MarketTicker({ data }: MarketTickerProps) {
  const rows = data ?? marketData

  // Duplicate the data to create seamless loop
  const duplicatedRows = [...rows, ...rows]

  return (
    <div className="bg-muted/50 border-b border-border py-3 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-sm text-muted-foreground mb-2">
          As of Tuesday, July 10, 2025 3:30 PM | Live Market Data | NEPSE Analytics
        </div>

        {/* Scrolling Container */}
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll space-x-6">
            {duplicatedRows.map((item, index) => (
              <div
                key={`${item.name}-${index}`}
                className="flex-shrink-0 bg-card rounded-lg p-3 border border-border min-w-[160px] shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="text-xs text-muted-foreground mb-1 font-medium">{item.name}</div>
                <div className="font-semibold text-card-foreground text-lg">{item.value}</div>
                <div
                  className={`text-xs flex items-center font-medium ${
                    item.positive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                  }`}
                >
                  <span>{item.change}</span>
                  <span className="ml-1">{item.percent}</span>
                  {item.positive ? <TrendingUp className="w-3 h-3 ml-1" /> : <TrendingDown className="w-3 h-3 ml-1" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
