"use client"

import { AuthCard } from "@/components/auth-card"
import { SignupForm } from "@/components/signup-form"
import Link from "next/link"

export default function RegisterPage() {
  return (
    <AuthCard>
      {/* Header */}
      <div className="p-6">
        <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
          <h1 className="text-2xl font-bold">
            <span className="text-primary">NEPTREND</span>
            {/* <span className="text-foreground font-normal">trading</span> */}
          </h1>
        </Link>
      </div>

      {/* Welcome Section */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Registration Form</h2>
        <p className="text-muted-foreground">Enter your information to register NEPTREND</p>
      </div>

      <SignupForm />
    </AuthCard>
  )
}
