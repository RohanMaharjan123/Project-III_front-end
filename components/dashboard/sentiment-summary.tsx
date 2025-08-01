import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

const sentimentData = {
    overall: "Positive",
    score: 72,
    breakdown: {
        positive: 45,
        neutral: 32,
        negative: 23,
    },
    sources: {
        news: "Positive",
        social: "Neutral",
        analyst: "Positive",
    },
}

export function SentimentSummary() {
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

    const getSentimentIcon = (sentiment: string) => {
        switch (sentiment.toLowerCase()) {
            case "positive":
                return <TrendingUp className="w-4 h-4" />
            case "negative":
                return <TrendingDown className="w-4 h-4" />
            default:
                return <Minus className="w-4 h-4" />
        }
    }

    return (
        <Card className="border-border bg-card">
            <CardHeader>
                <CardTitle className="flex items-center justify-between text-card-foreground">
                    Sentiment Analysis - NABIL
                    <Badge className={getSentimentColor(sentimentData.overall)}>
                        {getSentimentIcon(sentimentData.overall)}
                        <span className="ml-1">{sentimentData.overall}</span>
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Overall Sentiment Score */}
                    <div className="space-y-4">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">{sentimentData.score}</div>
                            <p className="text-sm text-muted-foreground">Overall Sentiment Score</p>
                            <div className="w-full bg-muted rounded-full h-2 mt-3">
                                <div
                                    className="bg-green-600 dark:bg-green-400 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${sentimentData.score}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Sentiment Breakdown */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Positive</span>
                                <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                                    {sentimentData.breakdown.positive}%
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Neutral</span>
                                <span className="text-sm font-semibold text-muted-foreground">{sentimentData.breakdown.neutral}%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Negative</span>
                                <span className="text-sm font-semibold text-red-600 dark:text-red-400">
                                    {sentimentData.breakdown.negative}%
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Sentiment by Source */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-card-foreground">Sentiment by Source</h4>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">News Articles</span>
                                <Badge className={getSentimentColor(sentimentData.sources.news)}>
                                    {getSentimentIcon(sentimentData.sources.news)}
                                    <span className="ml-1">{sentimentData.sources.news}</span>
                                </Badge>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Social Media</span>
                                <Badge className={getSentimentColor(sentimentData.sources.social)}>
                                    {getSentimentIcon(sentimentData.sources.social)}
                                    <span className="ml-1">{sentimentData.sources.social}</span>
                                </Badge>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Analyst Reports</span>
                                <Badge className={getSentimentColor(sentimentData.sources.analyst)}>
                                    {getSentimentIcon(sentimentData.sources.analyst)}
                                    <span className="ml-1">{sentimentData.sources.analyst}</span>
                                </Badge>
                            </div>
                        </div>

                        {/* Recent Sentiment Trend */}
                        <div className="mt-6">
                            <h5 className="text-sm font-semibold text-card-foreground mb-2">7-Day Trend</h5>
                            <div className="flex items-center space-x-1">
                                {[65, 68, 70, 69, 72, 74, 72].map((score, i) => (
                                    <div key={i} className="flex-1">
                                        <div
                                            className="bg-green-200 dark:bg-green-800 rounded-sm"
                                            style={{ height: `${score / 2}px` }}
                                            title={`Day ${i + 1}: ${score}`}
                                        ></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
