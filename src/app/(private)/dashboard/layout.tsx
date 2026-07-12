import { redirect } from "next/navigation";
import { UserSessionToSSR } from "@/lib/core/session";
import DashboardSidebar from "@/components/dashboard/Dashboardsidebar";
import { normalizeDashboardRole } from "@/lib/Dashboardnav";



const DashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const user = await UserSessionToSSR();

  if (!user) {
    redirect("/login");
  }

  const role = normalizeDashboardRole(user.role);

  return (
    <div className="flex min-h-screen flex-col bg-(--surface) text-(--foreground) lg:flex-row container mx-auto">
      <DashboardSidebar role={role} userName={user.name} />
      <main className="min-w-0 flex-1 px-4 py-6 lg:px-8 lg:py-8">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;