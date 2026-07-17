"use client";

import { motion } from "framer-motion";

import { Contribution } from "@/types";
import ContributionStatusBadge from "../dashboard/supporter/Contributionstatusbadge";

type ContributionsTableProps = {
  contributions: Contribution[];
  showPaymentMethod?: boolean;
  showDate?: boolean;
  emptyMessage?: string;
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function ContributionsTable({
  contributions,
  showPaymentMethod = true,
  showDate = true,
  emptyMessage = "No contributions to show.",
}: ContributionsTableProps) {
  if (contributions.length === 0) {
    return (
      <div className="rounded-[28px] border border-(--border) bg-(--surface) p-10 text-center text-(--muted)">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div>
      {/* Table — md and up */}
      <div className="hidden overflow-hidden rounded-[28px] border border-(--border) bg-(--surface) md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead>
              <tr className="border-b border-(--border) bg-(--surface-muted) text-xs uppercase tracking-wide text-(--muted)">
                <th className="px-6 py-4 font-semibold">Campaign</th>
                <th className="px-6 py-4 font-semibold">Creator</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                {showPaymentMethod && (
                  <th className="px-6 py-4 font-semibold">Payment</th>
                )}
                {showDate && <th className="px-6 py-4 font-semibold">Date</th>}
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {contributions.map((contribution, index) => (
                <motion.tr
                  key={contribution.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: Math.min(index, 8) * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="border-b border-(--border) last:border-0 hover:bg-(--surface-muted)/60"
                >
                  <td className="px-6 py-4 font-medium text-(--foreground)">
                    {contribution.campaign_title}
                  </td>
                  <td className="px-6 py-4 text-(--muted)">
                    {contribution.creator_name ?? "—"}
                  </td>
                  <td className="px-6 py-4 font-semibold text-(--foreground)">
                    {contribution.Contribution_amount.toLocaleString()} credits
                  </td>
                  {showPaymentMethod && (
                    <td className="px-6 py-4 capitalize text-(--muted)">
                      {contribution.paymentMethod ?? "—"}
                    </td>
                  )}
                  {showDate && (
                    <td className="px-6 py-4 text-(--muted)">
                      {formatDate(contribution.current_date)}
                    </td>
                  )}
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <ContributionStatusBadge status={contribution.status} />
                      {contribution.status === "rejected" &&
                        (contribution.rejectionReason ||
                          contribution.message) && (
                          <p className="max-w-[18rem] text-xs text-red-300 wrap-break-word">
                            <span className="font-semibold">Reason:</span>{" "}
                            {contribution.rejectionReason ||
                              contribution.message}
                          </p>
                        )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cards — below md */}
      <div className="flex flex-col gap-4 md:hidden">
        {contributions.map((contribution, index) => (
          <motion.div
            key={contribution.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: Math.min(index, 8) * 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="rounded-3xl border border-(--border) bg-(--surface) p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-base font-semibold text-(--foreground)">
                {contribution.campaign_title}
              </h3>
              <ContributionStatusBadge status={contribution.status} />
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-(--muted)">Amount</span>
                <span className="font-semibold text-(--foreground)">
                  {contribution.Contribution_amount.toLocaleString()} credits
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-(--muted)">Creator</span>
                <span className="text-(--foreground)">
                  {contribution.creator_name ?? "—"}
                </span>
              </div>
              {showPaymentMethod && (
                <div className="flex items-center justify-between">
                  <span className="text-(--muted)">Payment</span>
                  <span className="capitalize text-(--foreground)">
                    {contribution.paymentMethod ?? "—"}
                  </span>
                </div>
              )}
              {showDate && (
                <div className="flex items-center justify-between">
                  <span className="text-(--muted)">Date</span>
                  <span className="text-(--foreground)">
                    {formatDate(contribution.current_date)}
                  </span>
                </div>
              )}
              {contribution.status === "rejected" &&
                (contribution.rejectionReason || contribution.message) && (
                  <div className="rounded-2xl border border-red-500/10 bg-red-500/5 p-4 text-sm text-red-200">
                    <p className="font-semibold">Rejection Reason</p>
                    <p className="mt-2 whitespace-pre-wrap wrap-break-word">
                      {contribution.rejectionReason || contribution.message}
                    </p>
                  </div>
                )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}