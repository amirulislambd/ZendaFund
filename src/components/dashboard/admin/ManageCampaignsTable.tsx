"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Search, LayoutList, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import { AdminCampaign } from "@/types";
import DynamicConfirmModal from "@/components/shared/DynamicConfirmModal";
import { AdminDeleteCampaign } from "@/lib/api/admin";

interface Props {
  campaigns: AdminCampaign[];
  currentPage: number;
  totalPages: number;
  totalCampaigns: number;
}

const statusBadge = (status: string) => {
  if (status === "approved")
    return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
  if (status === "pending")
    return "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20";
  if (status === "rejected")
    return "bg-rose-500/10 text-rose-400 border border-rose-500/20";
  return "bg-slate-500/10 text-slate-400 border border-slate-500/20";
};

export default function ManageCampaignsTable({
  campaigns,
  currentPage,
  totalPages,
  totalCampaigns,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  /* ─── debounced search ─────────────────────────────────────────────────── */
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (search.trim()) {
        params.set("search", search);
      } else {
        params.delete("search");
      }
      params.set("page", "1");
      router.push(`/dashboard/admin/manage-campaigns?${params.toString()}`);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/dashboard/admin/manage-campaigns?${params.toString()}`);
  };

  const openModal = (campaign: AdminCampaign) => {
    setSelectedId(campaign._id);
    setSelectedTitle(campaign.title);
    setModalOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedId) return;
    setIsLoading(true);
    try {
      const res = await AdminDeleteCampaign(selectedId);
      if (res.success === false) throw new Error(res.message);
      toast.success("Campaign deleted successfully");
      setModalOpen(false);
      router.refresh();
    } catch (err: any) {
      toast.error(err?.message || "Failed to delete campaign");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="rounded-3xl border border-white/10 bg-[#071425] p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-400">
                <LayoutList className="h-3.5 w-3.5" />
                Campaign Management
              </div>
              <h2 className="mt-3 text-3xl font-bold text-white">
                Manage Campaigns
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                View and delete campaigns across the platform
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search campaigns…"
                className="w-full rounded-2xl border border-white/10 bg-[#020817] py-3 pl-11 pr-4 text-white outline-none transition focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* ── Stat card ──────────────────────────────────────────────────── */}
        <div className="rounded-3xl border border-white/10 bg-[#071425] p-5">
          <p className="text-sm text-slate-400">Total Campaigns</p>
          <h3 className="mt-2 text-3xl font-bold text-white">
            {totalCampaigns.toLocaleString()}
          </h3>
        </div>

        {/* ── Desktop Table ───────────────────────────────────────────────── */}
        <div className="hidden overflow-hidden rounded-3xl border border-white/10 bg-[#071425] lg:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Campaign
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Creator
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Goal
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Raised
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-300">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {campaigns.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-16 text-center text-slate-500"
                    >
                      No campaigns found.
                    </td>
                  </tr>
                )}
                {campaigns.map((campaign) => (
                  <tr
                    key={campaign._id}
                    className="border-b border-white/5 transition hover:bg-white/[0.03]"
                  >
                    {/* Campaign */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <Image
                          src={campaign.imageUrl}
                          alt={campaign.title}
                          width={64}
                          height={64}
                          className="h-16 w-16 rounded-2xl object-cover"
                        />
                        <div>
                          <p className="max-w-xs font-semibold text-white line-clamp-1">
                            {campaign.title}
                          </p>
                          <p className="mt-0.5 text-xs text-slate-500">
                            {campaign.category}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Creator */}
                    <td className="px-6 py-5">
                      <p className="text-sm font-medium text-white">
                        {campaign.creatorName || "—"}
                      </p>
                      <p className="text-xs text-slate-500">
                        {campaign.creatorEmail}
                      </p>
                    </td>

                    {/* Goal */}
                    <td className="px-6 py-5 text-sm font-medium text-white">
                      ${campaign.goal.toLocaleString()}
                    </td>

                    {/* Raised */}
                    <td className="px-6 py-5 text-sm font-semibold text-cyan-400">
                      ${campaign.raisedAmount.toLocaleString()}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusBadge(campaign.status)}`}
                      >
                        {campaign.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5">
                      <div className="flex justify-end">
                        <button
                          onClick={() => openModal(campaign)}
                          className="flex items-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-2 text-sm font-medium text-rose-400 transition hover:bg-rose-500/20 hover:text-rose-300"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Mobile Cards ────────────────────────────────────────────────── */}
        <div className="space-y-4 lg:hidden">
          {campaigns.length === 0 && (
            <p className="py-10 text-center text-slate-500">
              No campaigns found.
            </p>
          )}
          {campaigns.map((campaign) => (
            <div
              key={campaign._id}
              className="overflow-hidden rounded-3xl border border-white/10 bg-[#071425]"
            >
              <Image
                src={campaign.imageUrl}
                alt={campaign.title}
                width={600}
                height={200}
                className="h-44 w-full object-cover"
              />
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-white">{campaign.title}</h3>
                    <p className="mt-0.5 text-xs text-slate-400">
                      {campaign.category}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${statusBadge(campaign.status)}`}
                  >
                    {campaign.status}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/5 bg-[#020817] p-3">
                    <p className="text-xs text-slate-500">Goal</p>
                    <p className="mt-1 font-semibold text-white">
                      ${campaign.goal.toLocaleString()}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/5 bg-[#020817] p-3">
                    <p className="text-xs text-slate-500">Raised</p>
                    <p className="mt-1 font-semibold text-cyan-400">
                      ${campaign.raisedAmount.toLocaleString()}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => openModal(campaign)}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 py-2.5 text-sm font-medium text-rose-400 transition hover:bg-rose-500/20"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Campaign
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ── Pagination ─────────────────────────────────────────────────── */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-sm text-slate-400">
            Page{" "}
            <span className="font-semibold text-white">{currentPage}</span> of{" "}
            <span className="font-semibold text-white">{totalPages}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="rounded-xl border border-white/10 bg-[#071425] px-4 py-2 text-sm text-white transition hover:border-indigo-500/30 hover:bg-indigo-500/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>
            <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-400">
              {currentPage}
            </div>
            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="rounded-xl border border-white/10 bg-[#071425] px-4 py-2 text-sm text-white transition hover:border-indigo-500/30 hover:bg-indigo-500/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* ── Confirm Modal ────────────────────────────────────────────────── */}
      <DynamicConfirmModal
        isOpen={modalOpen}
        isLoading={isLoading}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDelete}
        variant="danger"
        title="Delete Campaign"
        description={`Are you sure you want to permanently delete "${selectedTitle}"? This action cannot be undone and will remove all associated data.`}
        confirmText="Delete Campaign"
        cancelText="Cancel"
      />
    </>
  );
}
