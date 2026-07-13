type CampaignStatsProps = {
    raisedAmount: number;
    goal: number;
    status: string;
    daysLeft: number;
  };
  
  export default function CampaignStats({
    raisedAmount,
    goal,
    status,
    daysLeft,
  }: CampaignStatsProps) {
    const progress = goal > 0 ? Math.min((raisedAmount / goal) * 100, 100) : 0;
  
    return (
      <div className="space-y-2">
        <div className="flex items-baseline gap-2">
          <h2 className="text-4xl font-extrabold text-(--foreground)">
            {raisedAmount.toLocaleString()}
          </h2>
          <span className="text-lg font-bold text-(--muted)">/ {goal.toLocaleString()} credits</span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-(--surface-muted)">
          <div
            className="h-full rounded-full bg-(--accent) transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between pt-2">
          <span className="rounded-full bg-(--surface-muted) px-3 py-1 text-xs font-bold capitalize text-(--muted)">
            {status}
          </span>
          <span className="text-sm font-bold uppercase tracking-wider text-(--accent)">
            {daysLeft > 0 ? `${daysLeft} days left` : "Ended"}
          </span>
        </div>
      </div>
    );
  }