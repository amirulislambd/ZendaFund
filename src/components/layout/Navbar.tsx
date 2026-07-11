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
  console.log("user", user);

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
      const insideTrigger = profileRef.current?.contains(target);
      const insideDrawer = profileDrawerRef.current?.contains(target);
      if (!insideTrigger && !insideDrawer) {
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
    if (isProfileOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isProfileOpen]);

  const handleSignOut = async () => {
    await signOut();
    setIsProfileOpen(false);
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
      <div className="mb-2 rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-3">
        <div className="flex items-center gap-3">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={user.name}
              className="h-12 w-12 rounded-full object-cover ring-2 ring-emerald-400/30"
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-sm font-bold text-slate-950">
              {initials}
            </div>
          )}
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">{user.name}</p>
            <p className="truncate text-xs text-slate-400">{user.email}</p>
          </div>
        </div>
        <span className="mt-2 inline-block rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
          {displayRole}
        </span>
      </div>

      <div className="mb-2 flex items-center gap-2 rounded-xl bg-emerald-500/10 px-3 py-2.5 md:hidden">
        <Coins className="h-4 w-4 text-emerald-400" />
        <span className="text-sm font-semibold text-emerald-300">
          {user.credits ?? 0} credits
        </span>
      </div>

      <Link
        href={dashboardPath}
        onClick={() => setIsProfileOpen(false)}
        className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-300 transition hover:bg-emerald-500/10 hover:text-emerald-300"
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
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-900/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/15 ring-1 ring-emerald-400/30">
            <span className="text-base font-bold text-emerald-400">Z</span>
          </div>
          <span className="text-lg font-semibold tracking-tight text-emerald-400">ZendaFund</span>
        </Link>

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
            className="hidden items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/50 px-3 py-1.5 text-xs font-semibold text-slate-300 transition hover:border-emerald-400/40 hover:text-emerald-300 sm:flex"
          >
            <GitBranchPlus className="h-3.5 w-3.5" />
            Join as Dev
          </a>

          {isPending && (
            <div className="h-9 w-24 animate-pulse rounded-full bg-slate-700" />
          )}

          {!isPending && !user && (
            <div className="hidden items-center gap-2 sm:flex">
              <Link
                href="/login"
                className="rounded-full px-4 py-2 text-sm font-semibold text-slate-300 transition hover:text-white"
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

              <Link
                href={dashboardPath}
                className={`hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold transition sm:flex ${
                  isDashboardActive
                    ? "bg-emerald-500/15 text-emerald-400"
                    : "text-slate-300 hover:text-emerald-400"
                }`}
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>

              <div className="relative" ref={profileRef}>
                <button
                  type="button"
                  onClick={() => setIsProfileOpen((prev) => !prev)}
                  className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/80 p-0.5 pr-3 transition hover:border-emerald-400/40 sm:py-1 sm:pl-1"
                  aria-label="Open profile menu"
                  aria-expanded={isProfileOpen}
                >
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={user.name}
                      className="h-8 w-8 rounded-full object-cover ring-1 ring-emerald-400/20"
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-xs font-bold text-slate-950">
                      {initials}
                    </div>
                  )}
                  <div className="hidden text-left sm:block">
                    <p className="text-xs font-semibold leading-tight text-white">{user.name}</p>
                    <p className="text-[10px] capitalize text-slate-400">{displayRole}</p>
                  </div>
                  <ChevronDown
                    className={`hidden h-3.5 w-3.5 text-slate-400 transition-transform sm:block ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 z-50 mt-3 hidden w-56 rounded-2xl border border-slate-700 bg-slate-900/95 p-2 shadow-2xl shadow-black/40 backdrop-blur-md md:block">
                    {profileMenuContent}
                  </div>
                )}
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsMobileOpen((prev) => !prev)}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white md:hidden"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isMobileOpen && (
        <div className="border-t border-slate-800/60 bg-slate-900/95 px-4 py-4 backdrop-blur-md md:hidden">
          <nav className="flex flex-col gap-1">
            {publicNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive(link.href)
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}

            {isPending && (
              <div className="mt-2 h-10 animate-pulse rounded-xl bg-slate-800" />
            )}

            {!isPending && !user && (
              <>
                <Link
                  href="/login"
                  className="mt-2 rounded-xl border border-slate-700 px-4 py-3 text-center text-sm font-semibold text-slate-300 transition hover:border-emerald-400/40 hover:text-white"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="rounded-xl bg-emerald-500 px-4 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
                >
                  Register
                </Link>
              </>
            )}

            {!isPending && user && (
              <>
                <div className="mt-2 rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3">
                  <p className="text-sm font-semibold text-white">{user.name}</p>
                  <p className="text-xs text-slate-400">{user.email}</p>
                  <span className="mt-1 inline-block rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
                    {displayRole}
                  </span>
                </div>

                <Link
                  href={dashboardPath}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>

                <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 px-4 py-3">
                  <Coins className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm font-semibold text-emerald-300">
                    {user.credits ?? 0} credits
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex items-center gap-3 rounded-xl bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/20"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </>
            )}

            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 transition hover:bg-slate-800 hover:text-white"
            >
              <GitBranchPlus className="h-4 w-4" />
              Join as Developer
            </a>
          </nav>
        </div>
      )}
    </header>

    {isProfileOpen && user && (
      <div className="fixed inset-0 z-[60] md:hidden">
        <button
          type="button"
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsProfileOpen(false)}
          aria-label="Close profile menu"
        />
        <div
          ref={profileDrawerRef}
          className="absolute inset-y-0 right-0 flex w-[min(18rem,85vw)] flex-col border-l border-slate-700 bg-slate-900 p-4 shadow-2xl shadow-black/50"
        >
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-white">My Account</p>
            <button
              type="button"
              onClick={() => setIsProfileOpen(false)}
              className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-white"
              aria-label="Close profile menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          {profileMenuContent}
        </div>
      </div>
    )}
  </>
  );
}
