"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AlertTriangle,
  Ban,
  Trash2,
  Flag,
  Calendar,
  User,
} from "lucide-react";
import toast from "react-hot-toast";

import { Report } from "@/types";
import DynamicConfirmModal from "@/components/shared/DynamicConfirmModal";
import {
  SuspendReportedCampaign,
  DeleteReportedCampaign,
} from "@/lib/api/admin";

interface Props {
  reports: Report[];
  currentPage: number;
  totalPages: number;
  totalReports: number;
}

interface ModalState {
  open: boolean;
  type: "suspend" | "delete";
  campaignId: string | null;
  campaignTitle: string;
}

export default function ReportsTable({
  reports,
  currentPage,
  totalPages,
  totalReports,
}: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState<ModalState>({
    open: false,
    type: "suspend",
    campaignId: null,
    campaignTitle: "",
  });

  const handlePageChange = (page: number) => {
    router.push(`/dashboard/admin/reports?page=${page}`);
  };

  const openModal = (
    type: "suspend" | "delete",
    report: Report
  ) => {
    setModal({
      open: true,
      type,
      campaignId: report.campaign_id,
      campaignTitle: report.campaign_title,
    });
  };

  const closeModal = () =>
    setModal({ open: false, type: "suspend", campaignId: null, campaignTitle: "" });

  const handleConfirm = async () => {
    if (!modal.campaignId) return;
    setIsLoading(true);
    try {
      if (modal.type === "suspend") {
        const res = await SuspendReportedCampaign(modal.campaignId);
        if (res.success === false) throw new Error(res.message);
        toast.success("Campaign suspended");
      } else {
        const res = await DeleteReportedCampaign(modal.campaignId);
        if (res.success === false) throw new Error(res.message);
        toast.success("Campaign deleted");
      }
      closeModal();
      router.refresh();
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="rounded-3xl border border-white/10 bg-[#071425] p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/20 bg-rose-500/10 px-3 py-1 text-xs font-medium text-rose-400">
                <Flag className="h-3.5 w-3.5" />
                Fraud Reports
              </div>
              <h2 className="mt-3 text-3xl font-bold text-white">Reports</h2>
              <p className="mt-2 text-sm text-slate-400">
                Campaigns flagged as suspicious or fraudulent by supporters
              </p>
            </div>

            {/* Stat */}
            <div className="rounded-3xl border border-rose-500/20 bg-rose-500/[0.05] px-6 py-4">
              <p className="text-xs text-slate-400">Total Reports</p>
              <h3 className="mt-1 text-3xl font-bold text-white">
                {totalReports}
              </h3>
            </div>
          </div>
        </div>

        {/* ── Desktop Table ───────────────────────────────────────────────── */}
        <div className="hidden overflow-hidden rounded-3xl border border-white/10 bg-[#071425] lg:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Campaign
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Reporter
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Reason
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Date
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-300">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {reports.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-16 text-center text-slate-500"
                    >
                      No reports found.
                    </td>
                  </tr>
                )}
                {reports.map((report) => (
                  <tr
                    key={report._id}
                    className="border-b border-white/5 transition hover:bg-white/[0.03]"
                  >
                    {/* Campaign */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 shrink-0 text-rose-400" />
                        <span className="max-w-[200px] font-semibold text-white line-clamp-1">
                          {report.campaign_title}
                        </span>
                      </div>
                    </td>

                    {/* Reporter */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 shrink-0 text-slate-500" />
                        <div>
                          <p className="text-sm font-medium text-white">
                            {report.reporter_name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {report.reporter_email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Reason */}
                    <td className="px-6 py-5">
                      <p className="max-w-xs text-sm text-slate-300 line-clamp-2">
                        {report.reason}
                      </p>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-5 text-sm text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-slate-500" />
                        {new Date(report.createdAt).toLocaleDateString()}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openModal("suspend", report)}
                          className="flex items-center gap-1.5 rounded-xl border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-xs font-medium text-amber-400 transition hover:bg-amber-500/20"
                        >
                          <Ban className="h-3.5 w-3.5" />
                          Suspend
                        </button>
                        <button
                          onClick={() => openModal("delete", report)}
                          className="flex items-center gap-1.5 rounded-xl border border-rose-500/20 bg-rose-500/10 px-3 py-2 text-xs font-medium text-rose-400 transition hover:bg-rose-500/20"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
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
          {reports.length === 0 && (
            <p className="py-10 text-center text-slate-500">No reports found.</p>
          )}
          {reports.map((report) => (
            <div
              key={report._id}
              className="rounded-3xl border border-white/10 bg-[#071425] p-5"
            >
              {/* Campaign */}
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-rose-500/10">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                </div>
                <div className="min-w-0">
                  <h3 className="truncate font-bold text-white">
                    {report.campaign_title}
                  </h3>
                  <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                    <Calendar className="h-3 w-3" />
                    {new Date(report.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Info Grid */}
              <div className="mt-4 grid grid-cols-1 gap-3">
                <div className="rounded-2xl border border-white/5 bg-[#020817] p-3">
                  <p className="text-xs text-slate-500">Reporter</p>
                  <p className="mt-1 text-sm font-medium text-white">
                    {report.reporter_name}
                  </p>
                  <p className="text-xs text-slate-500">{report.reporter_email}</p>
                </div>
                <div className="rounded-2xl border border-white/5 bg-[#020817] p-3">
                  <p className="text-xs text-slate-500">Reason</p>
                  <p className="mt-1 text-sm text-slate-300">{report.reason}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => openModal("suspend", report)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-amber-500/20 bg-amber-500/10 py-2.5 text-sm font-medium text-amber-400 transition hover:bg-amber-500/20"
                >
                  <Ban className="h-4 w-4" />
                  Suspend
                </button>
                <button
                  onClick={() => openModal("delete", report)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 py-2.5 text-sm font-medium text-rose-400 transition hover:bg-rose-500/20"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ── Pagination ─────────────────────────────────────────────────── */}
        {totalPages > 1 && (
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="text-sm text-slate-400">
              Page{" "}
              <span className="font-semibold text-white">{currentPage}</span>{" "}
              of{" "}
              <span className="font-semibold text-white">{totalPages}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="rounded-xl border border-white/10 bg-[#071425] px-4 py-2 text-sm text-white transition hover:border-rose-500/30 hover:bg-rose-500/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>
              <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-2 text-sm font-semibold text-rose-400">
                {currentPage}
              </div>
              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="rounded-xl border border-white/10 bg-[#071425] px-4 py-2 text-sm text-white transition hover:border-rose-500/30 hover:bg-rose-500/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Confirm Modal ────────────────────────────────────────────────── */}
      <DynamicConfirmModal
        isOpen={modal.open}
        isLoading={isLoading}
        onClose={closeModal}
        onConfirm={handleConfirm}
        variant={modal.type === "delete" ? "danger" : "warning"}
        title={
          modal.type === "suspend"
            ? "Suspend Campaign"
            : "Delete Campaign"
        }
        description={
          modal.type === "suspend"
            ? `Are you sure you want to suspend "${modal.campaignTitle}"? It will be hidden from supporters until reinstated.`
            : `Are you sure you want to permanently delete "${modal.campaignTitle}"? This action cannot be undone.`
        }
        confirmText={modal.type === "suspend" ? "Suspend" : "Delete"}
        cancelText="Cancel"
      />
    </>
  );
}
