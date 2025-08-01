import { z } from "zod"
import { portfolioSchema } from "./validators/portfolio-validator"
import { transactionSchema } from "./validators/transaction-validator"

// Base types from schemas
export type PortfolioFormValues = z.infer<typeof portfolioSchema>
export type TransactionFormValues = z.infer<typeof transactionSchema>

// Enriched types for application state and API responses

export interface Stock {
  id: number
  symbol: string
  name: string
  last_price: number
}

export interface Transaction {
  id: number
  portfolio: number
  stock_symbol: string
  stock_details: Stock
  transaction_type: "buy" | "sell"
  quantity: number
  price: number
  transaction_date: string
  total_cost: number
}

export interface Holding {
  id: number
  stock: Stock
  quantity: number
  average_buy_price: number
  total_cost: number
  current_value: number
  unrealized_gain_loss: number
  unrealized_gain_loss_percent: number
}

export interface Portfolio {
  id: number
  name: string
  type: "personal" | "family" | "joint"
  members?: string[]
  holdings: Holding[]
  total_value: number
  total_investment: number
  total_unrealized_gain_loss: number
  total_unrealized_gain_loss_percent: number
  realized_gain_loss: number
}

export interface PortfolioPerformance {
  date: string
  value: number
}

export interface PortfolioDetails extends Portfolio {
  transactions: Transaction[]
  performance_history: PortfolioPerformance[]
}
