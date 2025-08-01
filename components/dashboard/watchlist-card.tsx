import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Plus, Star } from "lucide-react"

const watchlistStocks = [
  { symbol: "NABIL", name: "Nabil Bank", price: "511.17.00", change: "+2.44%", positive: true },
  { symbol: "SHL", name: "Shivam Cements", price: "425.30", change: "-1.89%", positive: false },
  { symbol: "LICN", name: "Life Insurance", price: "903.11", change: "-0.45%", positive: false },
  { symbol: "HIDCL", name: "Hydropower Dev", price: "567.80", change: "+2.34%", positive: true },
  { symbol: "UPPER", name: "Upper Tamakoshi", price: "789.45", change: "+0.87%", positive: true },
]

export function WatchlistCard() {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-card-foreground">
            <Star className="w-5 h-5 mr-2 text-yellow-500" />
            My Watchlist
          </CardTitle>
          <Button variant="outline" size="sm" className="border-border bg-transparent">
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {watchlistStocks.map((stock, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-accent transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-card-foreground">{stock.symbol}</p>
                    <p className="text-xs text-muted-foreground">{stock.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-card-foreground">Rs. {stock.price}</p>
                    <div
                      className={`flex items-center text-xs ${stock.positive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                    >
                      {stock.positive ? (
                        <TrendingUp className="w-3 h-3 mr-1" />
                      ) : (
                        <TrendingDown className="w-3 h-3 mr-1" />
                      )}
                      {stock.change}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
