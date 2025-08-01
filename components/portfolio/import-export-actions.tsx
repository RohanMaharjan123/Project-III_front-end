"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, FileText, FileSpreadsheet } from "lucide-react"
import { useState, useRef } from "react"

export function ImportExportActions() {
  const [showImportDialog, setShowImportDialog] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Handle CSV file upload
      console.log("Uploading file:", file.name)
      // Process CSV file here
      setShowImportDialog(false)
    }
  }

  const handleExportPDF = () => {
    // Generate and download PDF
    console.log("Exporting to PDF...")
  }

  const handleExportCSV = () => {
    // Generate and download CSV
    console.log("Exporting to CSV...")
  }

  return (
    <div className="flex flex-wrap gap-2">
      {/* Import Dialog */}
      <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Import CSV
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Import Transactions from CSV</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="csvFile">Select CSV File</Label>
              <Input id="csvFile" type="file" accept=".csv" ref={fileInputRef} onChange={handleFileUpload} />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">CSV Format Requirements:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Date (YYYY-MM-DD)</li>
                <li>• Type (BUY/SELL)</li>
                <li>• Symbol (Stock Symbol)</li>
                <li>• Quantity (Number)</li>
                <li>• Price (Number)</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowImportDialog(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={() => fileInputRef.current?.click()} className="flex-1 bg-green-600 hover:bg-green-700">
                Choose File
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Export Buttons */}
      <Button variant="outline" size="sm" onClick={handleExportPDF}>
        <FileText className="w-4 h-4 mr-2" />
        Export PDF
      </Button>

      <Button variant="outline" size="sm" onClick={handleExportCSV}>
        <FileSpreadsheet className="w-4 h-4 mr-2" />
        Export CSV
      </Button>
    </div>
  )
}
