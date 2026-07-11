"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore Campaigns" },
];

const profileMenuItems = [
  { href: "/dashboard", label: "My Investments" },
  { href: "/saved", label: "Saved Projects" },
  { href: "/payments", label: "Payment Methods" },
  { href: "/settings", label: "Settings" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/15 ring-1 ring-emerald-400/30">
            <span className="text-lg font-bold text-emerald-400">Z</span>
          </div>
          <span className="text-xl font-semibold tracking-tight text-emerald-400">
            ZendaFund
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition-colors duration-200 hover:text-emerald-400 ${
                  isActive
                    ? "text-emerald-400"
                    : "text-slate-300"
                }`}
              >
                <span>{link.label}</span>
                {isActive ? (
                  <span className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-emerald-400" />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 sm:flex">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
              Credits
            </span>
            <span className="text-sm font-semibold text-white">$50.00</span>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="flex items-center gap-3 rounded-full border border-slate-700 bg-slate-800/80 px-2 py-2 pr-4 shadow-lg shadow-slate-950/30 transition hover:border-emerald-400/40"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-emerald-400 to-teal-500 text-sm font-semibold text-slate-950">
                AM
              </div>
              <div className="hidden text-left sm:block">
                <p className="text-sm font-semibold text-white">Alex Morgan</p>
                <p className="text-xs text-slate-400">Supporter</p>
              </div>
            </button>

            {isMenuOpen ? (
              <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-slate-700 bg-slate-900/95 p-2 shadow-2xl shadow-black/30">
                <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-2">
                  {profileMenuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center rounded-xl px-3 py-2 text-sm text-slate-300 transition hover:bg-emerald-500/10 hover:text-emerald-300"
                    >
                      {item.label}
                    </Link>
                  ))}

                  <button
                    type="button"
                    className="mt-2 flex w-full items-center justify-center rounded-xl bg-red-500/10 px-3 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500/20"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
