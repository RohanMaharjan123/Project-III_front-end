"use client"

import React, { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { PortfolioSelector } from "@/components/portfolio/portfolio-selector"
import { PortfolioOverview } from "@/components/portfolio/portfolio-overview"
import { HoldingsTable } from "@/components/portfolio/holdings-table"
import { TransactionHistory } from "@/components/portfolio/transaction-history"
import { EditPortfolioModal } from "@/components/portfolio/edit-portfolio-modal"
import { TransactionFormModal } from "@/components/portfolio/transaction-form-modal"
import { ConfirmationDialog } from "@/components/portfolio/alert-dialog"
import api from "@/lib/axios"
import type { Portfolio, PortfolioDetails, TransactionFormValues } from "@/types/portfolio"

export default function PortfolioPage() {
  const [portfolios, setPortfolios] = useState<PortfolioDetails[]>([])
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingPortfolio, setEditingPortfolio] = useState<Portfolio | null>(null)

  const [isTxModalOpen, setIsTxModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deletingPortfolioId, setDeletingPortfolioId] = useState<number | null>(null)

  const [activeTab, setActiveTab] = useState("holdings")

  const fetchPortfolios = useCallback(async () => {
    try {
      setLoading(true)
      const response = await api.get("/portfolio/portfolios/")
      const fetchedPortfolios = response.data.results || response.data
      setPortfolios(fetchedPortfolios)
      
      if (fetchedPortfolios.length > 0 && !selectedPortfolioId) {
        setSelectedPortfolioId(fetchedPortfolios[0].id)
      }
    } catch (error) {
      console.error("Failed to fetch portfolios:", error)
    } finally {
      setLoading(false)
    }
  }, [selectedPortfolioId])

  useEffect(() => {
    fetchPortfolios()
  }, [fetchPortfolios])

  const handlePortfolioSave = (updatedPortfolio: PortfolioDetails) => {
    const index = portfolios.findIndex((p) => p.id === updatedPortfolio.id)
    if (index !== -1) {
      setPortfolios((prev) => {
        const newPortfolios = [...prev]
        newPortfolios[index] = { ...updatedPortfolio, transactions: newPortfolios[index].transactions || [], performance_history: newPortfolios[index].performance_history || [] }
        return newPortfolios
      })
    } else {
      setPortfolios((prev) => [...prev, updatedPortfolio])
    }
    setSelectedPortfolioId(updatedPortfolio.id)
    fetchPortfolios() // Refetch to get the latest computed values
  }

  const handleTransactionSubmit = async (data: TransactionFormValues, transactionId?: number) => {
    try {
      if (transactionId) {
        await api.put(`/portfolio/transactions/${transactionId}/`, data)
      } else {
        await api.post("/portfolio/transactions/", data)
      }
      fetchPortfolios() // Refetch portfolios to update holdings
    } catch (error) {
      console.error("Failed to save transaction:", error)
    }
  }

  const handleDeleteTransaction = async (transactionId: number) => {
    try {
      await api.delete(`/portfolio/transactions/${transactionId}/`)
      fetchPortfolios() // Refetch portfolios to update holdings
    } catch (error) {
      console.error("Failed to delete transaction:", error)
    }
  }

  const handleDeletePortfolio = async () => {
    if (!deletingPortfolioId) return
    try {
      await api.delete(`/api/portfolio/portfolios/${deletingPortfolioId}/`)
      setPortfolios((prev) => prev.filter((p) => p.id !== deletingPortfolioId))
      if (selectedPortfolioId === deletingPortfolioId) {
        setSelectedPortfolioId(portfolios.length > 1 ? portfolios[0].id : null)
      }
    } catch (error) {
      console.error("Failed to delete portfolio:", error)
    }
  }

  const openCreateModal = () => {
    setEditingPortfolio(null)
    setIsEditModalOpen(true)
  }

  const openEditModal = (portfolioId: number) => {
    const portfolioToEdit = portfolios.find((p) => p.id === portfolioId)
    if (portfolioToEdit) {
      setEditingPortfolio(portfolioToEdit)
      setIsEditModalOpen(true)
    }
  }

  const openDeleteModal = (portfolioId: number) => {
    setDeletingPortfolioId(portfolioId)
    setIsDeleteModalOpen(true)
  }

  const selectedPortfolio = portfolios.find((p) => p.id === selectedPortfolioId) as PortfolioDetails

  if (loading) {
    return <div>Loading portfolios...</div>
  }

  return (
    <div className="w-full max-w-none space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Portfolio Management</h2>
        <Button onClick={openCreateModal}>Create New Portfolio</Button>
      </div>

      {portfolios.length > 0 && selectedPortfolio ? (
        <>
          <PortfolioSelector
            portfolios={portfolios}
            selectedPortfolioId={selectedPortfolio.id}
            onPortfolioChange={setSelectedPortfolioId}
            onEdit={openEditModal}
            onDelete={openDeleteModal}
          />
          <PortfolioOverview portfolio={selectedPortfolio} />

          <div className="border-b">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("holdings")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "holdings"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Holdings
              </button>
              <button
                onClick={() => setActiveTab("transactions")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "transactions"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Transactions
              </button>
            </nav>
          </div>

          {activeTab === "holdings" && (
            <HoldingsTable holdings={selectedPortfolio.holdings} onAddTransaction={() => setIsTxModalOpen(true)} />
          )}
          {activeTab === "transactions" && (
            <TransactionHistory
              transactions={selectedPortfolio.transactions}
              portfolioId={selectedPortfolio.id}
              onAddTransaction={() => setIsTxModalOpen(true)}
              onEditTransaction={(data, transactionId) => handleTransactionSubmit(data, transactionId)}
              onDeleteTransaction={handleDeleteTransaction}
            />
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No portfolios found.</h3>
          <p className="text-muted-foreground">Get started by creating a new portfolio.</p>
        </div>
      )}

      {/* Modals */}
      <EditPortfolioModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onPortfolioUpdated={handlePortfolioSave}
        portfolio={editingPortfolio}
      />

      {selectedPortfolioId && (
        <TransactionFormModal
          isOpen={isTxModalOpen}
          onClose={() => setIsTxModalOpen(false)}
          onSubmit={handleTransactionSubmit}
          portfolioId={selectedPortfolioId}
        />
      )}

      <ConfirmationDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeletePortfolio}
        title="Are you sure?"
        description="This action cannot be undone. This will permanently delete your portfolio and all its data."
      />
    </div>
  )
}
