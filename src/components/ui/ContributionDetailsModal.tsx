"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, User, Mail, Coins, Calendar } from "lucide-react";
import { Contribution } from "@/types";

type Props = {
  contribution: Contribution | null;
  open: boolean;
  onClose: () => void;
};

export default function ContributionDetailsModal({
  contribution,
  open,
  onClose,
}: Props) {
  if (!contribution) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: .95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: .95 }}
            transition={{ duration: .25 }}
            className="
              fixed left-1/2 top-1/2 z-50
              w-[95%] max-w-2xl
              -translate-x-1/2 -translate-y-1/2
              overflow-hidden
              rounded-3xl
              border border-cyan-500/20
              bg-[#071425]
              shadow-[0_0_50px_rgba(34,211,238,.15)]
            "
          >
            {/* Header */}
            <div className="border-b border-white/10 bg-gradient-to-r from-[#050d2a] via-[#071331] to-[#0a2a45] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-cyan-400">
                    Contribution Details
                  </p>

                  <h2 className="mt-1 text-2xl font-bold text-white">
                    Review Submission
                  </h2>
                </div>

                <button
                  onClick={onClose}
                  className="rounded-xl p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="space-y-5 p-6">
              <div className="grid gap-4 md:grid-cols-2">

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-2 text-cyan-400">
                    <User size={16} />
                    <span className="text-sm">Supporter</span>
                  </div>

                  <p className="mt-2 font-semibold text-white">
                    {contribution.Supporter_name}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-2 text-cyan-400">
                    <Mail size={16} />
                    <span className="text-sm">Email</span>
                  </div>

                  <p className="mt-2 break-all text-white">
                    {contribution.Supporter_email}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <Coins size={16} />
                    <span className="text-sm">Amount</span>
                  </div>

                  <p className="mt-2 text-xl font-bold text-white">
                    {contribution.Contribution_amount} Credits
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-2 text-cyan-400">
                    <Calendar size={16} />
                    <span className="text-sm">Date</span>
                  </div>

                  <p className="mt-2 text-white">
                    {new Date(
                      contribution.current_date,
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <h3 className="text-sm font-medium text-cyan-400">
                  Campaign
                </h3>

                <p className="mt-2 text-white">
                  {contribution.campaign_title}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <h3 className="text-sm font-medium text-cyan-400">
                  Payment Method
                </h3>

                <p className="mt-2 capitalize text-white">
                  {contribution.paymentMethod}
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={onClose}
                  className="
                    rounded-xl
                    bg-cyan-500
                    px-5
                    py-2.5
                    font-medium
                    text-white
                    transition
                    hover:bg-cyan-400
                  "
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}