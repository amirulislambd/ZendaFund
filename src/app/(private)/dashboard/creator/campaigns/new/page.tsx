import AddCampaignForm from "@/components/dashboard/creator/AddCampaignForm";
import { UserSessionToSSR } from "@/lib/core/session";
import { User } from "@/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Launch a New Campaign | ZendaFund",
  description:
    "Start your fundraising journey on ZendaFund. Share your story, set a funding goal, and launch your campaign to reach supporters who believe in your cause.",
  keywords: [
    "start a campaign",
    "crowdfunding",
    "fundraising",
    "launch campaign",
    "ZendaFund",
  ],
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Launch a New Campaign | ZendaFund",
    description:
      "Start your fundraising journey on ZendaFund. Share your story, set a funding goal, and launch your campaign.",
    type: "website",
    siteName: "ZendaFund",
  },
  twitter: {
    card: "summary_large_image",
    title: "Launch a New Campaign | ZendaFund",
    description:
      "Start your fundraising journey on ZendaFund. Share your story, set a funding goal, and launch your campaign.",
  },
};

export default async function AddNewCampaignPage() {
  const user = await UserSessionToSSR();
  console.log(user);

  return <AddCampaignForm user={user as User} />;
}