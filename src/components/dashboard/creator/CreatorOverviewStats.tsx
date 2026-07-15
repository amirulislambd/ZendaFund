"use client";

import { motion } from "framer-motion";
import {
  FolderKanban,
  Activity,
  Coins,
} from "lucide-react";

interface Stats {
  totalCampaigns: number;
  activeCampaigns: number;
  totalRaisedCredits: number;
}

interface Props {
  stats: Stats;
}

export default function CreatorOverviewStats({
  stats,
}: Props) {
  const cards = [
    {
      title: "Total Campaigns",
      value: stats.totalCampaigns,
      icon: FolderKanban,
      badge: "+ New",
      variant: "default",
    },
    {
      title: "Active Campaigns",
      value: stats.activeCampaigns,
      icon: Activity,
      badge: "● Live",
      variant: "default",
    },
    {
      title: "Raised Credits",
      value: stats.totalRaisedCredits,
      icon: Coins,
      badge: "Approved Capital",
      variant: "featured",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.35,
              delay: index * 0.1,
            }}
            whileHover={{
              y: -5,
              scale: 1.01,
            }}
            className={`
              group relative overflow-hidden rounded-3xl border p-6 transition-all duration-300

              ${
                card.variant === "featured"
                  ? "border-cyan-500/20 bg-gradient-to-br from-emerald-500/20 via-cyan-500/10 to-cyan-600/20 shadow-[0_0_40px_rgba(6,182,212,0.15)]"
                  : "border-(--border) bg-(--surface)"
              }
            `}
          >
            {/* Glow */}
            <div className="absolute right-0 top-0 h-40 w-40 bg-cyan-500/10 blur-3xl transition-all duration-500 group-hover:bg-cyan-500/20" />

            {/* Header */}
            <div className="relative flex items-start justify-between">
              <div
                className={`
                  rounded-2xl p-3

                  ${
                    card.variant === "featured"
                      ? "bg-white/10"
                      : "bg-(--surface-muted)"
                  }
                `}
              >
                <Icon
                  className={`
                    h-6 w-6

                    ${
                      card.variant === "featured"
                        ? "text-cyan-300"
                        : "text-cyan-400"
                    }
                  `}
                />
              </div>

              <span
                className={`
                  rounded-full px-3 py-1 text-xs font-medium

                  ${
                    card.variant === "featured"
                      ? "bg-white/10 text-cyan-200"
                      : "bg-cyan-500/10 text-cyan-400"
                  }
                `}
              >
                {card.badge}
              </span>
            </div>

            {/* Content */}
            <div className="relative mt-10">
              <p
                className={`
                  text-sm

                  ${
                    card.variant === "featured"
                      ? "text-slate-200"
                      : "text-(--muted)"
                  }
                `}
              >
                {card.title}
              </p>

              <h3
                className={`
                  mt-4 text-5xl font-bold tracking-tight

                  ${
                    card.variant === "featured"
                      ? "text-white"
                      : "text-(--foreground)"
                  }
                `}
              >
                {card.value.toLocaleString()}
              </h3>

              {card.title === "Raised Credits" && (
                <p className="mt-2 text-lg font-medium text-cyan-200">
                  Credits
                </p>
              )}
            </div>

            {/* Bottom Accent */}
            <div
              className={`
                absolute bottom-0 left-0 h-1 w-full

                ${
                  card.variant === "featured"
                    ? "bg-gradient-to-r from-cyan-400 to-emerald-400"
                    : "bg-gradient-to-r from-cyan-500/0 via-cyan-500/30 to-cyan-500/0"
                }
              `}
            />
          </motion.div>
        );
      })}
    </div>
  );
}