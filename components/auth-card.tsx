import type React from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface AuthCardProps {
  children: React.ReactNode
}

export function AuthCard({ children }: AuthCardProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="p-6">
        <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          <h1 className="text-2xl font-bold">
            <span className="text-primary">NEPTREND</span>
            {/* <span className="text-foreground font-normal">trading</span> */}
          </h1>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  )
}
