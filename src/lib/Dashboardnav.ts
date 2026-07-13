import {
  Home,
  Compass,
  HandCoins,
  Coins,
  Receipt,
  LayoutDashboard,
  FilePlus2,
  Layers,
  Landmark,
  Users,
  FolderKanban,
  Banknote,
  BarChart3,
  type LucideIcon,
  CheckCircle2,
} from "lucide-react";

export type DashboardRole = "Supporter" | "Creator" | "Admin";
export type StoredRole = "supporter" | "creator" | "admin" | undefined;

export type DashboardNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const normalizeStoredRole = (value?: string): StoredRole => {
  const normalized = (value ?? "").trim().toLowerCase();

  if (normalized === "admin") return "admin";
  if (normalized === "creator") return "creator";
  if (normalized === "supporter") return "supporter";
  return undefined;
};

export const normalizeDashboardRole = (value?: string): DashboardRole => {
  const normalized = normalizeStoredRole(value);

  if (normalized === "admin") return "Admin";
  if (normalized === "creator") return "Creator";
  return "Supporter";
};

export const dashboardNav: Record<DashboardRole, DashboardNavItem[]> = {
  Supporter: [
    { label: "Home", href: "/dashboard/supporter", icon: Home },
    {
      label: "Explore Campaigns",
      href: "/dashboard/supporter/explore",
      icon: Compass,
    },
    {
      label: "My Contributions",
      href: "/dashboard/supporter/contributions",
      icon: HandCoins,
    },
    {
      label: "Approved Contributions",
      href: "/dashboard/supporter/approvedContributions",
      icon: CheckCircle2,
    },
    {
      label: "Purchase Credit",
      href: "/dashboard/supporter/credits",
      icon: Coins,
    },
    {
      label: "Payment History",
      href: "/dashboard/supporter/payments",
      icon: Receipt,
    },
  ],

  Creator: [
    { label: "Home", href: "/dashboard/creator", icon: LayoutDashboard },
    {
      label: "Add New Campaign",
      href: "/dashboard/creator/campaigns/new",
      icon: FilePlus2,
    },
    {
      label: "My Campaigns",
      href: "/dashboard/creator/campaigns",
      icon: Layers,
    },
    {
      label: "Withdrawals",
      href: "/dashboard/creator/withdrawals",
      icon: Landmark,
    },
    {
      label: "Payment History",
      href: "/dashboard/creator/payments",
      icon: Receipt,
    },
  ],

  Admin: [
    { label: "Home", href: "/dashboard/admin", icon: LayoutDashboard },
    { label: "Manage Users", href: "/dashboard/admin/users", icon: Users },
    {
      label: "Manage Campaigns",
      href: "/dashboard/admin/campaigns",
      icon: FolderKanban,
    },
    {
      label: "Withdrawal Requests",
      href: "/dashboard/admin/withdrawals",
      icon: Banknote,
    },
    { label: "Reports", href: "/dashboard/admin/reports", icon: BarChart3 },
  ],
};