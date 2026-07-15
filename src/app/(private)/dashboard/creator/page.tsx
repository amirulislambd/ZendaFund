import CreatorOverviewStats from "@/components/dashboard/creator/CreatorOverviewStats";
import { GetCreatorDashboardOverview } from "@/lib/api/stuts";

export default async function CreatorDashboardPage() {
  const response = await GetCreatorDashboardOverview();

  return (
    <section className="space-y-6">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-400">
          ✦ Creator Dashboard
        </div>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white">
          Welcome Back 👋
        </h1>

        <p className="mt-3 max-w-2xl text-slate-400">
          Track your campaigns, monitor contributions, and manage your
          fundraising journey from one central dashboard.
        </p>
      </div>
      <CreatorOverviewStats stats={response.stats} />
    </section>
  );
}
