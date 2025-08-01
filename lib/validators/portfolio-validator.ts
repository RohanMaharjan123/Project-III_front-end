import { z } from "zod"

export const memberSchema = z.object({
  name: z.string().min(1, "Member name is required"),
})

export const portfolioSchema = z.object({
  portfolioName: z.string().min(3, "Portfolio name must be at least 3 characters long"),
  portfolioType: z.enum(["personal", "family", "joint"]),
  members: z.array(memberSchema).optional(),
})

export type PortfolioFormValues = z.infer<typeof portfolioSchema>
