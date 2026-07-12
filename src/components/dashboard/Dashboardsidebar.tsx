"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X, LogOut, User } from "lucide-react";
import { dashboardNav, normalizeDashboardRole, type DashboardRole } from "@/lib/Dashboardnav";
import { signOut } from "@/lib/auth-client";
import Logo from "../ui/Logo";

type DashboardSidebarProps = {
  role: DashboardRole;
  userName?: string;
  userImage?: string;
};

export default function DashboardSidebar({
  role,
  userName,
  userImage,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const normalizedRole = normalizeDashboardRole(role);
  const navItems = dashboardNav[normalizedRole];

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  const isActive = (href: string) => {
    if (href === `/dashboard/${normalizedRole.toLowerCase()}`) {
      return pathname === href;
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const initials = userName ? userName.charAt(0).toUpperCase() : "U";

  const SidebarContent = (
    <div className="flex h-full flex-col bg-[#161c1a]">
      {/* User info */}
      <div className="flex items-center gap-3 border-b border-white/10 px-6 py-5">
        {userImage ? (
          <img
            src={userImage}
            alt={userName ?? "User"}
            className="h-10 w-10 shrink-0 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-sm font-semibold text-emerald-400">
            {initials}
          </div>
        )}
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">
            {userName ?? "User"}
          </p>
          <span className="inline-block rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
            {role}
          </span>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-emerald-500/15 text-emerald-300"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon
                className={`h-[18px] w-[18px] shrink-0 ${
                  active ? "text-emerald-400" : "text-slate-500"
                }`}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer: sign out */}
      <div className="border-t border-white/10 px-3 py-4">
        <button
          type="button"
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10"
        >
          <LogOut className="h-[18px] w-[18px]" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full self-start lg:w-64 lg:shrink-0">
      {/* Mobile top bar with hamburger + brand */}
      <div className="flex items-center justify-between border-b border-white/10 bg-[#161c1a] px-4 py-3 lg:hidden">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setIsOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-md text-white"
          >
            <Menu className="h-5 w-5" />
          </button>
         <Logo/>
        </div>
      </div>

      {/* Desktop: fixed sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-white/10 lg:block">
        <div className="fixed h-screen w-64">
          <div className="flex items-center gap-2 border-b border-white/10 px-6 py-5">
            <Logo/>
          </div>
          {SidebarContent}
        </div>
      </aside>

      {/* Mobile: slide-out drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-72 shadow-xl">
            <div className="flex justify-end px-4 pt-4">
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setIsOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-md bg-white/5 text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="h-[calc(100%-56px)]">{SidebarContent}</div>
          </div>
        </div>
      )}
    </div>
  );
}