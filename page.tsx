import { Metadata } from "next"
import { PrismaClient } from "@prisma/client"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency, formatDate } from "@/lib/utils"
import { MetricsCard } from "@/components/campaign/metrics-card"
import { InfluencerList } from "@/components/campaign/influencer-list"

const prisma = new PrismaClient()

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const campaign = await prisma.campaign.findUnique({
    where: { id: resolvedParams.id },
  })

  return {
    title: campaign ? `${campaign.name} - Campaign Details` : "Campaign Not Found",
  }
}

export default async function CampaignPage({ params }: PageProps) {
  const resolvedParams = await params
  const campaign = await prisma.campaign.findUnique({
    where: { id: resolvedParams.id },
    include: {
      influencers: {
        include: {
          influencer: {
            include: {
              influencerProfile: true,
            },
          },
        },
      },
      reports: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
    },
  })

  if (!campaign) {
    notFound()
  }

  const latestMetrics = campaign.reports[0]?.metrics || null

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">{campaign.name}</h1>
          <p className="text-gray-500">
            {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
          </p>
        </div>
        <div className="text-xl font-semibold">
          Budget: {formatCurrency(campaign.budget)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Campaign Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-500">Status</h4>
                <p className="mt-1">{campaign.status}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-500">Duration</h4>
                <p className="mt-1">
                  {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
                </p>
              </div>
              {campaign.brief && (
                <div>
                  <h4 className="font-medium text-gray-500">Campaign Brief</h4>
                  <p className="mt-1 whitespace-pre-wrap">{campaign.brief}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <MetricsCard 
          campaignId={campaign.id} 
          metrics={latestMetrics as Record<string, number>} 
        />
      </div>

      <InfluencerList 
        campaignId={campaign.id}
        influencers={campaign.influencers}
      />
    </div>
  )
}
