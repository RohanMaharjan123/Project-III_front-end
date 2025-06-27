import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Navigation() {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/">
              <h1 className="text-2xl font-bold">
                <span className="text-green-600">NEPTREND</span>
                {/* <span className="text-sm font-normal text-gray-600 ml-2">NEPSE Analytics</span> */}
              </h1>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#overview" className="text-gray-900 hover:text-green-600 font-medium transition-colors">
              Overview
            </Link>
            <Link href="#technical" className="text-gray-600 hover:text-green-600 font-medium transition-colors">
              Technical Indicators
            </Link>
            <Link href="#fundamentals" className="text-gray-600 hover:text-green-600 font-medium transition-colors">
              Fundamentals
            </Link>
            <Link href="#sentiment" className="text-gray-600 hover:text-green-600 font-medium transition-colors">
              Sentiment
            </Link>
            <Link href="#news" className="text-gray-600 hover:text-green-600 font-medium transition-colors">
              News
            </Link>
          </div>
          <div className="flex items-center space-x-3">
            {/* <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
              📚 Ed Hub
            </Button> */}
            <Link href="/register">
              <Button variant="outline" className="text-gray-700 hover:bg-gray-50">
                Register
              </Button>
            </Link>
            <Link href="/login">
              <Button className="bg-green-600 hover:bg-green-700 text-white">Login</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
