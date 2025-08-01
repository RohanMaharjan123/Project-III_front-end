"use client"

import { WatchlistOverview } from "@/components/watchlist/watchlist-overview"
import { WatchlistGroups } from "@/components/watchlist/watchlist-groups"
import { WatchlistTable } from "@/components/watchlist/watchlist-table"
import { CreateWatchlistModal } from "@/components/watchlist/create-watchlist-modal"
import { AddStockModal } from "@/components/watchlist/add-stock-modal"
import { QuickAddBar } from "@/components/watchlist/quick-add-bar"
import { WatchlistActions } from "@/components/watchlist/watchlist-actions"
import { useState } from "react"

export default function WatchlistPage() {
  const [selectedWatchlist, setSelectedWatchlist] = useState("main")
  const [showCreateWatchlist, setShowCreateWatchlist] = useState(false)
  const [showAddStock, setShowAddStock] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "table">("table")

  return (
    <div className="w-full max-w-none space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Watchlist Management</h2>
          <p className="text-gray-600">Track and organize your favorite stocks</p>
        </div>
        <WatchlistActions
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onCreateWatchlist={() => setShowCreateWatchlist(true)}
          onAddStock={() => setShowAddStock(true)}
        />
      </div>

      {/* Quick Add Bar */}
      <QuickAddBar selectedWatchlist={selectedWatchlist} />

      {/* Watchlist Overview */}
      <WatchlistOverview />

      {/* Watchlist Groups */}
      <WatchlistGroups
        selectedWatchlist={selectedWatchlist}
        onWatchlistChange={setSelectedWatchlist}
        onCreateNew={() => setShowCreateWatchlist(true)}
      />

      {/* Watchlist Content */}
      <WatchlistTable watchlistId={selectedWatchlist} viewMode={viewMode} onAddStock={() => setShowAddStock(true)} />

      {/* Modals */}
      <CreateWatchlistModal
        isOpen={showCreateWatchlist}
        onClose={() => setShowCreateWatchlist(false)}
        onWatchlistCreated={setSelectedWatchlist}
      />

      <AddStockModal isOpen={showAddStock} onClose={() => setShowAddStock(false)} watchlistId={selectedWatchlist} />
    </div>
  )
}
