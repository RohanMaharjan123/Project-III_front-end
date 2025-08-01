"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Search, Download } from "lucide-react"
import { useState } from "react"

interface Transaction {
  id: string
  date: string
  type: "BUY" | "SELL"
  symbol: string
  name: string
  quantity: number
  price: number
  totalAmount: number
  fees: number
  netAmount: number
}

const transactions: Transaction[] = [
  {
    id: "TXN001",
    date: "2024-12-15",
    type: "BUY",
    symbol: "NABIL",
    name: "Nabil Bank Limited",
    quantity: 25,
    price: 1200,
    totalAmount: 30000,
    fees: 150,
    netAmount: 30150,
  },
  {
    id: "TXN002",
    date: "2024-12-10",
    type: "SELL",
    symbol: "SHL",
    name: "Shivam Cements Ltd",
    quantity: 50,
    price: 440,
    totalAmount: 22000,
    fees: 110,
    netAmount: 21890,
  },
  {
    id: "TXN003",
    date: "2024-12-05",
    type: "BUY",
    symbol: "UPPER",
    name: "Upper Tamakoshi Hydropower",
    quantity: 25,
    price: 780,
    totalAmount: 19500,
    fees: 97.5,
    netAmount: 19597.5,
  },
  {
    id: "TXN004",
    date: "2024-11-28",
    type: "BUY",
    symbol: "LICN",
    name: "Life Insurance Nepal",
    quantity: 30,
    price: 920,
    totalAmount: 27600,
    fees: 138,
    netAmount: 27738,
  },
]

interface TransactionHistoryProps {
  portfolioId: string
  onAddTransaction: () => void
}

export function TransactionHistory({ portfolioId, onAddTransaction }: TransactionHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("ALL")

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "ALL" || transaction.type === filterType
    return matchesSearch && matchesFilter
  })

  const getTypeColor = (type: string) => {
    return type === "BUY" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle>Transaction History</CardTitle>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button onClick={onAddTransaction} className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Transaction
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by stock symbol or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterType === "ALL" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType("ALL")}
            >
              All
            </Button>
            <Button
              variant={filterType === "BUY" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType("BUY")}
            >
              Buy
            </Button>
            <Button
              variant={filterType === "SELL" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType("SELL")}
            >
              Sell
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Mobile View */}
        <div className="md:hidden space-y-4">
          {filteredTransactions.map((transaction) => (
            <div key={transaction.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={getTypeColor(transaction.type)} variant="secondary">
                      {transaction.type}
                    </Badge>
                    <span className="text-sm text-gray-500">{transaction.date}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">{transaction.symbol}</h3>
                  <p className="text-sm text-gray-600">{transaction.name}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Quantity</p>
                  <p className="font-semibold">{transaction.quantity}</p>
                </div>
                <div>
                  <p className="text-gray-600">Price</p>
                  <p className="font-semibold">Rs. {transaction.price.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Total Amount</p>
                  <p className="font-semibold">Rs. {transaction.totalAmount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Net Amount</p>
                  <p className="font-semibold">Rs. {transaction.netAmount.toLocaleString()}</p>
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
                <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Stock</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">Quantity</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">Price</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">Total Amount</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">Fees</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">Net Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 text-gray-900">{transaction.date}</td>
                  <td className="py-4 px-4">
                    <Badge className={getTypeColor(transaction.type)} variant="secondary">
                      {transaction.type}
                    </Badge>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-semibold text-gray-900">{transaction.symbol}</p>
                      <p className="text-sm text-gray-600">{transaction.name}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right font-medium">{transaction.quantity}</td>
                  <td className="py-4 px-4 text-right">Rs. {transaction.price.toLocaleString()}</td>
                  <td className="py-4 px-4 text-right">Rs. {transaction.totalAmount.toLocaleString()}</td>
                  <td className="py-4 px-4 text-right">Rs. {transaction.fees.toLocaleString()}</td>
                  <td className="py-4 px-4 text-right font-semibold">Rs. {transaction.netAmount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No transactions found matching your criteria.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
