"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Campaign } from '@/types';

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

// Shared campaign card — used on the Explore page, the home page, and
// anywhere else campaigns are listed. Keep all card markup/styling/motion
// here so every listing stays visually and behaviorally consistent; don't
// duplicate this JSX elsewhere.
//
// `index` is optional — pass the item's position in a list to stagger the
// entrance animation (e.g. campaigns.map((c, i) => <CampaignCard index={i} />)).
export default function CampaignCard({ campaign, index = 0 }: CampaignCardProps) {
  const campaignProgress = progress(campaign);
  const remaining = daysLeft(campaign.deadline);
 
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: Math.min(index, 6) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group overflow-hidden rounded-[28px] border border-(--border) bg-(--surface) shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition-shadow hover:shadow-[0_28px_80px_rgba(15,23,42,0.14)]"
    >
      <div className="relative h-44 overflow-hidden">
        <motion.img
          src={campaign.imageUrl}
          alt={campaign.title}
          className="h-full w-full object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <span className="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          {remaining > 0 ? `${remaining} days left` : 'Ended'}
        </span>
        <span className="absolute left-3 top-3 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-(--foreground) backdrop-blur">
          {campaign.category}
        </span>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-(--foreground)">{campaign.title}</h2>
          <span className="shrink-0 rounded-full bg-(--surface-muted) px-3 py-1 text-xs font-medium capitalize text-(--muted)">
            {campaign.status}
          </span>
        </div>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-(--muted)">{campaign.description}</p>

        {campaign.rewardInfo && (
          <p className="mt-3 text-xs font-medium uppercase tracking-wide text-(--accent)">
            Reward: {campaign.rewardInfo}
          </p>
        )}

        <div className="mt-6 space-y-2">
          <div className="flex items-center justify-between text-sm text-(--muted)">
            <span>Raised {(campaign.raisedAmount ?? 0).toLocaleString()} credits</span>
            <span className="font-semibold text-(--foreground)">{Math.round(campaignProgress)}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-(--surface-muted)">
            <motion.div
              className="h-full rounded-full bg-(--accent)"
              initial={{ width: 0 }}
              whileInView={{ width: `${campaignProgress}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-(--muted)">
            <span>Goal: {(campaign.goal ?? 0).toLocaleString()} credits</span>
            <span>Min. {(campaign.minimumContribution ?? 0).toLocaleString()} credits</span>
          </div>
        </div>

        <Link
          href={`/explore/${campaign._id}`}
          className="mt-6 flex items-center justify-center gap-1 rounded-2xl border border-(--border) bg-(--surface-muted) py-2.5 text-sm font-semibold text-(--foreground) transition-colors group-hover:border-(--accent) group-hover:bg-(--accent)/10 group-hover:text-(--accent)"
        >
          View Details
          <motion.span
            className="inline-block"
            initial={{ x: 0 }}
            whileHover={{ x: 3 }}
            transition={{ duration: 0.2 }}
          >
            →
          </motion.span>
        </Link>
      </div>
    </motion.article>
  );
}