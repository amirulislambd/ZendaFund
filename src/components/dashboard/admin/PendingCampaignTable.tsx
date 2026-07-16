"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, Clock3, ShieldCheck, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import DynamicConfirmModal from "@/components/shared/DynamicConfirmModal";
import { useState } from "react";
import toast from "react-hot-toast";
import { UpdateCampaignStatus } from "@/lib/actions/campaign";
import RejectCampaignModal from "./RejectCampaignModal";

interface Campaign {
  _id: string;
  title: string;
  creatorName?: string;
  creatorEmail?: string;
  imageUrl: string;
  goal: number;
  raisedAmount: number;
  deadline: string;
  category: string;
  status: string;
}

interface Props {
  campaigns: Campaign[];
  currentPage: number;
  totalPages: number;
  totalCampaigns: number;
}

export default function PendingCampaignTable({
  campaigns,
  currentPage,
  totalPages,
  totalCampaigns,
}: Props) {
  const router = useRouter();
  const handlePageChange = (page: number) => {
    router.push(`/dashboard/admin/campaign-approvals?page=${page}`);
  };

  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);

  const [approveModalOpen, setApproveModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [rejectModalOpen, setRejectModalOpen] = useState(false);

  const handleApprove = async () => {
    if (!selectedCampaign) return;

    try {
      setIsLoading(true);

      const result = await UpdateCampaignStatus(selectedCampaign, "approved");

      toast.success(result.message);

      setApproveModalOpen(false);

      router.refresh();
    } catch (error) {
      toast.error("Failed to approve campaign");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async (reason: string) => {
    if (!selectedCampaign) return;

    try {
      setIsLoading(true);
      const result = await UpdateCampaignStatus(
        selectedCampaign,
        "rejected",
        reason,
      );
      toast.success(result.message);
      setRejectModalOpen(false);
      router.refresh();
    } catch (error) {
      toast.error("Failed to reject campaign");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-3xl  bg-[#0f172a] shadow-xl">
      {/* Header */}

      <div
        className="
    relative
    overflow-hidden
    rounded-3xl
    border
    border-slate-700/50
    bg-[#0f172a]
    p-6
    shadow-xl
  "
      >
        {/* Background Glow */}
        <div className="absolute -top-20 left-1/3 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="absolute -right-10 top-0 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Left Content */}
          <div className="flex items-start gap-5">
            <div
              className="
          flex
          h-16
          w-16
          shrink-0
          items-center
          justify-center
          rounded-2xl
          border
          border-cyan-500/20
          bg-cyan-500/10
        "
            >
              <ShieldCheck className="h-8 w-8 text-cyan-400" />
            </div>

            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white">
                Pending Campaign Approvals
              </h2>

              <p className="mt-2 max-w-2xl text-slate-400">
                Review submitted campaigns, verify creator information, and
                approve or reject fundraising requests before they become
                publicly visible on the platform.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400">
                  Campaign Review
                </span>

                <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-400">
                  Admin Control
                </span>
              </div>
            </div>
          </div>

          {/* Right Stats Card */}
          <div
            className="
        min-w-[220px]
        rounded-3xl
        border
        border-yellow-500/20
        bg-gradient-to-br
        from-yellow-500/10
        via-yellow-500/5
        to-transparent
        p-5
        shadow-lg
      "
          >
            <div className="flex items-center justify-between">
              <div
                className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            bg-yellow-500/10
          "
              >
                <Clock3 className="h-6 w-6 text-yellow-400" />
              </div>

              <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-300">
                Live
              </span>
            </div>

            <p className="mt-5 text-sm text-slate-400">Pending Requests</p>

            <h3 className="mt-1 text-5xl font-bold text-white">
              {campaigns.length}
            </h3>

            <p className="mt-2 text-xs text-yellow-400">
              Awaiting Admin Review
            </p>
          </div>
        </div>
      </div>

      {/* ========================= */}
      {/* Desktop & Tablet Table */}
      {/* ========================= */}

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700/50 bg-slate-900/20">
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
                Deadline
              </th>

              <th className="px-6 py-4 text-right text-sm font-semibold text-slate-300">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {campaigns.map((campaign, index) => (
              <motion.tr
                key={campaign._id}
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.05,
                }}
                className="
                  border-b
                  border-slate-700/30
                  transition-all
                  hover:bg-slate-800/20
                "
              >
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <Image
                      src={campaign.imageUrl}
                      alt={campaign.title}
                      width={70}
                      height={70}
                      className="h-[70px] w-[70px] rounded-2xl object-cover"
                    />

                    <div>
                      <h3 className="max-w-xs font-semibold text-white line-clamp-1">
                        {campaign.title}
                      </h3>

                      <p className="mt-1 text-xs text-slate-400">
                        {campaign.category}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-5">
                  <div>
                    <p className="font-medium text-white">
                      {campaign.creatorName}
                    </p>

                    <p className="text-xs text-slate-400">
                      {campaign.creatorEmail}
                    </p>
                  </div>
                </td>

                <td className="px-6 py-5 font-medium text-white">
                  ${campaign.goal.toLocaleString()}
                </td>

                <td className="px-6 py-5">
                  <span className="font-semibold text-cyan-400">
                    ${campaign.raisedAmount.toLocaleString()}
                  </span>
                </td>

                <td className="px-6 py-5 text-slate-300">
                  {new Date(campaign.deadline).toLocaleDateString()}
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => {
                        setSelectedCampaign(campaign._id);
                        setApproveModalOpen(true);
                      }}
                      className="
                        flex items-center gap-2
                        rounded-xl
                        bg-emerald-600
                        px-4 py-2
                        text-sm font-medium
                        text-white
                        transition
                        hover:bg-emerald-700
                      "
                    >
                      <CheckCircle2 size={16} />
                      Approve
                    </button>

                    <button
                      onClick={() => {
                        setSelectedCampaign(campaign._id);
                        setRejectModalOpen(true);
                      }}
                      className="
                        flex items-center gap-2
                        rounded-xl
                        border
                        border-red-500/40
                        px-4 py-2
                        text-sm font-medium
                        text-red-400
                        transition
                        hover:bg-red-500/10
                      "
                    >
                      <XCircle size={16} />
                      Reject
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        <div className="border-t border-slate-700/50 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-slate-400">
              Showing page {currentPage} of {totalPages}
              {" • "}
              Total {totalCampaigns} campaigns
            </p>

            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="rounded-xl border border-slate-700 px-4 py-2 disabled:opacity-50"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`h-10 w-10 rounded-xl ${
                      currentPage === page
                        ? "bg-cyan-500 text-white"
                        : "border border-slate-700"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="rounded-xl border border-slate-700 px-4 py-2 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================= */}
      {/* Mobile Cards */}
      {/* ========================= */}

      <div className="space-y-5 p-4 md:hidden">
        {campaigns.map((campaign, index) => (
          <motion.div
            key={campaign._id}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.05,
            }}
            whileHover={{
              y: -2,
            }}
            className="
              overflow-hidden
              rounded-3xl
              border
              border-slate-700/50
              bg-slate-900/40
            "
          >
            <Image
              src={campaign.imageUrl}
              alt={campaign.title}
              width={600}
              height={300}
              className="h-52 w-full object-cover"
            />

            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {campaign.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    {campaign.category}
                  </p>
                </div>

                <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-400">
                  Pending
                </span>
              </div>

              <div className="mt-4">
                <p className="font-medium text-white">{campaign.creatorName}</p>

                <p className="text-sm text-slate-400">
                  {campaign.creatorEmail}
                </p>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500">Goal</p>

                  <p className="font-semibold text-white">
                    ${campaign.goal.toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">Raised</p>

                  <p className="font-semibold text-cyan-400">
                    ${campaign.raisedAmount.toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">Deadline</p>

                  <p className="font-semibold text-white">
                    {new Date(campaign.deadline).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">Status</p>

                  <p className="font-semibold text-yellow-400">Pending</p>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => {
                    setSelectedCampaign(campaign._id);
                    setApproveModalOpen(true);
                  }}
                  className="
                    flex flex-1 items-center justify-center gap-2
                    rounded-xl
                    bg-emerald-600
                    py-3
                    font-medium
                    text-white
                    transition
                    hover:bg-emerald-700
                  "
                >
                  <CheckCircle2 size={18} />
                  Approve
                </button>

                <button
                  onClick={() => {
                    setSelectedCampaign(campaign._id);
                    setRejectModalOpen(true);
                  }}
                  className="
                    flex flex-1 items-center justify-center gap-2
                    rounded-xl
                    border
                    border-red-500/40
                    py-3
                    font-medium
                    text-red-400
                    transition
                    hover:bg-red-500/10
                  "
                >
                  <XCircle size={18} />
                  Reject
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <DynamicConfirmModal
        isOpen={approveModalOpen}
        onClose={() => setApproveModalOpen(false)}
        onConfirm={handleApprove}
        variant="success"
        title="Approve Campaign"
        description="Are you sure you want to approve this campaign? Once approved, supporters will be able to view and contribute to it."
        confirmText="Approve Campaign"
      />
      <RejectCampaignModal
        isOpen={rejectModalOpen}
        onClose={() => setRejectModalOpen(false)}
        onConfirm={handleReject}
        isLoading={isLoading}
      />
    </div>
  );
}
