import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const technicalIndicators = [
  { name: "RSI (14)", value: "65.4", signal: "Neutral", description: "Slightly overbought territory" },
  { name: "MACD", value: "12.3", signal: "Bullish", description: "Positive momentum building" },
  { name: "Moving Average (50)", value: "1,235", signal: "Bullish", description: "Price above MA50" },
  { name: "Moving Average (200)", value: "1,180", signal: "Bullish", description: "Strong uptrend confirmed" },
  { name: "Bollinger Bands", value: "Upper", signal: "Neutral", description: "Price near upper band" },
  { name: "Volume", value: "High", signal: "Bullish", description: "Above average volume" },
]

export function TechnicalIndicators() {
  const getSignalColor = (signal: string) => {
    switch (signal.toLowerCase()) {
      case "bullish":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "bearish":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-card-foreground">Technical Indicators</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {technicalIndicators.map((indicator, index) => (
            <div key={index} className="p-4 border border-border rounded-lg bg-muted/50">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-card-foreground">{indicator.name}</h4>
                <Badge className={getSignalColor(indicator.signal)}>{indicator.signal}</Badge>
              </div>
              <div className="text-2xl font-bold text-card-foreground mb-1">{indicator.value}</div>
              <p className="text-sm text-muted-foreground">{indicator.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
