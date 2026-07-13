import { GetCampaign } from "@/lib/actions/campaign";
import { notFound } from "next/navigation";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Droplets,
  ShieldCheck,
  Zap,
} from "lucide-react";
import CampaignStats from "@/components/campaigns/CampaignStats";
import DonationWidget from "@/components/campaigns/Donationwidget";
import { UserSessionToSSR } from "@/lib/core/session";
import { User } from "@/types";

export const dynamic = "force-dynamic";

interface CampaignDetailsPageProps {
  params: Promise<{ id: string }>;
}

function daysLeft(deadline: string | Date) {
  const diff = new Date(deadline).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const STATUS_STYLES: Record<string, string> = {
  approved: "bg-(--accent) text-white",
  pending: "bg-amber-500 text-white",
  rejected: "bg-red-500 text-white",
};

export default async function CampaignDetailsPage({
  params,
}: CampaignDetailsPageProps) {
  const { id } = await params;

  let campaign;
  try {
    ({ campaign } = await GetCampaign(id));
  } catch {
    notFound();
  }

  if (!campaign) {
    notFound();
  }

  const user = await UserSessionToSSR();

  const remaining = daysLeft(campaign.deadline);
  const wasUpdated =
    campaign.updatedAt &&
    new Date(campaign.updatedAt).getTime() !==
      new Date(campaign.createdAt).getTime();

  return (
    <main className="mx-auto max-w-7xl px-4 pt-10 pb-20 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Left column — story (≈65%) */}
        <div className="lg:col-span-8 space-y-10">
          {/* Hero image */}
          <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl">
            <img
              src={campaign.imageUrl}
              alt={campaign.title}
              className="w-full aspect-[16/9] object-cover"
            />
            <div className="absolute top-6 left-6 flex gap-2">
              <span className="rounded-full bg-black/50 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
                {campaign.category}
              </span>
              <span
                className={`rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest shadow-lg ${
                  STATUS_STYLES[campaign.status] ??
                  "bg-(--surface-muted) text-(--foreground)"
                }`}
              >
                {campaign.status}
              </span>
            </div>
            {campaign.status === "approved" && (
              <div className="absolute top-6 right-6">
                <span className="flex items-center gap-1.5 rounded-full bg-black/40 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
                  <ShieldCheck className="w-3 h-3" />
                  Verified
                </span>
              </div>
            )}
          </div>

          {/* Title + creator */}
          <div className="space-y-6">
            <h1 className="text-4xl font-extrabold tracking-tight text-(--foreground) sm:text-5xl leading-[1.1]">
              {campaign.title}
            </h1>

            {(campaign.creatorName || campaign.creatorEmail) && (
              <div className="flex items-center gap-4 border-y border-(--border) py-6">
                {campaign.creatorImage ? (
                  <div className="h-12 w-12 overflow-hidden rounded-2xl ring-4 ring-(--accent)/10">
                    <img
                      src={campaign.creatorImage}
                      alt={campaign.creatorName ?? "Creator"}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-(--surface-muted) text-lg font-bold text-(--accent) ring-4 ring-(--accent)/10">
                    {campaign.creatorName?.charAt(0).toUpperCase() ?? "C"}
                  </div>
                )}
                <div className="flex-1">
                  <p className="font-bold text-(--foreground)">
                    {campaign.creatorName ?? "Campaign Creator"}
                  </p>
                  <p className="text-xs font-medium text-(--muted)">
                    {campaign.creatorEmail}
                  </p>
                </div>
                <div className="hidden items-center gap-2 rounded-xl border border-(--accent)/20 bg-(--accent)/10 px-4 py-2 text-xs font-bold text-(--accent) sm:flex">
                  <CheckCircle2 className="w-4 h-4" />
                  Verified Creator
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-(--muted)">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="w-3.5 h-3.5" />
                Posted on {formatDate(campaign.createdAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarDays className="w-3.5 h-3.5" />
                Deadline: {formatDate(campaign.deadline)}
              </span>
              {wasUpdated && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Last updated {formatDate(campaign.updatedAt)}
                </span>
              )}
            </div>
          </div>

          {/* Story */}
          <article className="space-y-6">
            <h3 className="text-2xl font-bold text-(--foreground)">
              The Vision
            </h3>
            <p className="text-lg font-medium leading-relaxed text-(--muted) whitespace-pre-line">
              {campaign.description}
            </p>

            <div className="grid grid-cols-1 gap-6 pt-6 sm:grid-cols-2">
              <div className="space-y-4 rounded-3xl border border-(--border) bg-(--surface) p-8 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-(--accent)/10 text-(--accent)">
                  <Zap className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-(--foreground)">
                  Reward Info
                </h4>
                <p className="text-sm leading-relaxed text-(--muted) whitespace-pre-line">
                  {campaign.rewardInfo || "No reward details provided."}
                </p>
              </div>
              <div className="space-y-4 rounded-3xl border border-(--border) bg-(--surface) p-8 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500">
                  <Droplets className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-(--foreground)">
                  Minimum Contribution
                </h4>
                <p className="text-sm leading-relaxed text-(--muted)">
                  Support this campaign with at least{" "}
                  {(campaign.minimumContribution ?? 0).toLocaleString()}{" "}
                  credits.
                </p>
              </div>
            </div>
          </article>
        </div>

        {/* Right column — pledge card (≈35%) */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 space-y-6">
            <div className="space-y-8 rounded-[2.5rem] border border-(--border) bg-(--surface) p-8 shadow-xl">
              <CampaignStats
                raisedAmount={campaign.raisedAmount ?? 0}
                goal={campaign.goal ?? 0}
                status={campaign.status}
                daysLeft={remaining}
              />

              <DonationWidget campaign={campaign} user={user as User} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
