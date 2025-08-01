"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Search, Download } from "lucide-react"
import { useState } from "react"

import type { Transaction } from "@/types/portfolio"
import { TransactionFormModal } from "./transaction-form-modal"
import { TransactionFormValues } from "@/lib/validators/transaction-validator"
import { Pencil, Trash2 } from "lucide-react"

interface TransactionHistoryProps {
  transactions: Transaction[];
  portfolioId: number; // Add portfolioId prop
  onAddTransaction: (data: TransactionFormValues) => void;
  onEditTransaction: (data: TransactionFormValues, transactionId: number) => void;
  onDeleteTransaction: (transactionId: number) => void;
}

export function TransactionHistory({ transactions = [], portfolioId, onAddTransaction, onEditTransaction, onDeleteTransaction }: TransactionHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("ALL")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<TransactionFormValues & { id?: number } | undefined>(undefined)

  const handleAddClick = () => {
    setEditingTransaction(undefined)
    setIsModalOpen(true)
  }

  const handleEditClick = (transaction: Transaction) => {
    setEditingTransaction({
      id: transaction.id,
      portfolio: portfolioId,
      stock_symbol: transaction.stock_details.symbol,
      transaction_type: transaction.transaction_type.toLowerCase() as "buy" | "sell",
      quantity: transaction.quantity,
      price: transaction.price,
      transaction_date: transaction.transaction_date,
    })
    setIsModalOpen(true)
  }

  const handleFormSubmit = (data: TransactionFormValues, transactionId?: number) => {
    if (transactionId) {
      onEditTransaction(data, transactionId)
    } else {
      onAddTransaction(data)
    }
    setIsModalOpen(false)
  }

  const handleDeleteClick = (transactionId: number) => {
    onDeleteTransaction(transactionId)
  }


  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.stock_details.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.stock_details.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "ALL" || transaction.transaction_type.toUpperCase() === filterType
    return matchesSearch && matchesFilter
  })

  const getTypeColor = (type: string) => {
    return type.toUpperCase() === "BUY" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
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
            <Button onClick={handleAddClick} className="bg-green-600 hover:bg-green-700">
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
                    <Badge className={getTypeColor(transaction.transaction_type)} variant="secondary">
                      {transaction.transaction_type.toUpperCase()}
                    </Badge>
                    <span className="text-sm text-gray-500">{transaction.transaction_date}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">{transaction.stock_details.symbol}</h3>
                  <p className="text-sm text-gray-600">{transaction.stock_details.name}</p>
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
                  <p className="font-semibold">Rs. {transaction.total_cost.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Net Amount</p>
                  <p className="font-semibold">Rs. {transaction.total_cost.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" size="sm" onClick={() => handleEditClick(transaction)}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDeleteClick(transaction.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
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
                <th className="text-right py-3 px-4 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 text-gray-900">{transaction.transaction_date}</td>
                  <td className="py-4 px-4">
                    <Badge className={getTypeColor(transaction.transaction_type)} variant="secondary">
                      {transaction.transaction_type.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-semibold text-gray-900">{transaction.stock_details.symbol}</p>
                      <p className="text-sm text-gray-600">{transaction.stock_details.name}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right font-medium">{transaction.quantity}</td>
                  <td className="py-4 px-4 text-right">Rs. {transaction.price.toLocaleString()}</td>
                  <td className="py-4 px-4 text-right">Rs. {transaction.total_cost.toLocaleString()}</td>
                  <td className="py-4 px-4 text-right">Rs. {transaction.fees.toLocaleString()}</td>
                  <td className="py-4 px-4 text-right font-semibold">Rs. {transaction.net_amount.toLocaleString()}</td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditClick(transaction)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteClick(transaction.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
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

      <TransactionFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        portfolioId={portfolioId}
        initialData={editingTransaction}
      />
    </Card>
  )
}
