"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";

interface Withdrawal {
  _id: string;
  withdrawal_credit: number;
  withdrawal_amount: number;
  payment_system: string;
  withdraw_date: string;
  status: "pending" | "approved" | "rejected";
}

interface Props {
  withdrawals: Withdrawal[];
}

export default function WithdrawalHistoryTable({
  withdrawals,
}: Props) {
  if (!withdrawals.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-dashed border-cyan-500/20 bg-gradient-to-br from-[#071331] to-[#0a1f3d] p-12 text-center"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 text-2xl">
          💸
        </div>

        <h3 className="mt-5 text-2xl font-bold text-white">
          No Withdrawal History
        </h3>

        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-400">
          Approved withdrawal payments will appear here
          once they are processed successfully.
        </p>

        <div className="mt-6 inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-xs font-medium text-cyan-400">
          No records found
        </div>
      </motion.div>
    );
  }

  return (
    <>      {/* Desktop Table */}

    <div className="hidden overflow-hidden rounded-3xl border border-white/10 bg-[#071425] md:block">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Date
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Credits
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Amount
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Payment Method
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {withdrawals.map((item, index) => (
              <motion.tr
                key={item._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.25,
                  delay: index * 0.05,
                }}
                className="
                  border-t border-white/5
                  transition-all duration-300
                  hover:bg-cyan-500/5
                "
              >
                <td className="px-6 py-5 text-sm text-slate-300">
                  {format(
                    new Date(item.withdraw_date),
                    "dd MMM yyyy"
                  )}
                </td>

                <td className="px-6 py-5 font-semibold text-white">
                  {item.withdrawal_credit}
                </td>

                <td className="px-6 py-5">
                  <span className="font-bold text-emerald-400">
                    ${item.withdrawal_amount}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">
                    {item.payment_system}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <span
                    className="
                      inline-flex items-center
                      rounded-full
                      border border-emerald-500/20
                      bg-emerald-500/10
                      px-3 py-1
                      text-xs font-semibold
                      text-emerald-400
                    "
                  >
                    Approved
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>      {/* Mobile Cards */}

<div className="space-y-4 md:hidden">
  {withdrawals.map((item, index) => (
    <motion.div
      key={item._id}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
      }}
      className="
        overflow-hidden
        rounded-3xl
        border border-white/10
        bg-[#071425]
        shadow-lg
      "
    >
      {/* Top Section */}
      <div className="border-b border-white/5 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Withdrawal Amount
            </p>

            <h3 className="mt-1 text-2xl font-bold text-emerald-400">
              ${item.withdrawal_amount}
            </h3>
          </div>

          <span
            className="
              rounded-full
              border border-emerald-500/20
              bg-emerald-500/10
              px-3 py-1
              text-xs font-semibold
              text-emerald-400
            "
          >
            Approved
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-400">
            Credits
          </span>

          <span className="font-semibold text-white">
            {item.withdrawal_credit}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-400">
            Payment Method
          </span>

          <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">
            {item.payment_system}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-400">
            Date
          </span>

          <span className="text-sm text-white">
            {format(
              new Date(item.withdraw_date),
              "dd MMM yyyy"
            )}
          </span>
        </div>
      </div>
    </motion.div>
  ))}
</div>
</>
);
}