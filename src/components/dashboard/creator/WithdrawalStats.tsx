"use client";

import { motion } from "framer-motion";

interface WithdrawalOverview {
  totalRaisedCredits: number;
  totalWithdrawnCredits: number;
  availableCredits: number;
  withdrawalAmount: number;
}

interface Props {
  overview: WithdrawalOverview;
}

export default function WithdrawalStats({
  overview,
}: Props) {
  const cards = [
    {
      title: "Total Raised Credits",
      value: overview.totalRaisedCredits,
      suffix: "Credits",
    },
    {
      title: "Withdrawn Credits",
      value: overview.totalWithdrawnCredits,
      suffix: "Credits",
    },
    {
      title: "Available Credits",
      value: overview.availableCredits,
      suffix: "Credits",
    },
    {
      title: "Available Earnings",
      value: overview.withdrawalAmount,
      prefix: "$",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: index * 0.08,
          }}
          className="rounded-2xl border border-(--border) bg-(--surface) p-5 shadow-sm"
        >
          <p className="text-sm text-(--muted)">
            {card.title}
          </p>

          <h3 className="mt-3 text-3xl font-bold text-(--foreground)">
            {card.prefix ?? ""}
            {card?.value?.toLocaleString()}
          </h3>

          <p className="mt-1 text-xs text-(--muted)">
            {card.suffix ?? ""}
          </p>
        </motion.div>
      ))}
    </div>
  );
}