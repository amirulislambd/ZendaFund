import AdminDashboardStats from '@/components/dashboard/admin/AdminDashboardStats';
import { GetAdminDashboardOverview } from '@/lib/api/stuts';
import { ShieldCheck } from 'lucide-react';



const AdminDashboardPage = async() => {

    const response =
    await GetAdminDashboardOverview();

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

      <AdminDashboardStats
        stats={response.stats}
      />
    </section>
        </div>
    );
};

export default AdminDashboardPage;