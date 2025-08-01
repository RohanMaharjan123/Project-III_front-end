"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Users, User, TrendingUp } from "lucide-react"

interface Portfolio {
  id: string
  name: string
  type: "personal" | "family" | "joint"
  members?: string[]
  totalValue: string
  totalGainLoss: string
  gainLossPercent: string
  isPositive: boolean
}

const portfolios: Portfolio[] = [
  {
    id: "personal",
    name: "Personal Portfolio",
    type: "personal",
    totalValue: "Rs. 2,45,000",
    totalGainLoss: "+Rs. 15,000",
    gainLossPercent: "+6.52%",
    isPositive: true,
  },
  {
    id: "family",
    name: "Family Portfolio",
    type: "family",
    members: ["Rohan", "Sita", "Ram"],
    totalValue: "Rs. 8,75,000",
    totalGainLoss: "+Rs. 45,000",
    gainLossPercent: "+5.43%",
    isPositive: true,
  },
  {
    id: "joint",
    name: "Joint Investment",
    type: "joint",
    members: ["Rohan", "Sita"],
    totalValue: "Rs. 1,25,000",
    totalGainLoss: "-Rs. 5,000",
    gainLossPercent: "-3.85%",
    isPositive: false,
  },
]

interface PortfolioSelectorProps {
  selectedPortfolio: string
  onPortfolioChange: (portfolioId: string) => void
  onCreateNew: () => void
}

export function PortfolioSelector({ selectedPortfolio, onPortfolioChange, onCreateNew }: PortfolioSelectorProps) {
  const getPortfolioIcon = (type: string) => {
    switch (type) {
      case "family":
        return <Users className="w-4 h-4" />
      case "joint":
        return <Users className="w-4 h-4" />
      default:
        return <User className="w-4 h-4" />
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {portfolios.map((portfolio) => (
        <Card
          key={portfolio.id}
          className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
            selectedPortfolio === portfolio.id
              ? "ring-2 ring-green-500 border-green-200"
              : "border-gray-200 hover:border-gray-300"
          }`}
          onClick={() => onPortfolioChange(portfolio.id)}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                {getPortfolioIcon(portfolio.type)}
                <Badge variant="outline" className="text-xs">
                  {portfolio.type}
                </Badge>
              </div>
              <TrendingUp className={`w-4 h-4 ${portfolio.isPositive ? "text-green-600" : "text-red-600"}`} />
            </div>

            <h3 className="font-semibold text-gray-900 mb-1">{portfolio.name}</h3>

            {portfolio.members && <p className="text-xs text-gray-500 mb-2">Members: {portfolio.members.join(", ")}</p>}

            <div className="space-y-1">
              <p className="text-lg font-bold text-gray-900">{portfolio.totalValue}</p>
              <div className={`text-sm ${portfolio.isPositive ? "text-green-600" : "text-red-600"}`}>
                <span>{portfolio.totalGainLoss}</span>
                <span className="ml-1">({portfolio.gainLossPercent})</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Create New Portfolio Card */}
      <Card
        className="cursor-pointer border-2 border-dashed border-gray-300 hover:border-green-400 transition-colors duration-200"
        onClick={onCreateNew}
      >
        <CardContent className="p-4 flex flex-col items-center justify-center h-full min-h-[140px]">
          <Plus className="w-8 h-8 text-gray-400 mb-2" />
          <p className="text-sm font-medium text-gray-600">Create New Portfolio</p>
          <p className="text-xs text-gray-500 text-center mt-1">Add personal, family, or joint portfolio</p>
        </CardContent>
      </Card>
    </div>
  )
}
