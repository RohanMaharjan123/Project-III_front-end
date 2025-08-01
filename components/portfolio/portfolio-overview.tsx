"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Portfolio } from "@/types/portfolio.d.ts"
import { formatCurrency } from "@/lib/utils"

interface PortfolioOverviewProps {
  portfolio: Portfolio | null
}

export function PortfolioOverview({ portfolio }: PortfolioOverviewProps) {
  if (!portfolio) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Select a portfolio to see its overview.</p>
        </CardContent>
      </Card>
    )
  }

  const { total_value, total_investment, total_unrealized_gain_loss, realized_gain_loss } = portfolio
  const isPositive = total_unrealized_gain_loss >= 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>{portfolio.name} - Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-sm text-muted-foreground">Total Value</p>
            <p className="text-2xl font-bold">{formatCurrency(total_value)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Investment</p>
            <p className="text-2xl font-bold">{formatCurrency(total_investment)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Unrealized P/L</p>
            <p className={`text-2xl font-bold ${isPositive ? "text-green-600" : "text-red-600"}`}>
              {formatCurrency(total_unrealized_gain_loss)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Realized P/L</p>
            <p className="text-2xl font-bold">{formatCurrency(realized_gain_loss)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}