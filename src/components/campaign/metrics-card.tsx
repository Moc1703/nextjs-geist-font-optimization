"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, TrendingUp } from "lucide-react"
import { formatNumber } from "@/lib/utils"

interface MetricsCardProps {
  campaignId: string
  metrics?: Record<string, number>
}

export function MetricsCard({ campaignId, metrics }: MetricsCardProps) {
  const handleDownloadReport = async () => {
    try {
      const response = await fetch(`/api/campaign/${campaignId}/report`)
      if (!response.ok) throw new Error("Failed to generate report")
      
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `campaign-${campaignId}-report.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Error downloading report:", error)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Campaign Metrics</CardTitle>
        <Button onClick={handleDownloadReport} variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Download Report
        </Button>
      </CardHeader>
      <CardContent>
        {metrics ? (
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(metrics).map(([key, value]) => (
              <div
                key={key}
                className="flex flex-col p-4 bg-gray-50 rounded-lg"
              >
                <span className="text-sm text-gray-500 capitalize">
                  {key.replace(/_/g, " ")}
                </span>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-2xl font-bold">
                    {formatNumber(value)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            No metrics available yet
          </div>
        )}
      </CardContent>
    </Card>
  )
}
