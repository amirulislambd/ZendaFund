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
      className="
      group
      overflow-hidden
      rounded-3xl
      border
      border-white/10
      bg-gradient-to-b
      from-[#0a1728]
      to-[#071425]
      shadow-[0_12px_35px_rgba(0,0,0,.25)]
      transition-all
      duration-300
      hover:-translate-y-2
      hover:border-emerald-400/30
      hover:shadow-[0_20px_60px_rgba(16,185,129,.18)]
      "
    >
      {/* IMAGE */}
      <div className="relative h-52 overflow-hidden">
        {/* Image */}
        <motion.img
          src={campaign.imageUrl}
          alt={campaign.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#071425] via-black/20 to-transparent" />

        {/* Top Badges */}
        <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/20 bg-emerald-400/15 px-3 py-1 text-[11px] font-semibold text-emerald-300 backdrop-blur-xl">
            <Tag className="h-3 w-3" />
            {campaign.category}
          </span>

          <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-xl">
            <CalendarDays className="h-3 w-3" />
            {remaining > 0 ? `${remaining} Days` : "Ended"}
          </span>
        </div>

        {/* Bottom Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <span
            className={`inline-flex rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-xl ${
              campaign.status === "approved"
                ? "bg-emerald-400/15 text-emerald-300"
                : "bg-amber-400/15 text-amber-300"
            }`}
          >
            {campaign.status}
          </span>

          <h2 className="mt-3 line-clamp-2 text-xl font-bold leading-7 text-white transition-colors duration-300 group-hover:text-emerald-300">
            {campaign.title}
          </h2>

          <p className="mt-2 text-sm text-slate-300">
            by{" "}
            <span className="font-semibold text-emerald-300">
              {campaign.creatorName}
            </span>
          </p>
        </div>
      </div>

      {/* BODY */}
      <div className="space-y-5 p-6">
        {/* Progress */}
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-400">
                Progress
              </p>

              <p className="mt-1 text-sm font-medium text-white">
                {(campaign.raisedAmount ?? 0).toLocaleString()}
                <span className="ml-1 text-slate-400">
                  / {(campaign.goal ?? 0).toLocaleString()} Credits
                </span>
              </p>
            </div>

            <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-3 py-1">
              <span className="text-sm font-bold text-emerald-400">
                {Math.round(campaignProgress)}%
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative h-2.5 overflow-hidden rounded-full bg-slate-700/70">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${campaignProgress}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative h-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-400"
            >
              <div className="absolute inset-0 animate-pulse bg-white/20" />
            </motion.div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>
              Raised{" "}
              <span className="font-semibold text-white">
                {(campaign.raisedAmount ?? 0).toLocaleString()}
              </span>
            </span>

            <span>
              Goal{" "}
              <span className="font-semibold text-white">
                {(campaign.goal ?? 0).toLocaleString()}
              </span>
            </span>
          </div>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          {/* Goal */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-3 transition-all duration-300 hover:border-emerald-400/30 hover:bg-emerald-400/5">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-400/10">
                <Coins className="h-4 w-4 text-emerald-400" />
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-wider text-slate-400">
                  Goal
                </p>

                <h3 className="text-lg font-bold text-white">
                  {(campaign.goal ?? 0).toLocaleString()}
                </h3>
              </div>
            </div>
          </div>

          {/* Minimum */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-3 transition-all duration-300 hover:border-cyan-400/30 hover:bg-cyan-400/5">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/10">
                <Coins className="h-4 w-4 text-cyan-400" />
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-wider text-slate-400">
                  Minimum
                </p>

                <h3 className="text-lg font-bold text-white">
                  {(campaign.minimumContribution ?? 0).toLocaleString()}
                </h3>
              </div>
            </div>
          </div>
        </div>
        {/* Reward */}
        {campaign.rewardInfo && (
          <div className="rounded-xl border border-emerald-400/20 bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/15">
                <Gift className="h-5 w-5 text-emerald-400" />
              </div>

              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
                  Reward
                </p>

                <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-200">
                  {campaign.rewardInfo}
                </p>
              </div>
            </div>
          </div>
        )}
        {/* CTA */}
        <Link
          href={`/explore/${campaign._id}`}
          className="
    group/button
    flex
    w-full
    items-center
    justify-center
    rounded-xl
    bg-gradient-to-r
    from-emerald-400
    via-cyan-400
    to-teal-400
    px-5
    py-3
    text-sm
    font-semibold
    text-slate-900
    transition-all
    duration-300
    hover:-translate-y-1
    hover:scale-[1.02]
    hover:shadow-[0_0_30px_rgba(52,211,153,.45)]
    active:scale-[0.98]
  "
        >
          <span>View Campaign</span>

          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  );
}