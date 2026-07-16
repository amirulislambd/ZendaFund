import PlatformImpactSection from "@/components/dashboard/supporter/PlatformImpactSection";
import HeroSection from "@/components/sections/HeroSection";
import TestimonialsSection from "@/components/sections/Testimonialssection";
import CampaignCard from "@/components/shared/Campaigncard";

import { GetCampaigns } from "@/lib/actions/campaign";

import Link from "next/link";
import { Toaster } from "react-hot-toast";

export default async function Home() {
  const { campaigns: featuredCampaigns } = await GetCampaigns({
    limit: 6,
    sort: "raised",
  });

  return (
    <div
      className="flex min-h-screen flex-col transition-colors duration-300"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <main className="flex-1">
        <HeroSection />

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-(--accent)">
                Featured Campaigns
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-(--foreground)">
                Support causes that matter
              </h2>
            </div>
            <Link
              href="/explore"
              className="text-sm font-semibold text-(--accent) hover:text-(--accent)/80"
            >
              View all
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featuredCampaigns.map((campaign, index) => (
              <CampaignCard
                key={campaign._id}
                campaign={campaign}
                index={index}
              />
            ))}
          </div>
        </section>

        <section>
          <TestimonialsSection />
        </section>
        <section>
          <PlatformImpactSection />
        </section>
        <Toaster />
      </main>
    </div>
  );
}
