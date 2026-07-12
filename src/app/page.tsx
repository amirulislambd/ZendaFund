import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import { mockCampaigns } from '@/lib/data';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';

export default  function Home() {


  return (
    <div
      className="flex min-h-screen flex-col transition-colors duration-300"
      style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
    >
      <Navbar />
      <main className="flex-1">
        <HeroSection />

        

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-(--accent)">Featured Campaigns</p>
              <h2 className="mt-2 text-3xl font-semibold text-(--foreground)">Support causes that matter</h2>
            </div>
            <Link href="/explore" className="text-sm font-semibold text-(--accent) hover:text-(--accent)/80">
              View all
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {mockCampaigns.map((campaign) => (
              <article key={campaign.id} className="overflow-hidden rounded-3xl border border-(--border) bg-(--surface) shadow-sm">
                <img src={campaign.imageUrl} alt={campaign.title} className="h-48 w-full object-cover" />
                <div className="p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-(--surface-muted) px-3 py-1 text-sm font-medium text-(--foreground)">
                      {campaign.category}
                    </span>
                    <span className="text-sm text-(--muted)">{campaign.status}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-(--foreground)">{campaign.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-(--muted)">{campaign.story}</p>
                  <div className="mt-6 flex items-center justify-between text-sm text-(--muted)">
                    <span>Goal: {campaign.fundingGoal.toLocaleString()} credits</span>
                    <span>Raised: {campaign.raisedAmount.toLocaleString()}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
        <Toaster />
      </main>
      <Footer />
    </div>
  );
}
