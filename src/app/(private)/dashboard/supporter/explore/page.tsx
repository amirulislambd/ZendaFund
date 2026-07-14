import type { Metadata } from "next";
import { GetCampaigns } from "@/lib/actions/campaign";
import ExploreCampaignsGrid from "@/components/dashboard/supporter/ExploreCampaignsGrid";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Explore Campaigns | ZendaFund",
  description: "Browse active campaigns and support the causes you care about.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ExploreCampaignPage() {
  const { campaigns = [] } = await GetCampaigns({
    activeOnly: true,
    sort: "deadline",
    limit: 100,
  });

  return (
    <div>
      <ExploreCampaignsGrid campaigns={campaigns} />
    </div>
  );
}
