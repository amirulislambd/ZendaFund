"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, XCircle } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => Promise<void> | void;
  isLoading?: boolean;
}

export default function RejectCampaignModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}: Props) {
  const [reason, setReason] = useState("");

  const handleClose = () => {
    if (isLoading) return;
    setReason("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
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
              bg-[#0f172a]
              shadow-[0_0_50px_rgba(239,68,68,.15)]
            "
          >
            <div className="flex items-center justify-between border-b border-white/10 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                  <XCircle size={20} />
                </div>
                <h2 className="text-lg font-bold text-white">
                  Reject Campaign
                </h2>
              </div>

              <button
                onClick={handleClose}
                disabled={isLoading}
                className="rounded-xl p-2 text-slate-400 transition hover:bg-white/5 hover:text-white disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 p-6">
              <p className="text-sm text-slate-400">
                Please provide a reason for rejecting this campaign. This
                will be sent to the creator.
              </p>

              <textarea
                rows={4}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g. Campaign details are incomplete or misleading..."
                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none focus:border-red-400"
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={handleClose}
                  disabled={isLoading}
                  className="rounded-xl px-5 py-2.5 font-medium text-slate-300 transition hover:bg-white/5 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  onClick={() => onConfirm(reason.trim())}
                  disabled={!reason.trim() || isLoading}
                  className="rounded-xl bg-red-500 px-5 py-2.5 font-medium text-white transition hover:bg-red-400 disabled:opacity-50"
                >
                  {isLoading ? "Rejecting..." : "Reject Campaign"}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}