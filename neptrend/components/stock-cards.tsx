import { Card, CardContent } from "@/components/ui/card"

interface Stock {
  symbol: string
  name: string
  price: string
  change: string
  percent: string
  positive: boolean
}

interface StockCardsProps {
  stocks?: Stock[]
}

const topStocks: Stock[] = [
  {
    symbol: "LICN",
    name: "Life Insurance Nepal",
    price: "903.11",
    change: "-4.11",
    percent: "-0.45%",
    positive: false,
  },
  {
    symbol: "NABIL",
    name: "Nabil Bank Limited",
    price: "1,245.00",
    change: "+15.50",
    percent: "+1.26%",
    positive: true,
  },
  {
    symbol: "SHL",
    name: "Shivam Cements Ltd",
    price: "425.30",
    change: "-8.20",
    percent: "-1.89%",
    positive: false,
  },
]

export function StockCards({ stocks }: StockCardsProps) {
  const cards = stocks ?? topStocks
  return (
    <div className="space-y-6">
      {cards.map((stock, index) => (
        <Card key={index} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{stock.name}</h3>
                <p className="text-sm text-gray-500">{stock.symbol}</p>
              </div>
              <div
                className={`w-16 h-8 rounded flex items-center justify-center ${
                  stock.positive
                    ? "bg-gradient-to-r from-green-100 to-green-200"
                    : "bg-gradient-to-r from-red-100 to-red-200"
                }`}
              >
                <div className={`w-12 h-1 rounded ${stock.positive ? "bg-green-400" : "bg-red-400"}`}></div>
              </div>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-2xl font-bold text-gray-900">{stock.price}</p>
                <div className={`flex items-center text-sm ${stock.positive ? "text-green-600" : "text-red-600"}`}>
                  <span>{stock.change}</span>
                  <span className="ml-2">{stock.percent}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
