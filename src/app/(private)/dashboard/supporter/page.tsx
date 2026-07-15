import type { Metadata } from "next";
import Link from "next/link";
import { GetSupporterStats } from "@/lib/api/stuts";
import { GetMyContributions } from "@/lib/actions/contribution";
import SupporterStatsGrid from "@/components/dashboard/supporter/SupporterStatsGrid";
import RecentActivityTable from "@/components/dashboard/supporter/RecentActivityTable";
import { ArrowRight, Coins } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard | ZendaFund",
  description: "Your contribution overview on ZendaFund.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function SupporterHomePage() {
  const [stats, recent] = await Promise.all([
    GetSupporterStats(),
    GetMyContributions({ limit: 5 }).catch(() => ({
      contributions: [],
      pagination: { page: 1, limit: 5, total: 0, pages: 1 },
    })),
  ]);
  console.log("stats", stats);
  return (
    <div className="max-w-6xl mx-auto">
      <div className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-[#050d2a] via-[#071331] to-[#0a2a45]">
        {/* Right Background Accent */}
        <div className="absolute inset-y-0 right-0 w-[35%] bg-gradient-to-l from-cyan-800/20 via-sky-900/15 to-transparent" />
        <div className="absolute -right-24 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-8 p-8 lg:flex-row lg:items-center lg:justify-between">
          {/* Left */}
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-400">
              👋 Welcome Back
            </div>

            <h1 className="text-3xl font-bold leading-tight text-white md:text-5xl">
              Ready to support
              <br />
              amazing creators?
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
              Track your contribution activity, monitor your available credits,
              discover new campaigns, and continue making an impact through
              ZendaFund.
            </p>
          </div>

          {/* Right Card */}
          <div className="w-full max-w-sm rounded-2xl border border-cyan-500/20 bg-[#07162e]/80 p-6 backdrop-blur-md">
            <div className="flex items-center gap-4">
              {/* Icon */}
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/15">
                <Coins className="h-8 w-8 text-cyan-400" />
              </div>

              {/* Credits */}
              <div>
                <p className="text-sm text-slate-300">Current Balance</p>

                <h2 className="text-4xl font-bold text-white">
                  {stats.availableCredits}
                </h2>

                <p className="text-sm font-medium text-cyan-400">
                  Available Credits
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="my-6 h-px bg-white/10" />

            {/* Description */}
            <p className="text-sm leading-6 text-slate-300">
              Explore active campaigns and use your available credits to support
              creators.
            </p>

            {/* Button */}
            <Link
              href="/dashboard/supporter/explore"
              className="group mt-6 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(34,211,238,.45)]"
            >
              Discover Campaigns
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      <SupporterStatsGrid stats={stats} />

      <div className="mt-6">
        <RecentActivityTable contributions={recent.contributions ?? []} />
      </div>
    </div>
  );
}
