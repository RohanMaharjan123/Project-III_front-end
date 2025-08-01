import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-card rounded-2xl shadow-xl p-8 md:p-12 text-center border border-border">
        <h2 className="text-3xl font-bold text-card-foreground mb-4">Start Your NEPSE Analysis Today</h2>
        <p className="text-muted-foreground mb-8 text-lg">
          Join thousands of investors who trust NEPTREND for their Nepal Stock Exchange analysis and insights.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 px-8">
            Get Started Free
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="px-8 bg-transparent text-foreground border-border hover:bg-muted"
          >
            View Demo
          </Button>
        </div>
      </div>
    </div>
  )
}
