import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">NEPTREND</h3>
            <p className="text-gray-400 mb-4">
              Advanced analytics platform for Nepal Stock Exchange investors. Make informed decisions with real-time
              data and comprehensive market insights.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Overview
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Technical Indicators
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Fundamentals
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Sentiment
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  News
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Market Data
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  API Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} NEPTREND. All rights reserved. | NEPSE Analytics Platform</p>
        </div>
      </div>
    </footer>
  )
}
