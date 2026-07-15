import type { Metadata } from "next";
import { GetCreatorWithdrawals } from "@/lib/api/withdraw";
import PaymentHistoryTable from "@/components/dashboard/creator/PaymentHistoryTable";

export const metadata: Metadata = {
  title: "Payment History | Creator Dashboard",
  description:
    "View all approved withdrawal payments received from your campaigns.",
};

const PaymentHistoryPage = async () => {
  const response = await GetCreatorWithdrawals("approved");

  const withdrawals = response?.withdrawals || [];

  return (
    <section className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl border border-cyan-500/10 bg-gradient-to-r from-[#050d2a] via-[#071331] to-[#0a2a45] p-8">
        {/* Glow Effect */}
        <div className="absolute right-0 top-0 h-full w-72 bg-cyan-500/5 blur-3xl" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Left Content */}
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-400">
              ✦ Payment Records
            </div>

            <h1 className="text-3xl font-bold text-white md:text-4xl">
              Payment History
            </h1>

            <p className="mt-3 max-w-2xl text-slate-300">
              Track all approved withdrawal payments and monitor your earnings
              history with complete transparency.
            </p>
          </div>

          {/* Right Stat Card */}
          <div className="w-full max-w-xs rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500/15">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-cyan-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 9V7a5 5 0 00-10 0v2M5 9h14l-1 10H6L5 9z"
                  />
                </svg>
              </div>

              <div>
                <p className="text-sm text-slate-300">Total Payments</p>

                <h2 className="text-4xl font-bold text-white">
                  {withdrawals.length}
                </h2>

                <p className="text-cyan-400">Approved Withdrawals</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PaymentHistoryTable withdrawals={withdrawals} />
    </section>
  );
};

export default PaymentHistoryPage;
