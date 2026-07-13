import { CheckCircle2 } from "lucide-react";
import ContributionsTable from "@/components/shared/Contributionstable";
import { GetMyContributions } from "@/lib/actions/contribution";

export default async function ApprovedContributions() {
  const { contributions } = await GetMyContributions({
    status: "approved",
    limit: 100,
  });

  return (
    <section className="mt-10 overflow-hidden rounded-3xl border border-cyan-500/15 bg-gradient-to-r from-[#050d2a] via-[#071331] to-[#0a2a45] shadow-[0_0_40px_rgba(6,182,212,0.08)]">
      {/* Header */}
      <div className="flex flex-col gap-8 border-b border-white/10 p-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-400">
            <CheckCircle2 className="h-4 w-4" />
            Approved Contributions
          </div>

          <h2 className="text-3xl font-bold leading-tight text-white md:text-4xl">
            Your approved
            <br />
            creator contributions.
          </h2>

          <p className="mt-5 max-w-xl text-[15px] leading-7 text-slate-300">
            These are the contributions that have been successfully approved by
            campaign creators. You can review all your completed support below.
          </p>
        </div>

        {/* Right Card */}
        <div className="w-full max-w-xs rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/15">
              <CheckCircle2 className="h-8 w-8 text-cyan-400" />
            </div>

            <div>
              <p className="text-sm text-slate-300">
                Total Approved
              </p>

              <h3 className="text-4xl font-bold text-white">
                {contributions.length}
              </h3>

              <p className="text-sm font-medium text-cyan-400">
                Successful Supports
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="p-6 md:p-8">
        <ContributionsTable
          contributions={contributions}
          showPaymentMethod={false}
          showDate={false}
          emptyMessage="No approved contributions yet."
        />
      </div>
    </section>
  );
}