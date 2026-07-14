"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Coins, Gift, Tag } from "lucide-react";
import type { Campaign } from "@/types";

type CampaignCardProps = {
  campaign: Campaign;
  index?: number;
};

function progress(campaign: Campaign) {
  if (!campaign.goal || campaign.goal <= 0) return 0;
  return Math.min((campaign.raisedAmount / campaign.goal) * 100, 100);
}

function daysLeft(deadline: string | Date) {
  const diff = new Date(deadline).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default function CampaignCard({
  campaign,
  index = 0,
}: CampaignCardProps) {
  const campaignProgress = progress(campaign);
  const remaining = daysLeft(campaign.deadline);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.45,
        delay: Math.min(index, 6) * 0.07,
      }}
      whileHover={{ y: -8 }}
      className="group overflow-hidden rounded-3xl border border-white/10 bg-[#071425] shadow-[0_15px_40px_rgba(0,0,0,.25)] transition-all duration-300 hover:border-cyan-500/30 hover:shadow-[0_25px_70px_rgba(34,211,238,.15)]"
    >
      {/* IMAGE */}
      <div className="relative h-56 overflow-hidden">
        <motion.img
          src={campaign.imageUrl}
          alt={campaign.title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Category */}
        <div className="absolute left-4 top-4">
          <span className="inline-flex items-center gap-1 rounded-full bg-cyan-500/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            <Tag size={12} />
            {campaign.category}
          </span>
        </div>

        {/* Days Left */}
        <div className="absolute right-4 top-4">
          <span className="inline-flex items-center gap-1 rounded-full bg-black/50 px-3 py-1 text-xs text-white backdrop-blur">
            <CalendarDays size={12} />
            {remaining > 0 ? `${remaining} Days Left` : "Ended"}
          </span>
        </div>

        {/* Bottom Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            {campaign.status}
          </span>

          <h2 className="mt-3 line-clamp-2 text-2xl font-bold text-white transition group-hover:text-cyan-400">
            {campaign.title}
          </h2>
        </div>
      </div>

      {/* BODY */}
      <div className="space-y-5 p-6">
        {/* <p className=" text-sm leading-7 text-slate-300 line-clamp-2">
          {campaign.description}
        </p>{" "} */}
        {/* Progress */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-slate-300">
              {(campaign.raisedAmount ?? 0).toLocaleString()} Credits Raised
            </span>

            <span className="text-sm font-bold text-cyan-400">
              {Math.round(campaignProgress)}%
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-700">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${campaignProgress}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 shadow-[0_0_20px_rgba(34,211,238,.45)]"
            />
          </div>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-cyan-500/20">
            <div className="flex items-center gap-2 text-slate-400">
              <Coins size={15} />
              <span className="text-xs uppercase tracking-wider">Goal</span>
            </div>

            <h3 className="mt-2 text-xl font-bold text-white">
              {(campaign.goal ?? 0).toLocaleString()}
            </h3>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-cyan-500/20">
            <div className="flex items-center gap-2 text-slate-400">
              <Coins size={15} />
              <span className="text-xs uppercase tracking-wider">Minimum</span>
            </div>

            <h3 className="mt-2 text-xl font-bold text-white">
              {(campaign.minimumContribution ?? 0).toLocaleString()}
            </h3>
          </div>
        </div>
        {/* Reward */}
        {campaign.rewardInfo && (
          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4">
            <div className="flex items-center gap-2">
              <Gift className="h-4 w-4 text-cyan-400" />

              <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
                Reward
              </span>
            </div>

            <p className="mt-2 text-sm leading-6 text-white line-clamp-2">
              {campaign.rewardInfo}
            </p>
          </div>
        )}{" "}
        {/* CTA */}
        <Link
          href={`/explore/${campaign._id}`}
          className="
            group/button
            flex
            w-full
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-r
            from-cyan-500
            via-sky-500
            to-blue-600
            px-5
            py-3.5
            text-sm
            font-semibold
            text-white
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-[0_0_30px_rgba(34,211,238,.45)]
            active:scale-[0.98]
          "
        >
          View Campaign
          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  );
}