"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Star, TrendingUp, Zap, Target, Users } from "lucide-react"
import { useState } from "react"

const watchlistTemplates = [
    {
        id: "custom",
        name: "Custom Watchlist",
        description: "Create your own custom watchlist",
        icon: Star,
        color: "bg-blue-100 text-blue-800",
        category: "personal",
    },
    {
        id: "banking",
        name: "Banking Sector",
        description: "Track all banking and financial stocks",
        icon: TrendingUp,
        color: "bg-green-100 text-green-800",
        category: "sector",
        prefilledStocks: ["NABIL", "GBIME", "SANIMA", "NICA"],
    },
    {
        id: "hydropower",
        name: "Hydropower",
        description: "Renewable energy and hydropower companies",
        icon: Zap,
        color: "bg-cyan-100 text-cyan-800",
        category: "sector",
        prefilledStocks: ["UPPER", "CHCL", "HIDCL", "NHPC"],
    },
    {
        id: "dividend",
        name: "High Dividend",
        description: "Dividend-focused investment strategy",
        icon: Target,
        color: "bg-purple-100 text-purple-800",
        category: "strategy",
        prefilledStocks: ["NABIL", "LICN", "UPPER", "SHL"],
    },
    {
        id: "growth",
        name: "Growth Stocks",
        description: "High growth potential companies",
        icon: TrendingUp,
        color: "bg-emerald-100 text-emerald-800",
        category: "strategy",
    },
    {
        id: "family",
        name: "Family Recommendations",
        description: "Stocks recommended by family members",
        icon: Users,
        color: "bg-orange-100 text-orange-800",
        category: "personal",
    },
]

interface CreateWatchlistModalProps {
    isOpen: boolean
    onClose: () => void
    onWatchlistCreated: (watchlistId: string) => void
}

export function CreateWatchlistModal({ isOpen, onClose, onWatchlistCreated }: CreateWatchlistModalProps) {
    const [selectedTemplate, setSelectedTemplate] = useState("custom")
    const [watchlistName, setWatchlistName] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("personal")

    const handleTemplateSelect = (template: (typeof watchlistTemplates)[0]) => {
        setSelectedTemplate(template.id)
        setWatchlistName(template.name)
        setDescription(template.description)
        setCategory(template.category)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const template = watchlistTemplates.find((t) => t.id === selectedTemplate)
        const newWatchlistId = `watchlist_${Date.now()}`

        console.log({
            id: newWatchlistId,
            name: watchlistName,
            description,
            category,
            template: selectedTemplate,
            prefilledStocks: template?.prefilledStocks || [],
        })

        onWatchlistCreated(newWatchlistId)
        onClose()

        // Reset form
        setSelectedTemplate("custom")
        setWatchlistName("")
        setDescription("")
        setCategory("personal")
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create New Watchlist</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Template Selection */}
                    <div className="space-y-3">
                        <Label>Choose a Template</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {watchlistTemplates.map((template) => (
                                <div
                                    key={template.id}
                                    className={`p-3 border rounded-lg cursor-pointer transition-all ${selectedTemplate === template.id
                                            ? "border-green-500 bg-green-50"
                                            : "border-gray-200 hover:border-gray-300"
                                        }`}
                                    onClick={() => handleTemplateSelect(template)}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`p-2 rounded-lg ${template.color}`}>
                                            <template.icon className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-gray-900 text-sm">{template.name}</h4>
                                            <p className="text-xs text-gray-600 mt-1">{template.description}</p>
                                            {template.prefilledStocks && (
                                                <div className="flex flex-wrap gap-1 mt-2">
                                                    {template.prefilledStocks.slice(0, 3).map((stock) => (
                                                        <Badge key={stock} variant="outline" className="text-xs">
                                                            {stock}
                                                        </Badge>
                                                    ))}
                                                    {template.prefilledStocks.length > 3 && (
                                                        <Badge variant="outline" className="text-xs">
                                                            +{template.prefilledStocks.length - 3}
                                                        </Badge>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Watchlist Details */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="watchlistName">Watchlist Name</Label>
                            <Input
                                id="watchlistName"
                                placeholder="Enter watchlist name"
                                value={watchlistName}
                                onChange={(e) => setWatchlistName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Describe the purpose of this watchlist..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={3}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Category</Label>
                            <Select value={category} onValueChange={setCategory}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="personal">Personal</SelectItem>
                                    <SelectItem value="sector">Sector</SelectItem>
                                    <SelectItem value="strategy">Strategy</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Preview */}
                    {selectedTemplate !== "custom" && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-gray-900 mb-2">Template Preview</h4>
                            <div className="text-sm text-gray-600">
                                <p>
                                    This template will create a watchlist focused on{" "}
                                    {watchlistTemplates.find((t) => t.id === selectedTemplate)?.description.toLowerCase()}
                                </p>
                                {watchlistTemplates.find((t) => t.id === selectedTemplate)?.prefilledStocks && (
                                    <p className="mt-2">
                                        <strong>Pre-filled stocks:</strong>{" "}
                                        {watchlistTemplates.find((t) => t.id === selectedTemplate)?.prefilledStocks?.join(", ")}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3">
                        <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                            Cancel
                        </Button>
                        <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700" disabled={!watchlistName.trim()}>
                            Create Watchlist
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
