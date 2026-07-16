import { Loader2 } from "lucide-react";

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--surface)]/50 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)]/80 p-8 shadow-2xl backdrop-blur-md">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute inset-0 animate-ping rounded-full bg-[var(--accent)]/20" />
          <Loader2 className="h-10 w-10 animate-spin text-[var(--accent)]" />
        </div>
        <p className="text-sm font-semibold tracking-wide text-[var(--foreground)]">
          Loading ZendaFund...
        </p>
      </div>
    </div>
  );
}
