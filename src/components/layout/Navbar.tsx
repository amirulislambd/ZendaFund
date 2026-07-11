import Link from 'next/link';

const links = [
  { href: '/', label: 'Home' },
  { href: '/explore', label: 'Explore' },
  { href: '/login', label: 'Login' },
  { href: '/register', label: 'Register' },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-semibold text-slate-900">
          ZendaFund
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium text-slate-600">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-emerald-600">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
