import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Star } from "lucide-react"

export function HeroSection() {
  return (
    <div className="lg:col-span-2">
      <p className="text-green-600 font-medium mb-4">The future of NEPSE trading is here.</p>
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
        Empowering NEPSE Investors
        <br />
        with <span className="text-green-600">Intelligent</span> Insights
      </h1>
      <p className="text-gray-600 text-lg mb-8 leading-relaxed">
        Get comprehensive insights into Nepal Stock Exchange with our advanced analytics platform. Access real-time
        market data, interactive visualizations, technical indicators, and AI-powered sentiment analysis to make
        informed investment decisions.
      </p>

      {/* Search Form */}
      <Card className="max-w-md mb-8 shadow-lg">
        <CardContent className="p-6">
          <form className="space-y-4">
            <div className="relative">
              <Input type="text" placeholder="Enter stock symbol (e.g., SHL, NABIL)" className="pl-10 h-12 text-lg" />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
            <Button className="w-full h-12 text-lg bg-green-600 hover:bg-green-700">Analyze Stock</Button>
          </form>
        </CardContent>
      </Card>

      <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold flex items-center">
        <Star className="w-4 h-4 mr-2 fill-current" />
        Get Started Free
      </Button>
    </div>
  )
}
