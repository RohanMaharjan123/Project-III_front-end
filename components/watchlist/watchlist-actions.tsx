"use client"

import { Button } from "@/components/ui/button"
import { Grid, List, Plus, Download, Upload } from "lucide-react"

interface WatchlistActionsProps {
    viewMode: "grid" | "table"
    onViewModeChange: (mode: "grid" | "table") => void
    onCreateWatchlist: () => void
    onAddStock: () => void
}

export function WatchlistActions({ viewMode, onViewModeChange, onCreateWatchlist, onAddStock }: WatchlistActionsProps) {
    return (
        <div className="flex flex-wrap gap-2">
            {/* View Mode Toggle */}
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <Button
                    variant={viewMode === "table" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => onViewModeChange("table")}
                    className="rounded-none border-0"
                >
                    <List className="w-4 h-4" />
                </Button>
                <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => onViewModeChange("grid")}
                    className="rounded-none border-0"
                >
                    <Grid className="w-4 h-4" />
                </Button>
            </div>

            {/* Action Buttons */}
            <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
            </Button>

            <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Import
            </Button>

            <Button variant="outline" size="sm" onClick={onCreateWatchlist}>
                <Plus className="w-4 h-4 mr-2" />
                New List
            </Button>

            <Button onClick={onAddStock} className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Stock
            </Button>
        </div>
    )
}
