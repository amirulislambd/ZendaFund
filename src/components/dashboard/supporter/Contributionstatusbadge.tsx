const STATUS_STYLES: Record<string, string> = {
    pending: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    approved: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    rejected: "bg-red-500/10 text-red-400 border-red-500/30",
  };
  
  export default function ContributionStatusBadge({ status }: { status: string }) {
    const style = STATUS_STYLES[status] ?? "bg-(--surface-muted) text-(--muted) border-(--border)";
  
    return (
      <span
        className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold capitalize ${style}`}
      >
        {status}
      </span>
    );
  }