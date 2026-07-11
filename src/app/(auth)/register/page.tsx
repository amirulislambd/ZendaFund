import React from 'react';
import RegisterForm from '@/components/auth/RegisterForm';

export const metadata = {
  title: 'Register - ZendaFund',
  description: 'Create an account to join ZendaFund.',
};

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 font-manrope overflow-hidden bg-[#0f172a]">
      {/* Immersive Background with Blur Overlay */}
      <div 
        className="absolute inset-0 z-0 scale-105"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=2000")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.4) blur(4px)'
        }}
      />
      
      {/* Glassmorphic Form Card */}
      <main className="relative z-10 w-full max-w-lg bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] shadow-2xl p-8 md:p-12 animate-in fade-in zoom-in duration-500">
        
        {/* Form Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">
            Create <span className="text-[#10b981]">Account</span>
          </h1>
          <p className="text-slate-400 font-medium">Join ZendaFund today and fuel global change</p>
        </div>

        {/* Client Component for the Form */}
        <RegisterForm />
        
      </main>
    </div>
  );
}
