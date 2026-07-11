export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 py-10 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <h3 className="text-lg font-semibold text-white">ZendaFund</h3>
          <p className="mt-3 text-sm leading-6">
            A modern crowdfunding platform that connects creators with supporters.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Quick Links</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href="/explore" className="hover:text-emerald-400">Explore Campaigns</a></li>
            <li><a href="/about" className="hover:text-emerald-400">About</a></li>
            <li><a href="/contact" className="hover:text-emerald-400">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>hello@zendafund.com</li>
            <li>+880 1700 000000</li>
            <li>Dhaka, Bangladesh</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
