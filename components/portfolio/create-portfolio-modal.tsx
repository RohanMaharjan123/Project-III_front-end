"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"
import { useState } from "react"

interface CreatePortfolioModalProps {
  isOpen: boolean
  onClose: () => void
  onPortfolioCreated: (portfolioId: string) => void
}

export function CreatePortfolioModal({ isOpen, onClose, onPortfolioCreated }: CreatePortfolioModalProps) {
  const [portfolioName, setPortfolioName] = useState("")
  const [portfolioType, setPortfolioType] = useState("personal")
  const [members, setMembers] = useState<string[]>([])
  const [newMember, setNewMember] = useState("")

  const handleAddMember = () => {
    if (newMember.trim() && !members.includes(newMember.trim())) {
      setMembers([...members, newMember.trim()])
      setNewMember("")
    }
  }

  const handleRemoveMember = (memberToRemove: string) => {
    setMembers(members.filter((member) => member !== memberToRemove))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Create new portfolio
    const newPortfolioId = `portfolio_${Date.now()}`
    console.log({
      id: newPortfolioId,
      name: portfolioName,
      type: portfolioType,
      members: portfolioType !== "personal" ? members : undefined,
    })

    onPortfolioCreated(newPortfolioId)
    onClose()

    // Reset form
    setPortfolioName("")
    setPortfolioType("personal")
    setMembers([])
    setNewMember("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Portfolio</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Portfolio Name */}
          <div className="space-y-2">
            <Label htmlFor="portfolioName">Portfolio Name</Label>
            <Input
              id="portfolioName"
              placeholder="Enter portfolio name"
              value={portfolioName}
              onChange={(e) => setPortfolioName(e.target.value)}
              required
            />
          </div>

          {/* Portfolio Type */}
          <div className="space-y-2">
            <Label>Portfolio Type</Label>
            <Select value={portfolioType} onValueChange={setPortfolioType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="personal">Personal Portfolio</SelectItem>
                <SelectItem value="family">Family Portfolio</SelectItem>
                <SelectItem value="joint">Joint Investment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Members (for family/joint portfolios) */}
          {portfolioType !== "personal" && (
            <div className="space-y-3">
              <Label>Portfolio Members</Label>

              {/* Add Member Input */}
              <div className="flex gap-2">
                <Input
                  placeholder="Enter member name"
                  value={newMember}
                  onChange={(e) => setNewMember(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddMember())}
                />
                <Button type="button" onClick={handleAddMember} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {/* Members List */}
              {members.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Members:</p>
                  <div className="flex flex-wrap gap-2">
                    {members.map((member, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {member}
                        <button
                          type="button"
                          onClick={() => handleRemoveMember(member)}
                          className="ml-1 hover:text-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {portfolioType !== "personal" && members.length === 0 && (
                <p className="text-sm text-amber-600">Please add at least one member for {portfolioType} portfolio.</p>
              )}
            </div>
          )}

          {/* Portfolio Description */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Portfolio Types:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>
                <strong>Personal:</strong> Individual investment tracking
              </li>
              <li>
                <strong>Family:</strong> Shared family investments with multiple members
              </li>
              <li>
                <strong>Joint:</strong> Joint investment account between specific members
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700"
              disabled={!portfolioName.trim() || (portfolioType !== "personal" && members.length === 0)}
            >
              Create Portfolio
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
