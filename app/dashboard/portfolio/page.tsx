"use client"

import { PortfolioOverview } from "@/components/portfolio/portfolio-overview"
import { PortfolioSelector } from "@/components/portfolio/portfolio-selector"
import { HoldingsTable } from "@/components/portfolio/holdings-table"
import { TransactionHistory } from "@/components/portfolio/transaction-history"
import { AddTransactionModal } from "@/components/portfolio/add-transaction-modal"
import { ImportExportActions } from "@/components/portfolio/import-export-actions"
import { CreatePortfolioModal } from "@/components/portfolio/create-portfolio-modal"
import { useState } from "react"

export default function PortfolioPage() {
  const [selectedPortfolio, setSelectedPortfolio] = useState("personal")
  const [showAddTransaction, setShowAddTransaction] = useState(false)
  const [showCreatePortfolio, setShowCreatePortfolio] = useState(false)
  const [activeTab, setActiveTab] = useState("holdings")

  return (
    <div className="w-full max-w-none space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Portfolio Management</h2>
          <p className="text-gray-600">Track your investments and manage multiple portfolios</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ImportExportActions />
        </div>
      </div>

      {/* Portfolio Selector */}
      <PortfolioSelector
        selectedPortfolio={selectedPortfolio}
        onPortfolioChange={setSelectedPortfolio}
        onCreateNew={() => setShowCreatePortfolio(true)}
      />

      {/* Portfolio Overview */}
      <PortfolioOverview portfolioId={selectedPortfolio} />

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("holdings")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "holdings"
                ? "border-green-500 text-green-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Holdings
          </button>
          <button
            onClick={() => setActiveTab("transactions")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "transactions"
                ? "border-green-500 text-green-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Transactions
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "holdings" && (
        <HoldingsTable portfolioId={selectedPortfolio} onAddTransaction={() => setShowAddTransaction(true)} />
      )}

      {activeTab === "transactions" && (
        <TransactionHistory portfolioId={selectedPortfolio} onAddTransaction={() => setShowAddTransaction(true)} />
      )}

      {/* Modals */}
      <AddTransactionModal
        isOpen={showAddTransaction}
        onClose={() => setShowAddTransaction(false)}
        portfolioId={selectedPortfolio}
      />

      <CreatePortfolioModal
        isOpen={showCreatePortfolio}
        onClose={() => setShowCreatePortfolio(false)}
        onPortfolioCreated={setSelectedPortfolio}
      />
    </div>
  )
}
