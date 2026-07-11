import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-emerald-600 via-emerald-500 to-slate-900 px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium">
            Funding the next big idea
          </p>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
            Back meaningful projects and help creators grow.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-emerald-50">
            ZendaFund brings supporters and creators together in a transparent, inspiring crowdfunding experience.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/explore" className="rounded-full bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-emerald-50">
              Explore Campaigns
            </Link>
            <Link href="/register" className="rounded-full border border-white/50 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
              Join as Creator
            </Link>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur">
          <div className="rounded-2xl bg-slate-950/70 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">Live Impact</p>
            <h2 className="mt-3 text-3xl font-semibold">$2.4M raised for community projects</h2>
            <p className="mt-4 text-sm text-slate-300">
              From education and healthcare to green initiatives, our community supports campaigns that create real change.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
