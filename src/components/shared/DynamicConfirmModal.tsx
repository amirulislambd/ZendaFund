"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  X,
} from "lucide-react";

type Variant =
  | "success"
  | "danger"
  | "warning"
  | "info";

interface DynamicConfirmModalProps {
  isOpen: boolean;
  title: string;
  description: string;

  confirmText?: string;
  cancelText?: string;

  variant?: Variant;

  isLoading?: boolean;

  onClose: () => void;
  onConfirm: () => void | Promise<void>;
}

export default function DynamicConfirmModal({
  isOpen,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "info",
  isLoading = false,
  onClose,
  onConfirm,
}: DynamicConfirmModalProps) {
  const styles = {
    success: {
      icon: <CheckCircle2 className="h-8 w-8 text-emerald-400" />,
      badge: "bg-emerald-500/10 text-emerald-400",
      button:
        "bg-emerald-500 hover:bg-emerald-400 text-white",
    },

    danger: {
      icon: <AlertTriangle className="h-8 w-8 text-rose-400" />,
      badge: "bg-rose-500/10 text-rose-400",
      button:
        "bg-rose-500 hover:bg-rose-400 text-white",
    },

    warning: {
      icon: <AlertTriangle className="h-8 w-8 text-amber-400" />,
      badge: "bg-amber-500/10 text-amber-400",
      button:
        "bg-amber-500 hover:bg-amber-400 text-black",
    },

    info: {
      icon: <Info className="h-8 w-8 text-cyan-400" />,
      badge: "bg-cyan-500/10 text-cyan-400",
      button:
        "bg-cyan-500 hover:bg-cyan-400 text-white",
    },
  };

  const current = styles[variant];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
            }}
            transition={{ duration: 0.25 }}
            className="
              fixed
              left-1/2
              top-1/2
              z-50
              w-[95%]
              max-w-md
              -translate-x-1/2
              -translate-y-1/2
              overflow-hidden
              rounded-3xl
              border
              border-white/10
              bg-[#071425]
              shadow-[0_0_40px_rgba(0,0,0,.35)]
            "
          >
            <div className="border-b border-white/10 p-5">
              <div className="flex items-center justify-between">
                <div
                  className={`rounded-xl p-3 ${current.badge}`}
                >
                  {current.icon}
                </div>

                <button
                  onClick={onClose}
                  className="rounded-xl p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-xl font-bold text-white">
                {title}
              </h2>

              <p className="mt-3 leading-7 text-slate-300">
                {description}
              </p>

              <div className="mt-8 flex justify-end gap-3">
                <button
                  onClick={onClose}
                  disabled={isLoading}
                  className="
                    rounded-xl
                    border
                    border-white/10
                    px-5
                    py-2.5
                    text-white
                    transition
                    hover:bg-white/5
                  "
                >
                  {cancelText}
                </button>

                <button
                  onClick={onConfirm}
                  disabled={isLoading}
                  className={`
                    rounded-xl
                    px-5
                    py-2.5
                    font-medium
                    transition
                    ${current.button}
                  `}
                >
                  {isLoading
                    ? "Processing..."
                    : confirmText}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}