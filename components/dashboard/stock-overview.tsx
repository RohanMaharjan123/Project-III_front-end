import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, BarChart3 } from "lucide-react"

export function StockOverview() {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-card-foreground">Stock Overview - NABIL</CardTitle>
          <Button variant="outline" size="sm" className="border-border bg-transparent">
            <BarChart3 className="w-4 h-4 mr-2" />
            View Chart
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Price Info */}
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Current Price</p>
              <p className="text-3xl font-bold text-card-foreground">Rs. 511.17</p>
              <div className="flex items-center text-green-600 dark:text-green-400">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span className="text-sm">+12.16 (+2.44%)</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Open</p>
                <p className="font-semibold text-card-foreground">Rs. 503.00</p>
              </div>
              <div>
                <p className="text-muted-foreground">High</p>
                <p className="font-semibold text-card-foreground">Rs. 522.00</p>
              </div>
              <div>
                <p className="text-muted-foreground">Low</p>
                <p className="font-semibold text-card-foreground">Rs. 500.00</p>
              </div>
              <div>
                <p className="text-muted-foreground">Volume</p>
                <p className="font-semibold text-card-foreground">264,663</p>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="space-y-4">
            <h4 className="font-semibold text-card-foreground">Key Metrics</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Market Cap</span>
                <span className="font-semibold text-card-foreground">Rs. 45.2B</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">P/E Ratio</span>
                <span className="font-semibold text-card-foreground">18.5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Book Value</span>
                <span className="font-semibold text-card-foreground">Rs. 156.78</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">EPS</span>
                <span className="font-semibold text-card-foreground">Rs. 67.30</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">ROE</span>
                <span className="font-semibold text-card-foreground">15.2%</span>
              </div>
            </div>
          </div>

          {/* Performance */}
          <div className="space-y-4">
            <h4 className="font-semibold text-card-foreground">Performance</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">1 Day</span>
                <span className="font-semibold text-green-600 dark:text-green-400">+1.26%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">1 Week</span>
                <span className="font-semibold text-green-600 dark:text-green-400">+3.45%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">1 Month</span>
                <span className="font-semibold text-red-600 dark:text-red-400">-2.15%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">3 Months</span>
                <span className="font-semibold text-green-600 dark:text-green-400">+8.92%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">1 Year</span>
                <span className="font-semibold text-green-600 dark:text-green-400">+24.67%</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
