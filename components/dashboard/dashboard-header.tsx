import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Bell, User, Settings } from "lucide-react"
import Link from "next/link"

export function DashboardHeader() {
    return (
        <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <h1 className="text-2xl font-bold">
                            <span className="text-green-600">NEPTREND</span>
                            <span className="text-sm font-normal text-gray-600 ml-2">Dashboard</span>
                        </h1>
                    </Link>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-md mx-8">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input type="text" placeholder="Search stocks (e.g., NABIL, SHL)" className="pl-10 h-10" />
                        </div>
                    </div>

                    {/* User Actions */}
                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm">
                            <Bell className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                            <User className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}
