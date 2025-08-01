"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, TrendingUp, TrendingDown, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Holding {
  symbol: string
  name: string
  sector: string
  quantity: number
  avgPrice: number
  currentPrice: number
  totalValue: number
  gainLoss: number
  gainLossPercent: number
  isPositive: boolean
}

const holdings: Holding[] = [
{
    symbol: "NABIL",
    name: "Nabil Bank Limited",
    sector: "Banking",
    quantity: 50,
    avgPrice: 800,
    currentPrice: 511.17,
    totalValue: 25558.5,
    gainLoss: -14441.5,
    gainLossPercent: -36.10,
    isPositive: false
},
{
    symbol: "SHL",
    name: "Shivam Cements Ltd",
    sector: "Manufacturing",
    quantity: 100,
    avgPrice: 450,
    currentPrice: 523.76,
    totalValue: 52376,
    gainLoss: 7376,
    gainLossPercent: 16.39,
    isPositive: true,
},
  {
    symbol: "UPPER",
    name: "Upper Tamakoshi Hydropower",
    sector: "Hydropower",
    quantity: 2500,
    avgPrice: 780,
    currentPrice: 196.95,
    totalValue: 492375,
    gainLoss: -1457625,
    gainLossPercent: -74.77,
    isPositive: false,
},
  {
    symbol: "LICN",
    name: "Life Insurance Nepal",
    sector: "Insurance",
    quantity: 300,
    avgPrice: 1850,
    currentPrice: 903,
    totalValue: 270900,
    gainLoss: -284100,
    gainLossPercent: -51.22,
    isPositive: false,
},
]

interface HoldingsTableProps {
  portfolioId: string
  onAddTransaction: () => void
}

export function HoldingsTable({ portfolioId, onAddTransaction }: HoldingsTableProps) {
  const getSectorColor = (sector: string) => {
    const colors = {
      Banking: "bg-blue-100 text-blue-800",
      Manufacturing: "bg-purple-100 text-purple-800",
      Hydropower: "bg-green-100 text-green-800",
      Insurance: "bg-orange-100 text-orange-800",
      Finance: "bg-yellow-100 text-yellow-800",
    }
    return colors[sector as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Current Holdings</CardTitle>
          <Button onClick={onAddTransaction} className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Transaction
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Mobile View */}
        <div className="md:hidden space-y-4">
          {holdings.map((holding, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{holding.symbol}</h3>
                  <p className="text-sm text-gray-600">{holding.name}</p>
                  <Badge className={`${getSectorColor(holding.sector)} mt-1`} variant="secondary">
                    {holding.sector}
                  </Badge>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Buy More</DropdownMenuItem>
                    <DropdownMenuItem>Sell</DropdownMenuItem>
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Quantity</p>
                  <p className="font-semibold">{holding.quantity}</p>
                </div>
                <div>
                  <p className="text-gray-600">Avg Price</p>
                  <p className="font-semibold">Rs. {holding.avgPrice.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Current Price</p>
                  <p className="font-semibold">Rs. {holding.currentPrice.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Total Value</p>
                  <p className="font-semibold">Rs. {holding.totalValue.toLocaleString()}</p>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className={`flex items-center ${holding.isPositive ? "text-green-600" : "text-red-600"}`}>
                  {holding.isPositive ? (
                    <TrendingUp className="w-4 h-4 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-1" />
                  )}
                  <span className="font-semibold">
                    Rs. {Math.abs(holding.gainLoss).toLocaleString()} ({Math.abs(holding.gainLossPercent).toFixed(2)}%)
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Stock</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Sector</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">Quantity</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">Avg Price</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">Current Price</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">Total Value</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">Gain/Loss</th>
                <th className="text-center py-3 px-4 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((holding, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-semibold text-gray-900">{holding.symbol}</p>
                      <p className="text-sm text-gray-600">{holding.name}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <Badge className={getSectorColor(holding.sector)} variant="secondary">
                      {holding.sector}
                    </Badge>
                  </td>
                  <td className="py-4 px-4 text-right font-medium">{holding.quantity}</td>
                  <td className="py-4 px-4 text-right">Rs. {holding.avgPrice.toLocaleString()}</td>
                  <td className="py-4 px-4 text-right">Rs. {holding.currentPrice.toLocaleString()}</td>
                  <td className="py-4 px-4 text-right font-semibold">Rs. {holding.totalValue.toLocaleString()}</td>
                  <td className="py-4 px-4 text-right">
                    <div
                      className={`flex items-center justify-end ${holding.isPositive ? "text-green-600" : "text-red-600"}`}
                    >
                      {holding.isPositive ? (
                        <TrendingUp className="w-4 h-4 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 mr-1" />
                      )}
                      <div>
                        <p className="font-semibold">Rs. {Math.abs(holding.gainLoss).toLocaleString()}</p>
                        <p className="text-sm">({Math.abs(holding.gainLossPercent).toFixed(2)}%)</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>Buy More</DropdownMenuItem>
                        <DropdownMenuItem>Sell</DropdownMenuItem>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
