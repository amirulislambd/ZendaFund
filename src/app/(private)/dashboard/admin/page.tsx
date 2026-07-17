import AdminDashboardStats from '@/components/dashboard/admin/AdminDashboardStats';
import AdminIncomeChart from '@/components/dashboard/admin/AdminIncomeChart';
import AdminActivityFeed from '@/components/dashboard/admin/AdminActivityFeed';
import { GetAdminDashboardOverview } from '@/lib/api/stuts';
import { ShieldCheck } from 'lucide-react';

const AdminDashboardPage = async() => {
    const response = await GetAdminDashboardOverview();

    const normalizeMonthlyPerformance = (item: any) => ({
      month:
        String(item?.month ?? item?.label ?? item?.name ?? "").trim() ||
        "Unknown",
      credits:
        Number(
          item?.credits ??
            item?.totalCredits ??
            item?.amount ??
            item?.income ??
            0,
        ) || 0,
    });

    const normalizeActivity = (item: any, index: number) => ({
      _id: item?._id ?? item?.id ?? `activity-${index}`,
      type: item?.type ?? item?.source ?? "activity",
      message:
        item?.message ??
        item?.action ??
        item?.description ??
        "Performed an action",
      status: item?.status ?? "unknown",
      source: item?.source ?? item?.type ?? undefined,
      date:
        item?.date ??
        item?.current_date ??
        item?.createdAt ??
        new Date().toISOString(),
    });

    const monthlyPerformance = Array.isArray(response.monthlyPerformance)
      ? response.monthlyPerformance.map(normalizeMonthlyPerformance)
      : [];

    const activities = Array.isArray(response.recentActivity)
      ? response.recentActivity.map(normalizeActivity)
      : [];

    return (
      <div>
        <section className="space-y-6">
          <div className="relative overflow-hidden rounded-3xl border border-cyan-500/10 bg-gradient-to-br from-cyan-500/5 via-[#111827] to-indigo-500/5 p-6 shadow-lg">
            {/* Glow */}
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl" />
            <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-indigo-500/10 blur-3xl" />

            <div className="relative flex items-start gap-4">
              <div className="flex size-14 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10">
                <ShieldCheck className="size-7 text-cyan-400" />
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-4xl font-bold tracking-tight text-white">
                    Admin Dashboard
                  </h1>

                  <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400">
                    Administrator
                  </span>
                </div>

                <p className="mt-3 max-w-3xl text-slate-400">
                  Monitor platform activity, manage creators and supporters,
                  review campaign approvals, track payments, and oversee
                  system-wide performance from a centralized control panel.
                </p>
              </div>
            </div>
          </div>

          <AdminDashboardStats stats={response.stats} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <AdminIncomeChart data={monthlyPerformance} />
            </div>
            <div>
              <AdminActivityFeed activities={activities} />
            </div>
          </div>
        </section>
      </div>
    );
};

export default AdminDashboardPage;