"use client"

import React, { useEffect, useState } from "react"
import { useForm, useFieldArray, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"
import { portfolioSchema, type PortfolioFormValues } from "@/lib/validators/portfolio-validator"
import type { Portfolio } from "@/types/portfolio.d.ts"
import api from "@/lib/axios"

interface EditPortfolioModalProps {
  isOpen: boolean
  onClose: () => void
  onPortfolioUpdated: (portfolio: PortfolioDetails) => void
  portfolio: Portfolio | null
}

export function EditPortfolioModal({ isOpen, onClose, onPortfolioUpdated, portfolio }: EditPortfolioModalProps) {
  const isEditMode = !!portfolio

  const form = useForm<PortfolioFormValues>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: {
      portfolioName: "",
      portfolioType: "personal",
      members: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "members",
  })

  const portfolioType = form.watch("portfolioType")
  const [newMemberName, setNewMemberName] = useState("")

  useEffect(() => {
    if (portfolio) {
      form.reset({
        portfolioName: portfolio.name,
        portfolioType: portfolio.type,
        members: portfolio.members?.map((name) => ({ name })) || [],
      })
    } else {
      form.reset({ portfolioName: "", portfolioType: "personal", members: [] })
    }
  }, [portfolio, isOpen, form])

  const handleAddMember = () => {
    if (newMemberName.trim()) {
      append({ name: newMemberName.trim() })
      setNewMemberName("")
    }
  }

  const onSubmit = async (data: PortfolioFormValues) => {
    const payload = {
      name: data.portfolioName,
      type: data.portfolioType,
      members: data.portfolioType !== "personal" ? data.members?.map((m) => m.name) : [],
    }

    try {
      let response
      if (isEditMode && portfolio) {
        response = await api.put(`/portfolio/portfolios/${portfolio.id}/`, payload)
      } else {
        response = await api.post("/portfolio/portfolios/", payload)
      }
      onPortfolioUpdated(response.data)
      onClose()
    } catch (error) {
      console.error("Failed to save portfolio:", error)
      // Handle error display to user
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Portfolio" : "Create New Portfolio"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="portfolioName">Portfolio Name</Label>
            <Input id="portfolioName" {...form.register("portfolioName")} />
            {form.formState.errors.portfolioName && (
              <p className="text-sm text-red-500">{form.formState.errors.portfolioName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Portfolio Type</Label>
            <Controller
              control={form.control}
              name="portfolioType"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="family">Family</SelectItem>
                    <SelectItem value="joint">Joint</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {portfolioType !== "personal" && (
            <div className="space-y-3">
              <Label>Portfolio Members</Label>
              <div className="flex gap-2">
                <Input
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  placeholder="Add member name"
                />
                <Button type="button" size="sm" onClick={handleAddMember}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {fields.map((field, index) => (
                  <Badge key={field.id} variant="secondary">
                    {field.name}
                    <button type="button" onClick={() => remove(index)} className="ml-2">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{isEditMode ? "Save Changes" : "Create Portfolio"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}