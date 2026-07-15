import { Metadata } from "next";
import MyCampaignTable from "@/components/dashboard/creator/MyCampaignTable";
import { GetMyCampaigns } from "@/lib/api/campaigns";

export const metadata: Metadata = {
  title: "My Campaigns | ZendaFund Dashboard",
  description: "Manage your crowdfunding campaigns.",
};

interface Props {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function MyCampaignPage({ searchParams }: Props) {
  const { page } = await searchParams;

  const currentPage = Number(page ?? 1);

  const response = await GetMyCampaigns(currentPage, 10);

  console.log(response);

  return (
    <section className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl border border-cyan-500/10 bg-gradient-to-r from-[#050d2a] via-[#071331] to-[#0a2a45] p-8">
        <div className="absolute right-0 top-0 h-full w-72 bg-cyan-500/5 blur-3xl" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Left */}
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-400">
              ✦ Campaign Management
            </div>

            <h1 className="text-3xl font-bold text-white md:text-4xl">
              My Campaigns
            </h1>

            <p className="mt-3 max-w-2xl text-slate-300">
              View, edit, and manage all your campaigns in one place. Track
              performance, monitor progress, and keep your supporters engaged.
            </p>
          </div>

          {/* Right Card */}
          <div className="w-full max-w-xs rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500/15">
                🚀
              </div>

              <div>
                <p className="text-sm text-slate-300">Active Campaigns</p>

                <h2 className="text-4xl font-bold text-white">
                  {response.pagination.total}
                </h2>

                <p className="text-cyan-400">Total Created</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MyCampaignTable
        campaigns={response.data}
        pagination={response.pagination}
      />
    </section>
  );
}
