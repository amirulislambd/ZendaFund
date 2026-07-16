import PlatformImpactSection from "@/components/dashboard/supporter/PlatformImpactSection";
import ExploreByCategorySection from "@/components/sections/Explorebycategorysection";
import HeroSection from "@/components/sections/HeroSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
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

        <section className="relative overflow-hidden py-20">
          {/* Background Glow */}

          <div
            className="
      absolute
      left-0
      top-0
      h-72
      w-72
      rounded-full
      bg-cyan-500/10
      blur-[120px]
    "
          />

          <div
            className="
      absolute
      bottom-0
      right-0
      h-72
      w-72
      rounded-full
      bg-blue-500/10
      blur-[120px]
    "
          />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Header */}

            <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div
                  className="
            inline-flex
            items-center
            rounded-full
            border
            border-cyan-500/20
            bg-cyan-500/10
            px-4
            py-1
            text-sm
            font-medium
            text-cyan-400
          "
                >
                  ✦ Featured Campaigns
                </div>

                <h2 className="mt-5 text-4xl font-bold text-(--foreground) md:text-5xl">
                  Support Causes That
                  <span
                    className="
              block
              bg-gradient-to-r
              from-cyan-400
              to-blue-500
              bg-clip-text
              text-transparent
            "
                  >
                    Matter Most
                  </span>
                </h2>

                <p className="mt-4 max-w-2xl text-(--muted)">
                  Discover inspiring campaigns, support passionate creators, and
                  help turn meaningful ideas into reality through the power of
                  crowdfunding.
                </p>
              </div>

              <Link
                href="/explore"
                className="
          inline-flex
          items-center
          justify-center
          rounded-2xl
          border
          border-cyan-500/20
          bg-cyan-500/10
          px-5
          py-3
          font-medium
          text-cyan-400
          backdrop-blur-xl
          transition-all
          duration-300
          hover:border-cyan-500/40
          hover:bg-cyan-500/20
          hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]
        "
              >
                View All Campaigns →
              </Link>
            </div>

            {/* Campaign Grid */}

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {featuredCampaigns.map((campaign, index) => (
                <CampaignCard
                  key={campaign._id}
                  campaign={campaign}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        <section>
          <TestimonialsSection />
          <PlatformImpactSection />
          <HowItWorksSection />
          <ExploreByCategorySection />
        </section>

        <Toaster />
      </main>
    </div>
  );
}
