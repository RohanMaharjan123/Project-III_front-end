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
    price: "889.91",
    change: "-4.27",
    percent: "-0.48%",
    positive: false,
  },
  {
    symbol: "NABIL",
    name: "Nabil Bank Limited",
    price: "511.17",
    change: "+12.16",
    percent: "+2.24%",
    positive: true,
  },
  {
    symbol: "SHIVM",
    name: "Shivam Cements Ltd",
    price: "523.76",
    change: "+7.97",
    percent: "+1.55%",
    positive: true,
  },
]

export function StockCards({ stocks }: StockCardsProps) {
  const cards = stocks ?? topStocks
  return (
    <div className="space-y-6">
      {cards.map((stock, index) => (
        <Card key={index} className="border border-border shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-card-foreground">{stock.name}</h3>
                <p className="text-sm text-muted-foreground">{stock.symbol}</p>
              </div>
              <div
                className={`w-16 h-8 rounded flex items-center justify-center ${
                  stock.positive
                    ? "bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30"
                    : "bg-gradient-to-r from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30"
                }`}
              >
                <div
                  className={`w-12 h-1 rounded ${
                    stock.positive ? "bg-green-400 dark:bg-green-500" : "bg-red-400 dark:bg-red-500"
                  }`}
                ></div>
              </div>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-2xl font-bold text-card-foreground">{stock.price}</p>
                <div
                  className={`flex items-center text-sm ${
                    stock.positive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                  }`}
                >
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
