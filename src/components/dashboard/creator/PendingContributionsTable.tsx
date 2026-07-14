"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, CheckCircle2, XCircle, CreditCard } from "lucide-react";

import { Contribution } from "@/types";
import { useState } from "react";
import ContributionDetailsModal from "@/components/ui/ContributionDetailsModal";

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface Props {
  contributions: Contribution[];
  pagination: Pagination;
}

export default function PendingContributionsTable({
  contributions,
  pagination,
}: Props) {
  const [selectedContribution, setSelectedContribution] =
    useState<Contribution | null>(null);

  const [openModal, setOpenModal] = useState(false);

  if (!contributions?.length) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-3xl border border-dashed border-(--border) bg-(--surface) p-12 text-center"
      >
        <h3 className="text-xl font-semibold text-(--foreground)">
          No Pending Contributions
        </h3>

        <p className="mt-2 text-sm text-(--muted)">
          All contributions have already been reviewed.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl border border-cyan-500/10 bg-gradient-to-r from-[#050d2a] via-[#071331] to-[#0a2a45] p-8">
        {/* Background Glow */}
        <div className="absolute right-0 top-0 h-full w-72 bg-cyan-500/5 blur-3xl" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Left */}
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-400">
              ✦ Contribution Review
            </div>

            <h1 className="text-3xl font-bold text-white md:text-4xl">
              Contributions To Review
            </h1>

            <p className="mt-3 max-w-2xl text-slate-300">
              Review pending contributions submitted to your campaigns and
              decide whether to approve or reject them.
            </p>
          </div>

          {/* Right Stat Card */}
          <div className="w-full max-w-xs rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500/15">
                <CheckCircle2 className="h-7 w-7 text-cyan-400" />
              </div>

              <div>
                <p className="text-sm text-slate-300">Pending Reviews</p>

                <h2 className="text-4xl font-bold text-white">
                  {contributions.length}
                </h2>

                <p className="text-cyan-400">Awaiting Action</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- Mobile Cards ---------------- */}

      <div className="space-y-4 md:hidden">
        {contributions.map((contribution, index) => (
          <motion.div
            key={contribution.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: index * 0.05,
            }}
            className="rounded-3xl border border-(--border) bg-(--surface) p-5 shadow-sm"
          >
            <div className="space-y-4">
              <div>
                <p className="text-xs text-(--muted)">Supporter</p>

                <p className="font-semibold text-(--foreground)">
                  {contribution.Supporter_name}
                </p>
              </div>

              <div>
                <p className="text-xs text-(--muted)">Campaign</p>

                <p className="text-sm text-(--foreground)">
                  {contribution.campaign_title}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-(--muted)">Amount</p>

                  <p className="font-semibold text-(--accent)">
                    {contribution.Contribution_amount} Credits
                  </p>
                </div>

                <div>
                  <p className="text-xs text-(--muted)">Payment</p>

                  <span className="inline-flex items-center gap-1 rounded-full bg-(--surface-muted) px-3 py-1 text-xs">
                    <CreditCard size={12} />
                    {contribution.paymentMethod}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-xs text-(--muted)">Date</p>

                <p className="text-sm">
                  {new Date(contribution.current_date).toLocaleDateString()}
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => {
                    setSelectedContribution(contribution);
                    setOpenModal(true);
                  }}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-blue-500 px-3 py-2 text-sm font-medium text-blue-500 transition hover:bg-blue-500 hover:text-white"
                >
                  <Eye size={16} />
                  View
                </button>

                <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-green-500 px-3 py-2 text-sm font-medium text-green-500 transition hover:bg-green-500 hover:text-white">
                  <CheckCircle2 size={16} />
                  Approve
                </button>

                <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-500 px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-500 hover:text-white">
                  <XCircle size={16} />
                  Reject
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ---------------- Desktop Table ---------------- */}

      <div className="hidden overflow-hidden rounded-3xl border border-(--border) bg-(--surface) md:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-(--border) bg-(--surface-muted)">
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Supporter
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Campaign
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Amount
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Payment
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Date
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {contributions.map((contribution, index) => (
                <motion.tr
                  key={contribution.id}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.25,
                    delay: index * 0.05,
                  }}
                  className="border-b border-(--border) last:border-none"
                >
                  <td className="px-6 py-4 font-medium">
                    {contribution.Supporter_name}
                  </td>

                  <td className="max-w-[280px] px-6 py-4">
                    <p className="truncate">{contribution.campaign_title}</p>
                  </td>

                  <td className="px-6 py-4 font-semibold text-(--accent)">
                    {contribution.Contribution_amount}
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-(--surface-muted) px-3 py-1 text-xs">
                      {contribution.paymentMethod}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-(--muted)">
                    {new Date(contribution.current_date).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      {/* View */}
                      <button
                        onClick={() => {
                          setSelectedContribution(contribution);
                          setOpenModal(true);
                        }}
                        className="
      flex h-10 w-10 items-center justify-center
      rounded-xl
      border border-white/10
      bg-white/5
      text-sky-400
      transition-all duration-300
      hover:-translate-y-1
      hover:border-sky-400/30
      hover:bg-sky-500/10
      hover:shadow-[0_0_20px_rgba(56,189,248,.25)]
    "
                      >
                        <Eye size={16} />
                      </button>

                      {/* Approve */}
                      <button
                        className="
      flex h-10 w-10 items-center justify-center
      rounded-xl
      border border-white/10
      bg-white/5
      text-emerald-400
      transition-all duration-300
      hover:-translate-y-1
      hover:border-emerald-400/30
      hover:bg-emerald-500/10
      hover:shadow-[0_0_20px_rgba(16,185,129,.25)]
    "
                      >
                        <CheckCircle2 size={16} />
                      </button>

                      {/* Reject */}
                      <button
                        className="
      flex h-10 w-10 items-center justify-center
      rounded-xl
      border border-white/10
      bg-white/5
      text-rose-400
      transition-all duration-300
      hover:-translate-y-1
      hover:border-rose-400/30
      hover:bg-rose-500/10
      hover:shadow-[0_0_20px_rgba(244,63,94,.25)]
    "
                      >
                        <XCircle size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ---------------- Pagination ---------------- */}

      <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-(--border) bg-(--surface) p-4 sm:flex-row">
        <p className="text-sm text-(--muted)">
          Page {pagination.page} of {pagination.pages}
        </p>

        <div className="flex gap-2">
          <Link
            href={`?page=${pagination.page - 1}`}
            className={`rounded-xl border px-4 py-2 text-sm transition ${
              pagination.page <= 1
                ? "pointer-events-none opacity-50"
                : "hover:border-(--accent)"
            }`}
          >
            Previous
          </Link>

          <Link
            href={`?page=${pagination.page + 1}`}
            className={`rounded-xl border px-4 py-2 text-sm transition ${
              pagination.page >= pagination.pages
                ? "pointer-events-none opacity-50"
                : "hover:border-(--accent)"
            }`}
          >
            Next
          </Link>
        </div>
      </div>
      <ContributionDetailsModal
        contribution={selectedContribution}
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
}
