import SupporterStatsGrid from "@/components/dashboard/supporter/SupporterStatsGrid";
import { GetSupporterStats } from "@/lib/api/stuts";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard | ZendaFund",
  description: "Your contribution overview on ZendaFund.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function SupporterHomePage() {
  const stats = await GetSupporterStats();
  console.log("stuts", stats);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="mb-6 text-2xl font-bold text-(--foreground)">
        Welcome back
      </h1>
      <SupporterStatsGrid stats={stats} />
    </div>
  );
}
