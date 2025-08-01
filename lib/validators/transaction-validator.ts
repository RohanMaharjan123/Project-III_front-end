import { z } from "zod"

export const transactionSchema = z.object({
  portfolio: z.number(),
  stock_symbol: z.string().min(1, "Stock symbol is required"),
  transaction_type: z.enum(["buy", "sell"]),
  quantity: z.number().positive("Quantity must be positive"),
  price: z.number().positive("Price must be positive"),
  transaction_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format. Expected YYYY-MM-DD"),
})

export type TransactionFormValues = z.infer<typeof transactionSchema>
