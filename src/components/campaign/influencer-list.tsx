"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, X, MessageSquare } from "lucide-react"
import { formatNumber } from "@/lib/utils"

interface Influencer {
  id: string
  status: string
  influencer: {
    id: string
    email: string
    influencerProfile: {
      followers: number
      engagement: number
    } | null
  }
}

interface InfluencerListProps {
  campaignId: string
  influencers: Influencer[]
}

export function InfluencerList({ campaignId, influencers }: InfluencerListProps) {
  const [updating, setUpdating] = useState<string | null>(null)

  const updateInfluencerStatus = async (influencerId: string, status: string) => {
    try {
      setUpdating(influencerId)
      const response = await fetch(
        `/api/campaign/${campaignId}/influencer/${influencerId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      )

      if (!response.ok) {
        throw new Error("Failed to update status")
      }

      // Refresh the page to show updated status
      window.location.reload()
    } catch (error) {
      console.error("Error updating influencer status:", error)
    } finally {
      setUpdating(null)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Campaign Influencers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {influencers.map((inf) => (
            <div
              key={inf.id}
              className="flex items-center justify-between border-b pb-4 last:border-0"
            >
              <div>
                <h4 className="font-medium">{inf.influencer.email}</h4>
                <div className="text-sm text-gray-500 space-x-4">
                  <span>{formatNumber(inf.influencer.influencerProfile?.followers || 0)} followers</span>
                  <span>{inf.influencer.influencerProfile?.engagement || 0}% engagement</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {inf.status === "PENDING" && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateInfluencerStatus(inf.influencer.id, "APPROVED")}
                      disabled={updating === inf.influencer.id}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateInfluencerStatus(inf.influencer.id, "REJECTED")}
                      disabled={updating === inf.influencer.id}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </>
                )}
                {inf.status === "APPROVED" && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={`/messages/${inf.influencer.id}`}>
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Message
                    </a>
                  </Button>
                )}
                {inf.status === "REJECTED" && (
                  <span className="text-sm text-red-500">Rejected</span>
                )}
              </div>
            </div>
          ))}
          {influencers.length === 0 && (
            <div className="text-center py-6 text-gray-500">
              No influencers have applied yet
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
