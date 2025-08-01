import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, ExternalLink } from "lucide-react"

const newsHeadlines = [
    {
        title: "NABIL Bank Reports Strong Q3 Earnings with 15% Growth",
        source: "Nepal Financial Times",
        time: "2 hours ago",
        sentiment: "Positive",
        summary: "NABIL Bank's quarterly results exceed market expectations with robust loan growth and improved margins.",
    },
    {
        title: "Banking Sector Faces Regulatory Changes in New Policy",
        source: "The Himalayan Times",
        time: "4 hours ago",
        sentiment: "Neutral",
        summary: "New banking regulations may impact profitability but ensure long-term stability.",
    },
    {
        title: "Market Volatility Concerns Rise Amid Global Uncertainty",
        source: "Kathmandu Post",
        time: "6 hours ago",
        sentiment: "Negative",
        summary: "Global economic concerns are creating uncertainty in the NEPSE market.",
    },
    {
        title: "NABIL Announces Digital Banking Expansion Plans",
        source: "Business 360",
        time: "1 day ago",
        sentiment: "Positive",
        summary: "Bank's digital transformation initiative expected to boost customer acquisition.",
    },
    {
        title: "Interest Rate Trends Show Stabilization Signs",
        source: "Nepal Economic Journal",
        time: "1 day ago",
        sentiment: "Neutral",
        summary: "Banking sector interest rates showing signs of stabilization after recent volatility.",
    },
]

export function NewsHeadlines() {
    const getSentimentColor = (sentiment: string) => {
        switch (sentiment.toLowerCase()) {
            case "positive":
                return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
            case "negative":
                return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
            default:
                return "bg-muted text-muted-foreground"
        }
    }

    return (
        <Card className="border-border bg-card">
            <CardHeader>
                <CardTitle className="text-card-foreground">Latest News & Analysis</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {newsHeadlines.map((news, index) => (
                        <div key={index} className="border-b border-border last:border-b-0 pb-4 last:pb-0">
                            <div className="flex items-start justify-between mb-2">
                                <Badge className={getSentimentColor(news.sentiment)}>{news.sentiment}</Badge>
                                <div className="flex items-center text-xs text-muted-foreground">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {news.time}
                                </div>
                            </div>

                            <h4 className="font-semibold text-card-foreground mb-1 leading-tight">{news.title}</h4>

                            <p className="text-sm text-muted-foreground mb-2">{news.summary}</p>

                            <div className="flex items-center justify-between">
                                <span className="text-xs text-muted-foreground">{news.source}</span>
                                <button className="text-xs text-primary hover:text-primary/80 flex items-center">
                                    Read more <ExternalLink className="w-3 h-3 ml-1" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
