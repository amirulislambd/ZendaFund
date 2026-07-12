import { mockCampaigns } from '@/lib/data';
import { notFound } from 'next/navigation';

interface CampaignDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function CampaignDetailsPage({ params }: CampaignDetailsPageProps) {
  const { id } = await params;
  const campaign = mockCampaigns.find((item) => item.id === id);

  if (!campaign) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <img src={campaign.imageUrl} alt={campaign.title} className="h-72 w-full object-cover" />
        <div className="p-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">{campaign.category}</span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">{campaign.status}</span>
          </div>
          <h1 className="mt-6 text-3xl font-semibold text-slate-900">{campaign.title}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{campaign.story}</p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Funding Goal</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{campaign.fundingGoal.toLocaleString()} credits</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Raised Amount</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{campaign.raisedAmount.toLocaleString()} credits</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Minimum Contribution</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{campaign.minimumContribution} credits</p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-semibold text-slate-900">Reward Info</h2>
            <p className="mt-3 text-slate-600">{campaign.rewardInfo}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
