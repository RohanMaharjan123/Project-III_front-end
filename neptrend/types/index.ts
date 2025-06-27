import type React from "react"
export interface MarketData {
  name: string
  value: string
  change: string
  percent: string
  positive: boolean
}

export interface Stock {
  symbol: string
  name: string
  price: string
  change: string
  percent: string
  positive: boolean
}

export interface Feature {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}

export interface AuthCardProps {
  children: React.ReactNode
}
