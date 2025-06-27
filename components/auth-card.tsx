import type React from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface AuthCardProps {
  children: React.ReactNode
}

export function AuthCard({ children }: AuthCardProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="p-6">
        <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          <h1 className="text-2xl font-bold">
            <span className="text-green-600">NEPTREND</span>
            {/* <span className="text-gray-700 font-normal">trading</span> */}
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
