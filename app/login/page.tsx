"use client"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { AuthCard } from "@/components/auth-card"
import { SocialLoginButtons } from "@/components/social-login-buttons"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <AuthCard>
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

      {/* Welcome Section */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h2>
        <p className="text-gray-600">
          New to NEPTREND?{" "}
          <Link href="/register" className="text-green-600 hover:text-green-700 font-medium">
            Register
          </Link>
        </p>
      </div>

      <SocialLoginButtons />

      {/* Divider */}
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-gray-50 text-gray-500">Or, use e-mail address</span>
        </div>
      </div>

      <LoginForm />
    </AuthCard>
  )
}
