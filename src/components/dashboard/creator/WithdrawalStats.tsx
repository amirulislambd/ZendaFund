"use client";

import { motion } from "framer-motion";

interface WithdrawalOverview {
  totalRaisedCredits: number;
  withdrawnCredits: number;
  availableCredits: number;
  availableEarnings: number;
}

interface Props {
  overview: WithdrawalOverview;
}

export default function WithdrawalStats({ overview }: Props) {
  const cards = [
    {
      title: "Total Raised Credits",
      value: overview.totalRaisedCredits,
      suffix: "Credits",
    },
    {
      title: "Withdrawn Credits",
      value: overview.withdrawnCredits,
      suffix: "Credits",
    },
    {
      title: "Available Credits",
      value: overview.availableCredits,
      suffix: "Credits",
    },
    {
      title: "Available Earnings",
      value: overview.availableEarnings,
      prefix: "$",
    },
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-cyan-500/10 bg-gradient-to-r from-[#050d2a] via-[#071331] to-[#0a2a45] p-8">
      <div className="absolute right-0 top-0 h-full w-96 bg-cyan-500/5 blur-3xl" />

      <div className="relative grid gap-6 lg:grid-cols-2">
        {/* Left Content */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-400">
            💳 Withdrawal Center
          </div>

          <h1 className="mt-4 text-4xl font-bold text-white">Withdrawals</h1>

          <p className="mt-3 max-w-xl text-slate-300">
            Manage your earnings, track available credits, and submit secure
            withdrawal requests to your preferred payment method.
          </p>
        </div>

        {/* Right Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">
            <p className="text-xs text-slate-400">Total Raised</p>
            <h3 className="mt-2 text-2xl font-bold text-white">
              {overview.totalRaisedCredits}
            </h3>
          </div>

          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">
            <p className="text-xs text-slate-400">Withdrawn</p>
            <h3 className="mt-2 text-2xl font-bold text-white">
              {overview.withdrawnCredits}
            </h3>
          </div>

          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">
            <p className="text-xs text-slate-400">Available Credits</p>
            <h3 className="mt-2 text-2xl font-bold text-emerald-400">
              {overview.availableCredits}
            </h3>
          </div>

          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">
            <p className="text-xs text-slate-400">Earnings</p>
            <h3 className="mt-2 text-2xl font-bold text-cyan-400">
              ${overview.availableEarnings}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}