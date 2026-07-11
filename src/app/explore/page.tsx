import { mockCampaigns } from '@/lib/data';
import Link from 'next/link';

export default function ExplorePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">Explore Campaigns</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Discover projects shaping the future</h1>
      </div>

      <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
        <input
          placeholder="Search campaigns"
          className="w-full rounded-full border border-slate-200 px-4 py-3 outline-none ring-0 md:max-w-sm"
        />
        <select className="rounded-full border border-slate-200 px-4 py-3">
          <option>All Categories</option>
          <option>Community</option>
          <option>Education</option>
          <option>Environment</option>
        </select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {mockCampaigns.map((campaign) => (
          <article key={campaign.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <img src={campaign.imageUrl} alt={campaign.title} className="h-44 w-full object-cover" />
            <div className="p-6">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
                  {campaign.category}
                </span>
                <span className="text-sm text-slate-500">{campaign.status}</span>
              </div>
              <h2 className="mt-4 text-xl font-semibold text-slate-900">{campaign.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{campaign.story}</p>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-sm text-slate-500">Raised {campaign.raisedAmount}</span>
                <Link href={`/campaign/${campaign.id}`} className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">
                  View Details
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
