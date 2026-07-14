"use client";

import { motion } from "framer-motion";
import type { Payment } from "@/types";
import { CreditCard } from "lucide-react";

type PaymentHistoryTableProps = {
  payments: Payment[];
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function PaymentHistoryTable({ payments }: PaymentHistoryTableProps) {
    if (payments.length === 0) {
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-cyan-500/20 bg-gradient-to-br from-[#071126] via-[#08182f] to-[#0b2440] px-8 py-16 text-center"
          >
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-cyan-500/10">
              <CreditCard className="h-10 w-10 text-cyan-400" />
            </div>
      
            <h2 className="text-2xl font-bold text-white">
              No Payment History Yet
            </h2>
      
            <p className="mt-3 max-w-md text-sm leading-7 text-slate-300">
              You haven't purchased any credits yet. Once you buy credits using
              Stripe, your payment history will appear here.
            </p>
      
            <div className="mt-8 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400">
              Start by purchasing your first credit package 🚀
            </div>
          </motion.div>
        );
      }
  return (
    <>
 <div className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-[#050d2a] via-[#071331] to-[#0a2a45]">
  {/* Right Background Accent */}
  <div className="absolute inset-y-0 right-0 w-[35%] bg-gradient-to-l from-cyan-800/20 via-sky-900/15 to-transparent" />
  <div className="absolute -right-24 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

  <div className="relative z-10 flex flex-col gap-8 p-8 lg:flex-row lg:items-center lg:justify-between">
    {/* Left */}
    <div className="max-w-2xl">
      <div className="mb-4 inline-flex items-center gap-2 text-cyan-400">
        <CreditCard className="h-5 w-5" />
        <span className="text-base font-medium">
          Payment History
        </span>
      </div>

      <h1 className="text-3xl font-bold leading-tight text-white md:text-5xl">
        Track your credit
        <br />
        purchase history.
      </h1>

      <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
        View every credit purchase you've made, including payment amount,
        credits received, and transaction details.
      </p>
    </div>

    {/* Right Card */}
    <div className="rounded-2xl border border-cyan-500/20 bg-[#07162e]/80 p-6 backdrop-blur-md">
      <div className="flex items-center gap-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/15">
          <CreditCard className="h-8 w-8 text-cyan-400" />
        </div>

        <div>
          <p className="text-sm text-slate-300">
            Total Purchases
          </p>

          <h2 className="text-4xl font-bold text-white">
            {payments.length}
          </h2>

          <p className="text-sm font-medium text-cyan-400">
            Successful Payments
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
      {/* Desktop — table */}
      <div className="hidden overflow-x-auto rounded-2xl border border-(--border) bg-(--surface) md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-(--border) text-left text-xs font-semibold uppercase tracking-wide text-(--muted)">
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Credits</th>
              <th className="px-5 py-3">Amount</th>
              <th className="px-5 py-3">Transaction ID</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <motion.tr
                key={payment._id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: Math.min(index, 8) * 0.04 }}
                className="border-b border-(--border) last:border-0"
              >
                <td className="px-5 py-4 text-(--foreground)">{formatDate(payment.createdAt)}</td>
                <td className="px-5 py-4 font-semibold text-(--foreground)">
                  {payment.credits.toLocaleString()}
                </td>
                <td className="px-5 py-4 text-(--foreground)">${payment.amountUsd.toFixed(2)}</td>
                <td className="max-w-[180px] truncate px-5 py-4 font-mono text-xs text-(--muted)">
                  {payment.stripeSessionId}
                </td>
                <td className="px-5 py-4">
                  <span className="rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-medium capitalize text-green-600">
                    {payment.status}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile — Cards */}
<div className="space-y-4 md:hidden">
  {payments.map((payment, index) => (
    <motion.div
      key={payment._id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: Math.min(index, 8) * 0.05,
      }}
      whileHover={{ y: -2 }}
      className="rounded-2xl border border-(--border) bg-(--surface) p-5 shadow-sm"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-(--muted)">Purchase Date</p>
          <p className="mt-1 font-medium text-(--foreground)">
            {formatDate(payment.createdAt)}
          </p>
        </div>

        <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-600">
          {payment.status}
        </span>
      </div>

      <div className="my-4 h-px bg-(--border)" />

      {/* Info */}
      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-(--muted)">Credits</span>
          <span className="font-semibold text-(--foreground)">
            {payment.credits.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-(--muted)">Amount</span>
          <span className="font-semibold text-(--foreground)">
            ${payment.amountUsd.toFixed(2)}
          </span>
        </div>

        <div>
          <p className="mb-1 text-(--muted)">Transaction ID</p>

          <div className="rounded-lg bg-black/5 px-3 py-2 font-mono text-[11px] break-all text-(--foreground)">
            {payment.stripeSessionId}
          </div>
        </div>
      </div>
    </motion.div>
  ))}
</div>
    </>
  );
}