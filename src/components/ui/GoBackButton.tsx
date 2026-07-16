"use client";
import { ArrowLeft } from "lucide-react";

export default function GoBackButton() {
  return (
    <button
      onClick={() => window.history.back()}
      className="group flex w-full items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-muted)]/50 px-6 py-3.5 text-sm font-semibold text-[var(--foreground)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)]/50 hover:bg-[var(--accent)]/10 hover:text-[var(--accent)] sm:w-auto"
    >
      <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
      Go Back
    </button>
  );
}
