"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Contribution } from "@/types";

type RecentActivityTableProps = {
  contributions: Contribution[];
};

const STATUS_STYLES: Record<string, string> = {
  approved: "bg-green-500/10 text-green-600",
  pending: "bg-amber-500/10 text-amber-600",
  rejected: "bg-red-500/10 text-red-600",
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function RecentActivityTable({ contributions }: RecentActivityTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="rounded-2xl border border-(--border) bg-(--surface) p-6"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-(--foreground)">Recent activity</h2>
        <Link
          href="/dashboard/supporter/my-contributions"
          className="text-sm font-semibold text-(--accent) hover:opacity-80"
        >
          View all history
        </Link>
      </div>

      {contributions.length === 0 ? (
        <p className="py-8 text-center text-sm text-(--muted)">
          You haven't made any contributions yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-(--border) text-left text-xs font-semibold uppercase tracking-wide text-(--muted)">
                <th className="py-2.5">Campaign</th>
                <th className="py-2.5">Date</th>
                <th className="py-2.5">Amount</th>
                <th className="py-2.5">Status</th>
              </tr>
            </thead>
            <tbody>
              {contributions.map((contribution: any, index) => (
                <motion.tr
                  key={contribution.id ?? contribution._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border-b border-(--border) last:border-0"
                >
                  <td className="py-3 font-medium text-(--foreground)">
                    {contribution.campaign_title}
                  </td>
                  <td className="py-3 text-(--muted)">{formatDate(contribution.current_date)}</td>
                  <td className="py-3 text-(--foreground)">
                    {contribution.Contribution_amount.toLocaleString()} credits
                  </td>
                  <td className="py-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                        STATUS_STYLES[contribution.status] ?? "bg-(--surface-muted) text-(--muted)"
                      }`}
                    >
                      {contribution.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
}