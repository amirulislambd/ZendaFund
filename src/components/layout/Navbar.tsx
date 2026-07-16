"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import { AuthSessionUser, getDashboardPath } from "@/types";
import {
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Coins,
  Home,
  Compass,
  GitBranchPlus,
} from "lucide-react";
import Logo from "../ui/Logo";
import ThemeToggle from "../ui/ThemeToggle";
import NotificationBell from "./NotificationBell";

const publicNavLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/explore", label: "Explore Campaigns", icon: Compass },
];

const GITHUB_REPO_URL = "https://github.com/amirulislambd/ZendaFund";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user as AuthSessionUser | undefined;

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const profileDrawerRef = useRef<HTMLDivElement>(null);

  const dashboardPath = getDashboardPath(user?.role);
  const avatarUrl = user?.profilePic || user?.image || null;
  const displayRole = user?.role ?? "user";

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (profileRef.current && !profileRef.current.contains(target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setIsProfileOpen(false);
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setIsProfileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if ((isProfileOpen || isMobileOpen) && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isProfileOpen, isMobileOpen]);

  const handleSignOut = async () => {
    await signOut();
    setIsProfileOpen(false);
    setIsMobileOpen(false);
    router.push("/");
    router.refresh();
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  const isActive = (href: string) => pathname === href;
  const isDashboardActive = pathname.startsWith("/dashboard");

  const profileMenuContent = user ? (
    <>
      <div className="mb-2 rounded-xl border border-(--border) bg-(--surface-muted)/80 px-3 py-3">
        <div className="flex items-center gap-3">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={user.name}
              className="h-12 w-12 rounded-full object-cover ring-2 ring-[var(--accent)]/30"
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-(--accent) to-teal-500 text-sm font-bold text-(--foreground)">
              {initials}
            </div>
          )}
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-(--foreground)">{user.name}</p>
            <p className="truncate text-xs text-(--muted)">{user.email}</p>
          </div>
        </div>
        <span className="mt-2 inline-block rounded-full bg-[var(--accent)]/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
          {displayRole}
        </span>
      </div>

      <div className="mb-2 flex items-center gap-2 rounded-xl bg-emerald-500/10 px-3 py-2.5 md:hidden">
        <Coins className="h-4 w-4 text-emerald-400" />
        <span className="text-sm font-semibold text-emerald-300">
          {user.credits ?? 0} credits
        </span>
      </div>

      <div className="mb-2 rounded-xl border border-[var(--border)] bg-[var(--surface)]/90 px-2 py-1">
        <ThemeToggle variant="menu" />
      </div>

      <Link
        href={dashboardPath}
        onClick={() => {
          setIsProfileOpen(false);
          setIsMobileOpen(false);
        }}
        className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-[var(--foreground)] transition hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
      >
        <LayoutDashboard className="h-4 w-4" />
        Dashboard
      </Link>

      <button
        type="button"
        onClick={handleSignOut}
        className="mt-1 flex w-full items-center gap-2 rounded-xl bg-red-500/10 px-3 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500/20"
      >
        <LogOut className="h-4 w-4" />
        Sign Out
      </button>
    </>
  ) : null;

  return (
    <>
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-md"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--surface)",
        color: "var(--foreground)",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
     <Logo/>

        <nav className="hidden items-center gap-6 md:flex">
          {publicNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-sm font-medium transition-colors duration-200 hover:text-emerald-400 ${
                isActive(link.href) ? "text-emerald-400" : "text-slate-300"
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute -bottom-[14px] left-0 h-0.5 w-full rounded-full bg-emerald-400" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-full border border-(--border) bg-(--surface-muted)/70 px-3 py-1.5 text-xs font-semibold text-(--foreground) transition hover:border-(--accent) hover:text-(--accent) sm:flex"
          >
            <GitBranchPlus className="h-3.5 w-3.5" />
            Join as Dev
          </a>

          {isPending && (
            <div className="h-9 w-24 animate-pulse rounded-full bg-(--surface-muted)" />
          )}

          {!isPending && !user && (
            <div className="hidden items-center gap-2 sm:flex">
              <Link
                href="/login"
                className="rounded-full px-4 py-2 text-sm font-semibold text-(--muted) transition hover:text-(--foreground)"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400 active:scale-95"
              >
                Register
              </Link>
            </div>
          )}

          {!isPending && user && (
            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1.5 sm:flex">
                <Coins className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-xs font-semibold text-emerald-300">
                  {user.credits ?? 0} credits
                </span>
              </div>

              <NotificationBell />

              <Link
                href={dashboardPath}
                className={`hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold transition sm:flex ${
                  isDashboardActive
                    ? "bg-emerald-500/15 text-emerald-400"
                    : "text-(--muted) hover:text-emerald-400"
                }`}
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>

              <div className="relative hidden md:block" ref={profileRef}>
                <button
                  type="button"
                  onClick={() => setIsProfileOpen((prev) => !prev)}
                  className="flex items-center gap-2 rounded-full border border-(--border) bg-(--surface-muted)/80 p-0.5 pr-3 transition hover:border-(--accent)/40 sm:py-1 sm:pl-1"
                  aria-label="Open profile menu"
                  aria-expanded={isProfileOpen}
                >
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={user.name}
                      className="h-8 w-8 rounded-full object-cover ring-1 ring-[var(--accent)]/20"
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-(--accent) to-teal-500 text-xs font-bold text-(--foreground)">
                      {initials}
                    </div>
                  )}
                  <div className="hidden text-left sm:block">
                    <p className="text-xs font-semibold leading-tight text-(--foreground)">{user.name}</p>
                    <p className="text-[10px] capitalize text-(--muted)">{displayRole}</p>
                  </div>
                  <ChevronDown
                    className={`hidden h-3.5 w-3.5 text-(--muted) transition-transform sm:block ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isProfileOpen && (
                  <div
                  className="absolute right-0 z-50 mt-3 hidden w-56 rounded-2xl border p-2 shadow-2xl shadow-black/40 backdrop-blur-md md:block"
                  style={{
                    borderColor: "var(--border)",
                    backgroundColor: "var(--surface)",
                    color: "var(--foreground)",
                  }}
                >
                    {profileMenuContent}
                  </div>
                )}
              </div>
            </div>
          )}

          {!isPending && user && (
            <div className="md:hidden flex items-center">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={user.name}
                  className="h-8 w-8 rounded-full object-cover ring-1 ring-[var(--accent)]/20"
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-(--accent) to-teal-500 text-xs font-bold text-(--foreground)">
                  {initials}
                </div>
              )}
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsMobileOpen((prev) => !prev)}
            className="rounded-lg p-2 text-(--muted) transition hover:bg-(--surface-muted) hover:text-(--foreground) md:hidden"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X className="h-5 w-5 text-(--foreground)" /> : <Menu className="h-5 w-5 text-(--foreground)" />}
          </button>
        </div>
      </div>

    </header>

    {isMobileOpen && (
      <div className="fixed inset-0 z-[60] md:hidden">
        <button
          type="button"
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
          aria-label="Close menu"
        />
        <div
          className="absolute inset-y-0 right-0 flex w-[min(18rem,85vw)] flex-col border-l border-(--border) bg-(--surface) p-4 text-(--foreground) shadow-2xl shadow-black/50 overflow-y-auto"
        >
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-(--foreground)">Menu</p>
            <button
              type="button"
              onClick={() => setIsMobileOpen(false)}
              className="rounded-lg p-1.5 text-(--muted) transition hover:bg-(--surface-muted) hover:text-(--foreground)"
              aria-label="Close menu"
            >
              <X className="h-5 w-5 text-(--foreground)" />
            </button>
          </div>
          
          {!isPending && user && (
            <div className="mb-4 flex flex-col gap-2 border-b border-[var(--border)] pb-4">
              <div className="rounded-xl border border-(--border) bg-(--surface-muted)/80 px-3 py-3">
                <div className="flex items-center gap-3">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt={user.name} className="h-12 w-12 rounded-full object-cover ring-2 ring-[var(--accent)]/30" />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-(--accent) to-teal-500 text-sm font-bold text-(--foreground)">
                      {initials}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-(--foreground)">{user.name}</p>
                    <p className="truncate text-xs text-(--muted)">{user.email}</p>
                  </div>
                </div>
                <span className="mt-2 inline-block rounded-full bg-[var(--accent)]/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
                  {displayRole}
                </span>
              </div>

              <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)]/90 px-2 py-1">
                <ThemeToggle variant="menu" />
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 px-3 py-2.5">
                <Coins className="h-4 w-4 text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-300">
                  {user.credits ?? 0} credits
                </span>
              </div>
            </div>
          )}

          <nav className="flex flex-col gap-1 mb-4 border-b border-[var(--border)] pb-4">
            {publicNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive(link.href)
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "text-(--muted) hover:bg-(--surface-muted) hover:text-(--foreground)"
                }`}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}

            {!isPending && user && (
              <Link
                href={dashboardPath}
                onClick={() => setIsMobileOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-(--muted) transition hover:bg-(--surface-muted) hover:text-(--foreground)"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
            )}

            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-(--muted) transition hover:bg-(--surface-muted) hover:text-(--foreground)"
            >
              <GitBranchPlus className="h-4 w-4" />
              Join as Developer
            </a>
          </nav>

          {!isPending && !user && (
            <div className="flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setIsMobileOpen(false)}
                className="rounded-xl border border-[var(--border)] px-4 py-3 text-center text-sm font-semibold text-[var(--muted)] transition hover:border-emerald-400/40 hover:text-[var(--foreground)]"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setIsMobileOpen(false)}
                className="rounded-xl bg-emerald-500 px-4 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
              >
                Register
              </Link>
            </div>
          )}

          {!isPending && user && (
            <div className="mt-auto pt-4">
              <button
                type="button"
                onClick={handleSignOut}
                className="flex w-full items-center gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/20"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    )}
  </>
  );
}
