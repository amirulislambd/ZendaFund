import React from 'react';
import LoginForm from '@/components/auth/LoginForm';

export const metadata = {
  title: 'Sign In - ZendaFund',
  description: 'Sign in to your ZendaFund account.',
};

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden bg-[#0f172a]">
      {/* Immersive Background */}
      <div
        className="absolute inset-0 z-0 scale-105"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=2000")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.35) blur(4px)',
        }}
      />

      {/* Glassmorphic Card */}
      <main className="relative z-10 w-full max-w-md bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] shadow-2xl p-8 md:p-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <a href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/15 ring-1 ring-emerald-400/30">
              <span className="text-base font-bold text-emerald-400">Z</span>
            </div>
            <span className="text-lg font-semibold tracking-tight text-emerald-400">ZendaFund</span>
          </a>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Welcome <span className="text-[#10b981]">Back</span>
          </h1>
          <p className="mt-2 font-medium text-slate-400">Sign in to continue to your dashboard</p>
        </div>

        {/* Client Form */}
        <LoginForm />
      </main>
    </div>
  );
}
