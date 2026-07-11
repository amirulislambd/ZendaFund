import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import { mockCampaigns } from '@/lib/data';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <Navbar />
      <main className="flex-1">
        <HeroSection />

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">Featured Campaigns</p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-900">Support causes that matter</h2>
            </div>
            <Link href="/explore" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">
              View all
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {mockCampaigns.map((campaign) => (
              <article key={campaign.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <img src={campaign.imageUrl} alt={campaign.title} className="h-48 w-full object-cover" />
                <div className="p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
                      {campaign.category}
                    </span>
                    <span className="text-sm text-slate-500">{campaign.status}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-slate-900">{campaign.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{campaign.story}</p>
                  <div className="mt-6 flex items-center justify-between text-sm text-slate-500">
                    <span>Goal: {campaign.fundingGoal.toLocaleString()} credits</span>
                    <span>Raised: {campaign.raisedAmount.toLocaleString()}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
