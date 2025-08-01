"use client"

import React from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { transactionSchema, TransactionFormValues } from "@/lib/validators/transaction-validator"
import { StockSearch } from "./stock-search"

interface TransactionFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: TransactionFormValues, transactionId?: number) => void
  portfolioId: number
  initialData?: TransactionFormValues & { id?: number } // Add id for editing
}

export function TransactionFormModal({ isOpen, onClose, onSubmit, portfolioId, initialData }: TransactionFormModalProps) {
  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      portfolio: portfolioId,
      transaction_type: initialData?.transaction_type || "buy",
      quantity: initialData?.quantity || 0,
      price: initialData?.price || 0,
      transaction_date: initialData?.transaction_date || new Date().toISOString().split("T")[0],
      stock_symbol: initialData?.stock_symbol || "",
    },
  })

  React.useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  const handleSubmit = (data: TransactionFormValues) => {
    onSubmit(data, initialData?.id);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Transaction" : "Add New Transaction"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label>Stock</Label>
            <Controller
              name="stock_symbol"
              control={form.control}
              render={({ field }) => (
                <StockSearch
                  onSelect={(stockSymbol) => {
                    field.onChange(stockSymbol);
                  }}
                  initialStockSymbol={initialData?.stock_symbol}
                />
              )}
            />
            {form.formState.errors.stock_symbol && <p className="text-sm text-red-500">{form.formState.errors.stock_symbol.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Transaction Type</Label>
            <Controller
              name="transaction_type"
              control={form.control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select transaction type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="buy">Buy</SelectItem>
                    <SelectItem value="sell">Sell</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input id="quantity" type="number" {...form.register("quantity", { valueAsNumber: true })} />
              {form.formState.errors.quantity && (
                <p className="text-sm text-red-500">{form.formState.errors.quantity.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" type="number" step="0.01" {...form.register("price", { valueAsNumber: true })} />
              {form.formState.errors.price && <p className="text-sm text-red-500">{form.formState.errors.price.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="transaction_date">Transaction Date</Label>
            <Input id="transaction_date" type="date" {...form.register("transaction_date")} />
            {form.formState.errors.transaction_date && (
              <p className="text-sm text-red-500">{form.formState.errors.transaction_date.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{initialData ? "Save Changes" : "Add Transaction"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}