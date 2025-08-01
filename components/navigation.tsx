import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"

export function Navigation() {
  return (
    <nav className="bg-background border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/">
              <h1 className="text-2xl font-bold">
                <span className="text-green-600">NEPTREND</span>
              </h1>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#overview" className="text-foreground hover:text-green-600 font-medium transition-colors">
              Overview
            </Link>
            <Link
              href="#technical"
              className="text-muted-foreground hover:text-green-600 font-medium transition-colors"
            >
              Technical Indicators
            </Link>
            <Link
              href="#fundamentals"
              className="text-muted-foreground hover:text-green-600 font-medium transition-colors"
            >
              Fundamentals
            </Link>
            <Link
              href="#sentiment"
              className="text-muted-foreground hover:text-green-600 font-medium transition-colors"
            >
              Sentiment
            </Link>
            <Link href="#news" className="text-muted-foreground hover:text-green-600 font-medium transition-colors">
              News
            </Link>
            {/* <Link
              href="/dashboard"
              className="text-muted-foreground hover:text-green-600 font-medium transition-colors"
            >
              Dashboard
            </Link> */}
          </div>
          <div className="flex items-center space-x-3">
            {/* <Button
              variant="outline"
              className="border-purple-200 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950 bg-transparent"
            >
              📚 Ed Hub
            </Button> */}
            {/* <Link href="/profile">
              <Button variant="outline" className="text-foreground hover:bg-muted bg-transparent">
                Profile
              </Button>
            </Link> */}
            <Link href="/register">
              <Button variant="outline" className="text-foreground hover:bg-muted bg-transparent">
                Register
              </Button>
            </Link>
            <Link href="/login">
              <Button className="bg-green-600 hover:bg-green-700 text-white">Login</Button>
            </Link>
            {/* <ThemeToggle /> */}
          </div>
        </div>
      </div>
    </nav>
  )
}
