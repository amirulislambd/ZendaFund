"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, CreditCard, Calendar, User } from "lucide-react";

import DynamicConfirmModal from "@/components/shared/DynamicConfirmModal";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ApproveWithdrawal } from "@/lib/actions/withdraw";

interface Withdrawal {
  _id: string;
  creator_email: string;
  creator_name: string;

  withdrawal_credit: number;
  withdrawal_amount: number;

  payment_system: string;
  account_number: string;

  withdraw_date: string;

  status: "pending" | "approved";
}

interface Props {
  withdrawals: Withdrawal[];
}

export default function WithdrawalRequestsTable({ withdrawals }: Props) {
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<string | null>(
    null,
  );

  const [approveModalOpen, setApproveModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleApprove = async () => {
    if (!selectedWithdrawal) return;

    try {
      setIsLoading(true);

      const result = await ApproveWithdrawal(selectedWithdrawal);

      if (!result.success) {
        toast.error(result.message || "Failed to approve withdrawal");
        return;
      }

      toast.success(result.message || "Withdrawal approved successfully");

      setApproveModalOpen(false);

      router.refresh();
    } catch (error) {
      toast.error("Failed to approve withdrawal");
    } finally {
      setIsLoading(false);
    }
  };

  if (!withdrawals.length) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="
          rounded-3xl
          border border-dashed border-(--border)
          bg-(--surface)
          p-12
          text-center
        "
      >
        <h3 className="text-xl font-semibold text-(--foreground)">
          No Pending Withdrawals
        </h3>

        <p className="mt-2 text-sm text-(--muted)">
          All withdrawal requests have already been processed.
        </p>
      </motion.div>
    );
  }

  return (
    <>
      {" "}
      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-3xl border border-cyan-500/10 bg-[#081122] md:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-6 py-5 text-left text-sm font-semibold text-slate-300">
                  Creator
                </th>

                <th className="px-6 py-5 text-left text-sm font-semibold text-slate-300">
                  Credits
                </th>

                <th className="px-6 py-5 text-left text-sm font-semibold text-slate-300">
                  Amount
                </th>

                <th className="px-6 py-5 text-left text-sm font-semibold text-slate-300">
                  Method
                </th>

                <th className="px-6 py-5 text-left text-sm font-semibold text-slate-300">
                  Account
                </th>

                <th className="px-6 py-5 text-left text-sm font-semibold text-slate-300">
                  Date
                </th>

                <th className="px-6 py-5 text-left text-sm font-semibold text-slate-300">
                  Status
                </th>

                <th className="px-6 py-5 text-center text-sm font-semibold text-slate-300">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {withdrawals.map((withdrawal, index) => (
                <motion.tr
                  key={withdrawal._id}
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.05,
                  }}
                  className="
                    border-b border-white/5
                    transition
                    hover:bg-cyan-500/[0.03]
                  "
                >
                  <td className="px-6 py-5">
                    <div>
                      <p className="font-medium text-white">
                        {withdrawal.creator_name}
                      </p>

                      <p className="text-xs text-slate-400">
                        {withdrawal.creator_email}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-5 font-semibold text-cyan-400">
                    {withdrawal.withdrawal_credit.toLocaleString()}
                  </td>

                  <td className="px-6 py-5 font-semibold text-emerald-400">
                    ${withdrawal.withdrawal_amount.toLocaleString()}
                  </td>

                  <td className="px-6 py-5">{withdrawal.payment_system}</td>

                  <td className="px-6 py-5">{withdrawal.account_number}</td>

                  <td className="px-6 py-5 text-sm text-slate-400">
                    {new Date(withdrawal.withdraw_date).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-5">
                    <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400">
                      Pending
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex justify-center">
                      <button
                        onClick={() => {
                          setSelectedWithdrawal(withdrawal._id);

                          setApproveModalOpen(true);
                        }}
                        className="
                          rounded-xl
                          border border-emerald-500/20
                          bg-emerald-500/10
                          px-4 py-2
                          text-sm font-medium
                          text-emerald-400
                          transition-all
                          hover:bg-emerald-500/20
                          hover:shadow-[0_0_20px_rgba(16,185,129,.25)]
                        "
                      >
                        Payment Success
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>{" "}
      {/* Mobile Cards */}
      <div className="space-y-4 lg:hidden">
        {withdrawals.map((withdrawal, index) => (
          <motion.div
            key={withdrawal._id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.05,
            }}
            className="
        overflow-hidden
        rounded-3xl
        border
        border-(--border)
        bg-(--surface)
        p-5
        shadow-lg
      "
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-(--foreground)">
                  {withdrawal.creator_name}
                </h3>

                <p className="text-sm text-(--muted)">
                  {withdrawal.creator_email}
                </p>
              </div>

              <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400">
                Pending
              </span>
            </div>

            {/* Stats Grid */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-(--surface-muted) p-3">
                <p className="text-xs text-(--muted)">Credits</p>

                <p className="mt-1 font-semibold text-(--foreground)">
                  {withdrawal.withdrawal_credit} Credits
                </p>
              </div>

              <div className="rounded-xl bg-(--surface-muted) p-3">
                <p className="text-xs text-(--muted)">Amount</p>

                <p className="mt-1 font-semibold text-emerald-400">
                  ${withdrawal.withdrawal_amount}
                </p>
              </div>

              <div className="rounded-xl bg-(--surface-muted) p-3">
                <p className="text-xs text-(--muted)">Method</p>

                <p className="mt-1 font-semibold text-(--foreground)">
                  {withdrawal.payment_system}
                </p>
              </div>

              <div className="rounded-xl bg-(--surface-muted) p-3">
                <p className="text-xs text-(--muted)">Account</p>

                <p className="mt-1 truncate font-semibold text-(--foreground)">
                  {withdrawal.account_number}
                </p>
              </div>
            </div>

            {/* Date */}
            <div className="mt-4 flex items-center gap-2 text-sm text-(--muted)">
              <span>📅</span>

              <span>
                {new Date(withdrawal.withdraw_date).toLocaleDateString()}
              </span>
            </div>

            {/* Action */}
            <button
              onClick={() => {
                setSelectedWithdrawal(withdrawal._id);

                setApproveModalOpen(true);
              }}
              className="
          mt-5
          w-full
          rounded-2xl
          bg-emerald-600
          py-3
          font-medium
          text-white
          transition-all
          duration-200
          hover:bg-emerald-500
        "
            >
              Payment Success
            </button>
          </motion.div>
        ))}
      </div>
      <DynamicConfirmModal
        isOpen={approveModalOpen}
        onClose={() => setApproveModalOpen(false)}
        onConfirm={handleApprove}
        isLoading={isLoading}
        variant="success"
        title="Confirm Payment"
        description="Are you sure the payment has been successfully sent to the creator? This action cannot be undone."
        confirmText="Mark as Paid"
      />
    </>
  );
}
