"use client";

import Link from "next/link";
import { ShieldAlert, Home, LogIn } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--surface)] px-4 py-16 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg text-center">
        {/* Animated Icon Container */}
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-500/10 ring-4 ring-red-500/20 sm:h-32 sm:w-32">
          <ShieldAlert className="h-12 w-12 text-red-500 sm:h-16 sm:w-16" />
        </div>

        {/* Text Content */}
        <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-5xl">
          Access Denied
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
          You do not have the necessary permissions to view this page. Please log in
          with an authorized account to continue.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/login"
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-400 sm:w-auto"
          >
            <LogIn className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Sign In
          </Link>
          <Link
            href="/"
            className="group flex w-full items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-muted)]/50 px-6 py-3.5 text-sm font-semibold text-[var(--foreground)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)]/50 hover:bg-[var(--accent)]/10 hover:text-[var(--accent)] sm:w-auto"
          >
            <Home className="h-4 w-4 transition-transform group-hover:scale-110" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
