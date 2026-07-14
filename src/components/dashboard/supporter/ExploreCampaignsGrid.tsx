"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Campaign } from "@/types";
import { Rocket } from "lucide-react";
type ExploreCampaignsGridProps = {
  campaigns: Campaign[];
};

function daysLeft(deadline: string | Date) {
  const diff = new Date(deadline).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function formatDate(deadline: string | Date) {
  return new Date(deadline).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function ExploreCampaignsGrid({
  campaigns,
}: ExploreCampaignsGridProps) {
    

    if (campaigns.length === 0) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-[#050d2a] via-[#071331] to-[#0a2a45] px-8 py-20"
        >
          <div className="mx-auto flex max-w-xl flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cyan-500/10">
              <Rocket className="h-10 w-10 text-cyan-400" />
            </div>
    
            <h2 className="mt-6 text-3xl font-bold text-white">
              No Active Campaigns
            </h2>
    
            <p className="mt-4 max-w-md text-base leading-7 text-slate-300">
              There are no active campaigns available at the moment. Check back
              later to discover new fundraising campaigns and support amazing
              creators.
            </p>
    
            <div className="mt-8 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm font-medium text-cyan-400">
              🚀 New campaigns will appear here
            </div>
          </div>
        </motion.div>
      );
    }
  return (

    <>
   <div className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-[#050d2a] via-[#071331] to-[#0a2a45]">
  {/* Right Background Accent */}
  <div className="absolute inset-y-0 right-0 w-[35%] bg-gradient-to-l from-cyan-800/20 via-sky-900/15 to-transparent" />
  <div className="absolute -right-24 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

  <div className="relative z-10 flex flex-col gap-8 p-8 lg:flex-row lg:items-center lg:justify-between">
    {/* Left */}
    <div className="max-w-2xl">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-400">
        🚀 Explore Campaigns
      </div>

      <h1 className="text-3xl font-bold leading-tight text-white md:text-5xl">
        Discover campaigns
        <br />
        that deserve your support.
      </h1>

      <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
        Browse active fundraising campaigns, track their progress, and
        contribute with your available credits to help creators reach their
        goals.
      </p>
    </div>

    {/* Right Card */}
    <div className="w-full max-w-xs rounded-2xl border border-cyan-500/20 bg-[#07162e]/80 p-6 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/15">
          🚀
        </div>

        <div>
          <p className="text-sm text-slate-300">
            Active Campaigns
          </p>

          <h3 className="text-4xl font-bold text-white">
            {campaigns.length}
          </h3>

          <p className="text-sm font-medium text-cyan-400">
            Available to Support
          </p>
        </div>
      </div>
    </div>
  </div>
</div> 
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {campaigns.map((campaign, index) => {
        const goal = campaign.goal ?? 0;
        const raisedAmount = campaign.raisedAmount ?? 0;
        const progress =
          goal > 0 ? Math.min((raisedAmount / goal) * 100, 100) : 0;
        const remaining = daysLeft(campaign.deadline);

        return (
          <motion.article
            key={campaign._id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.45,
              delay: Math.min(index, 6) * 0.08,
            }}
            whileHover={{ y: -8 }}
            className="group overflow-hidden rounded-3xl border border-white/10 bg-(--surface) shadow-lg transition-all duration-300 hover:border-cyan-500/30 hover:shadow-cyan-500/10"
          >
            {/* Cover */}
            <div className="relative h-52 overflow-hidden">
              <img
                src={campaign.imageUrl}
                alt={campaign.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              <span className="absolute left-4 top-4 rounded-full bg-cyan-500/90 px-3 py-1 text-xs font-semibold text-white">
                Active
              </span>

              <span className="absolute bottom-4 left-4 rounded-full bg-black/50 px-3 py-1 text-xs text-white backdrop-blur">
                {remaining > 0 ? `${remaining} Days Left` : "Ending Soon"}
              </span>
            </div>

            {/* Body */}
            <div className="space-y-5 p-6">
              <div>
                <h2 className="line-clamp-2 text-xl font-bold text-(--foreground)">
                  {campaign.title}
                </h2>

                <p className="mt-2 text-sm text-(--muted)">
                  Created by{" "}
                  <span className="font-semibold text-cyan-400">
                    {campaign.creatorName ?? "Unknown"}
                  </span>
                </p>
              </div>

              {/* Progress */}
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-(--muted)">
                    {raisedAmount.toLocaleString()} Credits
                  </span>

                  <span className="font-semibold text-cyan-400">
                    {Math.round(progress)}%
                  </span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-slate-700">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${progress}%` }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-500"
                  />
                </div>

                <div className="mt-2 flex justify-between text-xs text-(--muted)">
                  <span>Goal: {goal.toLocaleString()}</span>
                  <span>{formatDate(campaign.deadline)}</span>
                </div>
              </div>

              {/* Footer */}
              <Link
                href={`/explore/${campaign._id}`}
                className="group relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(34,211,238,.45)]"
              >
                View Campaign
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </motion.article>
        );
      })}
    </div>
    </>
  );
}
