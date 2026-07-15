"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Pencil,
  Trash2,
  FolderKanban,
  Coins,
  CalendarDays,
} from "lucide-react";

interface Campaign {
  _id: string;
  title: string;
  category: string;
  goal: number;
  raisedAmount: number;
  deadline: string;
  status: "pending" | "approved" | "rejected";
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface Props {
  campaigns: Campaign[];
  pagination: Pagination;
}

export default function MyCampaignTable({
  campaigns,
  pagination,
}: Props) {
  return (
    <>
      {/* Mobile Cards */}
      <div className="space-y-4 md:hidden">
        {campaigns.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-[#071425] p-10 text-center">
            <FolderKanban className="mx-auto h-12 w-12 text-cyan-400/50" />

            <h3 className="mt-4 text-lg font-semibold text-white">
              No Campaigns Found
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              You haven't created any campaigns yet.
            </p>
          </div>
        ) : (
          campaigns.map((campaign, index) => (
            <motion.div
              key={campaign._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.25,
                delay: index * 0.05,
              }}
              className="rounded-3xl border border-white/10 bg-[#071425] p-5 shadow-[0_15px_40px_rgba(0,0,0,.25)]"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="line-clamp-2 text-lg font-semibold text-white">
                  {campaign.title}
                </h3>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                    campaign.status === "approved"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : campaign.status === "pending"
                      ? "bg-amber-500/10 text-amber-400"
                      : "bg-rose-500/10 text-rose-400"
                  }`}
                >
                  {campaign.status}
                </span>
              </div>

              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">
                    Category
                  </span>

                  <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs text-cyan-400">
                    {campaign.category}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">
                    Goal
                  </span>

                  <span className="font-medium text-white">
                    {campaign.goal.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">
                    Raised
                  </span>

                  <span className="font-semibold text-emerald-400">
                    {campaign.raisedAmount.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">
                    Deadline
                  </span>

                  <span className="text-white">
                    {new Date(
                      campaign.deadline
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="mt-5 flex gap-3">
                <Link
                  href={`/dashboard/creator/campaigns/myCampaigns/${campaign._id}`}
                  className="
                    flex flex-1 items-center justify-center
                    rounded-xl
                    border border-sky-500/20
                    bg-sky-500/10
                    py-3
                    text-sky-400
                  "
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </Link>

                <button
                  className="
                    flex flex-1 items-center justify-center
                    rounded-xl
                    border border-rose-500/20
                    bg-rose-500/10
                    py-3
                    text-rose-400
                  "
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div><div className="hidden md:block">
  <motion.div
    initial={{ opacity: 0, y: 25 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="overflow-hidden rounded-3xl border border-cyan-500/10 bg-[#071425] shadow-[0_20px_60px_rgba(0,0,0,.25)]"
  >
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-white/10 bg-white/5 text-left">
            <th className="px-6 py-5 text-sm font-semibold text-slate-300">
              Campaign
            </th>

            <th className="px-6 py-5 text-sm font-semibold text-slate-300">
              Category
            </th>

            <th className="px-6 py-5 text-sm font-semibold text-slate-300">
              Goal
            </th>

            <th className="px-6 py-5 text-sm font-semibold text-slate-300">
              Raised
            </th>

            <th className="px-6 py-5 text-sm font-semibold text-slate-300">
              Deadline
            </th>

            <th className="px-6 py-5 text-sm font-semibold text-slate-300">
              Status
            </th>

            <th className="px-6 py-5 text-center text-sm font-semibold text-slate-300">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {campaigns.length === 0 ? (
            <tr>
              <td colSpan={7}>
                <div className="flex flex-col items-center justify-center py-16">
                  <FolderKanban className="h-12 w-12 text-cyan-400/50" />

                  <h3 className="mt-4 text-lg font-semibold text-white">
                    No Campaigns Found
                  </h3>

                  <p className="mt-2 text-sm text-slate-400">
                    You haven't created any campaigns yet.
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            campaigns.map((campaign, index) => (
              <motion.tr
                key={campaign._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.25,
                  delay: index * 0.05,
                }}
                className="border-b border-white/5 transition-all hover:bg-white/[0.03]"
              >
                <td className="px-6 py-5">
                  <div>
                    <h3 className="font-semibold text-white">
                      {campaign.title}
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                      Campaign Project
                    </p>
                  </div>
                </td>

                <td className="px-6 py-5">
                  <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400">
                    {campaign.category}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Coins className="h-4 w-4 text-cyan-400" />
                    {campaign.goal.toLocaleString()}
                  </div>
                </td>

                <td className="px-6 py-5">
                  <span className="font-semibold text-emerald-400">
                    {campaign.raisedAmount.toLocaleString()}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <div className="flex items-center gap-2 text-slate-400">
                    <CalendarDays className="h-4 w-4" />
                    {new Date(
                      campaign.deadline
                    ).toLocaleDateString()}
                  </div>
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                      campaign.status === "approved"
                        ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                        : campaign.status === "pending"
                        ? "border border-amber-500/20 bg-amber-500/10 text-amber-400"
                        : "border border-rose-500/20 bg-rose-500/10 text-rose-400"
                    }`}
                  >
                    {campaign.status}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-center gap-3">
                    {/* Edit */}
                    <Link
                       href={`/dashboard/creator/campaigns/myCampaigns/${campaign._id}`}
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
                      <Pencil size={16} />
                    </Link>

                    {/* Delete */}
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
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </motion.div>
</div>      {/* Pagination */}
      <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-3xl border border-cyan-500/10 bg-[#071425] px-6 py-5 sm:flex-row">
        <p className="text-sm text-slate-400">
          Total Campaigns:
          <span className="ml-2 font-semibold text-cyan-400">
            {pagination.total}
          </span>
        </p>

        <div className="flex items-center gap-3">
          <button
            disabled={!pagination.hasPrevPage}
            className="
              rounded-xl
              border border-white/10
              bg-white/5
              px-4 py-2
              text-sm
              text-white
              transition-all
              hover:border-cyan-500/30
              hover:bg-cyan-500/10
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            Previous
          </button>

          <span className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-400">
            {pagination.page} / {pagination.totalPages || 1}
          </span>

          <button
            disabled={!pagination.hasNextPage}
            className="
              rounded-xl
              border border-white/10
              bg-white/5
              px-4 py-2
              text-sm
              text-white
              transition-all
              hover:border-cyan-500/30
              hover:bg-cyan-500/10
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}