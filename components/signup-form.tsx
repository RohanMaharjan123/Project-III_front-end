"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff, Mail, Lock, User, Shield } from "lucide-react"
import Link from "next/link"
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user" as "admin" | "user",
    agreeToTerms: false,
    subscribeNewsletter: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const { register } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    if (!formData.fullName.trim()) {
      setError("Please enter your full name.");
      setIsLoading(false);
      return;
    }

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long")
      setIsLoading(false)
      return
    }

    if (!formData.agreeToTerms) {
      setError("You must agree to the Terms of Service")
      setIsLoading(false)
      return
    }

    try {
      await register(formData.fullName, formData.email, formData.password, formData.role)
      router.push('/dashboard')
    } catch (err: any) {
      const errorData = err.response?.data;
      let errorMessage = 'Registration failed. Please try again.';
      if (errorData) {
        if (typeof errorData === 'object' && !Array.isArray(errorData)) {
          // Handle DRF validation errors which are often in a dict
          const messages = Object.values(errorData).flat();
          if (messages.length > 0) {
            errorMessage = messages.join(' ');
          }
        } else if (errorData.detail) {
          errorMessage = errorData.detail;
        }
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-foreground">
            Full Name
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground">
            Email Address
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
              required
            />
          </div>
        </div>
{/* 
        <div className="space-y-2">
          <Label htmlFor="role" className="text-foreground">
            Role
          </Label>
          <div className="relative">
            <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 z-10" />
            <Select
              value={formData.role}
              onValueChange={(value) => handleInputChange("role", value)}
            >
              <SelectTrigger className="pl-10 bg-background border-border text-foreground focus:border-primary focus:ring-primary">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div> */}

        <div className="space-y-2">
          <Label htmlFor="password" className="text-foreground">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className="pl-10 pr-10 bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-foreground">
            Confirm Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
              className="pl-10 pr-10 bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-md p-3">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={formData.agreeToTerms}
            onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
            className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            required
          />
          <Label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
            I agree to the{" "}
            <Link href="/terms" className="text-primary hover:text-primary/80 transition-colors">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary hover:text-primary/80 transition-colors">
              Privacy Policy
            </Link>
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="newsletter"
            checked={formData.subscribeNewsletter}
            onCheckedChange={(checked) => handleInputChange("subscribeNewsletter", checked as boolean)}
            className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />
          <Label htmlFor="newsletter" className="text-sm text-muted-foreground cursor-pointer">
            Subscribe to our newsletter for market updates
          </Label>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        disabled={isLoading || !formData.agreeToTerms}
      >
        {isLoading ? "Creating account..." : "Create Account"}
      </Button>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </form>
  )
}