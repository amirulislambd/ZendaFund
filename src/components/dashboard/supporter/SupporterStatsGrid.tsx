"use client";

import { motion } from "framer-motion";
import { HandCoins, Clock, Wallet } from "lucide-react";
import type { SupporterStats } from "@/types";

type SupporterStatsGridProps = {
  stats: SupporterStats;
};

const STAT_CARDS = (stats: SupporterStats) => [
  {
    label: "Total contributions",
    value: stats.totalContributions.toLocaleString(),
    icon: HandCoins,
  },
  {
    label: "Pending contributions",
    value: stats.pendingContributions.toLocaleString(),
    icon: Clock,
  },
  {
    label: "Total amount contributed",
    value: `${stats.totalAmountContributed.toLocaleString()} credits`,
    icon: Wallet,
  },
];

export default function SupporterStatsGrid({ stats }: SupporterStatsGridProps) {
  const cards = STAT_CARDS(stats);

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {cards.map((card, index) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.08 }}
          className="rounded-2xl border border-(--border) bg-(--surface) p-6"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--accent)/10 text-(--accent)">
            <card.icon className="h-5 w-5" />
          </div>
          <p className="mt-4 text-sm text-(--muted)">{card.label}</p>
          <p className="mt-1 text-2xl font-bold text-(--foreground)">{card.value}</p>
        </motion.div>
      ))}
    </div>
  );
}