import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"

export function TelegramBanner() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-gradient-to-r from-green-400 via-teal-400 to-green-500 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <Send className="w-6 h-6 text-white" />
              </div>
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <Send className="w-5 h-5 text-white" />
              </div>
              <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                <Send className="w-4 h-4 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                JOIN US ON <span className="text-gray-800">TELEGRAM</span>
              </h2>
            </div>
          </div>
          <div className="text-right">
            <Button className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-full font-semibold">
              click to join
            </Button>
            <p className="text-sm text-gray-700 mt-2">
              receive all the latest updates
              <br />
              and connect with the community
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
