
"use client"

import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Holding } from "@/types/portfolio"
import { formatCurrency, formatPercentage } from "@/lib/utils"

interface HoldingsTableProps {
  holdings: Holding[]
  onAddTransaction: () => void
}

export function HoldingsTable({ holdings = [], onAddTransaction }: HoldingsTableProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Your Holdings</h3>
        <Button onClick={onAddTransaction}>Add Transaction</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Symbol</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Avg. Price</TableHead>
            <TableHead>Last Traded Price</TableHead>
            <TableHead>Total Cost</TableHead>
            <TableHead>Current Value</TableHead>
            <TableHead>Unrealized P/L</TableHead>
            <TableHead>P/L %</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {holdings.map((holding) => (
            <TableRow key={holding.id}>
              <TableCell>{holding.stock.symbol}</TableCell>
              <TableCell>{holding.quantity}</TableCell>
              <TableCell>{formatCurrency(holding.average_buy_price)}</TableCell>
              <TableCell>{formatCurrency(holding.stock.last_price)}</TableCell>
              <TableCell>{formatCurrency(holding.total_cost)}</TableCell>
              <TableCell>{formatCurrency(holding.current_value)}</TableCell>
              <TableCell
                className={holding.unrealized_gain_loss >= 0 ? "text-green-600" : "text-red-600"}
              >
                {formatCurrency(holding.unrealized_gain_loss)}
              </TableCell>
              <TableCell
                className={holding.unrealized_gain_loss_percent >= 0 ? "text-green-600" : "text-red-600"}
              >
                {formatPercentage(holding.unrealized_gain_loss_percent)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
