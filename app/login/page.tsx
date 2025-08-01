"use client"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { AuthCard } from "@/components/auth-card"
// import { SocialLoginButtons } from "@/components/social-login-buttons"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <AuthCard>
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

      {/* Welcome Section */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Welcome back!</h2>
        <p className="text-muted-foreground">
          New to NEPTREND Trading?{" "}
          <Link href="/register" className="text-primary hover:text-primary/80 font-medium">
            Register
          </Link>
        </p>
      </div>

      {/* <SocialLoginButtons /> */}

      {/* Divider */}
      {/* <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-background text-muted-foreground">Or, use e-mail address</span>
        </div>
      </div> */}

      <LoginForm />
    </AuthCard>
  )
}
