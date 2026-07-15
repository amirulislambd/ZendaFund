"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Coins } from "lucide-react";
import { Contribution } from "@/types";
import { RejectContribution } from "@/lib/actions/contribution";
import { useRouter } from "next/navigation";

type Props = {
  contribution: Contribution | null;
  open: boolean;
  onClose: () => void;
  onRejected?: () => void;
};

export default function RejectContributionModal({
  contribution,
  open,
  onClose,
  onRejected,
}: Props) {
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  if (!contribution) return null;

  const handleReject = async () => {
    if (!reason.trim()) return;
    setSubmitting(true);
    const res = await RejectContribution(contribution.id, reason.trim());
    router.refresh();
    setSubmitting(false);
    if (res?.status !== 500) {
      setReason("");
      onRejected?.();
      onClose();
    }
  };

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
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="
              fixed left-1/2 top-1/2 z-50
              w-[95%] max-w-md
              -translate-x-1/2 -translate-y-1/2
              overflow-hidden
              rounded-3xl
              border border-red-500/20
              bg-[#071425]
              shadow-[0_0_50px_rgba(239,68,68,.15)]
            "
          >
            {/* Header */}
            <div className="border-b border-white/10 bg-gradient-to-r from-[#2a0505] via-[#310707] to-[#450a0a] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-400">Reject Contribution</p>
                  <h2 className="mt-1 text-2xl font-bold text-white">
                    {contribution.Supporter_name}
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
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-2 text-cyan-400">
                    <User size={16} />
                    <span className="text-sm">Supporter</span>
                  </div>
                  <p className="mt-2 truncate font-semibold text-white">
                    {contribution.Supporter_name}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <Coins size={16} />
                    <span className="text-sm">Amount</span>
                  </div>
                  <p className="mt-2 font-semibold text-white">
                    {contribution.Contribution_amount} Credits
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-red-400">
                  Rejection Reason
                </h3>
                <textarea
                  rows={4}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Why is this contribution being rejected?"
                  className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none focus:border-red-400"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={onClose}
                  disabled={submitting}
                  className="rounded-xl px-5 py-2.5 font-medium text-slate-300 transition hover:bg-white/5 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReject}
                  disabled={!reason.trim() || submitting}
                  className="rounded-xl bg-red-500 px-5 py-2.5 font-medium text-white transition hover:bg-red-400 disabled:opacity-50"
                >
                  {submitting ? "Rejecting..." : "Confirm Reject"}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
