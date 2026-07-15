"use client";

import { motion } from "framer-motion";
import {
  Users,
  UserCheck,
  Coins,
  CreditCard,
} from "lucide-react";

interface Props {
  stats: {
    totalSupporters: number;
    totalCreators: number;
    totalAvailableCredits: number;
    totalPaymentsProcessed: number;
  };
}

export default function AdminDashboardStats({
  stats,
}: Props) {
  const cards = [
    {
      title: "Total Supporters",
      value: stats.totalSupporters,
      icon: Users,
      color: "from-cyan-500/20 to-transparent",
      iconBg: "bg-cyan-500/15",
      iconColor: "text-cyan-400",
    },
    {
      title: "Total Creators",
      value: stats.totalCreators,
      icon: UserCheck,
      color: "from-emerald-500/20 to-transparent",
      iconBg: "bg-emerald-500/15",
      iconColor: "text-emerald-400",
    },
    {
      title: "Available Credits",
      value: stats.totalAvailableCredits,
      icon: Coins,
      color: "from-yellow-500/20 to-transparent",
      iconBg: "bg-yellow-500/15",
      iconColor: "text-yellow-400",
    },
    {
      title: "Payments Processed",
      value: stats.totalPaymentsProcessed,
      icon: CreditCard,
      color: "from-violet-500/20 to-transparent",
      iconBg: "bg-violet-500/15",
      iconColor: "text-violet-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: index * 0.08,
            }}
            whileHover={{
              y: -6,
            }}
            className="
              group
              relative
              overflow-hidden
              rounded-3xl
              border
              border-slate-700/50
              bg-[#0f172a]
              p-6
              shadow-xl
              transition-all
              duration-300
            "
          >
            {/* Gradient Glow */}
            <div
              className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${card.color}`}
            />

            {/* Content */}
            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">
                  {card.title}
                </p>

                <h3 className="mt-4 text-4xl font-bold text-white">
                  {card.value.toLocaleString()}
                </h3>

                <p className="mt-2 text-xs text-slate-500">
                  Live system metrics
                </p>
              </div>

              <div
                className={`
                  ${card.iconBg}
                  rounded-2xl
                  p-3
                  backdrop-blur-sm
                  transition-transform
                  duration-300
                  group-hover:scale-110
                `}
              >
                <Icon
                  className={`size-6 ${card.iconColor}`}
                />
              </div>
            </div>

            {/* Bottom Accent Line */}
            <div
              className={`
                absolute
                bottom-0
                left-0
                h-1
                w-full
                bg-gradient-to-r
                ${card.color}
              `}
            />
          </motion.div>
        );
      })}
    </div>
  );
}