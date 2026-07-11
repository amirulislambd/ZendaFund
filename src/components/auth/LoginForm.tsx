"use client";

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { signIn } from '@/lib/auth-client';

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<LoginFormInputs>();

  // Demo credential quick-fill buttons
  const fillDemo = (email: string, password: string) => {
    setValue('email', email, { shouldValidate: true });
    setValue('password', password, { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setIsLoading(true);
    setServerError(null);
    try {
      const { error } = await signIn.email({
        email: data.email,
        password: data.password,
        callbackURL: '/',
      });
      if (error) {
        setServerError(error.message || 'Invalid email or password.');
      }
    } catch {
      setServerError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await signIn.social({
        provider: 'google',
        callbackURL: '/',
      });
    } catch {
      setServerError('Google sign-in failed. Please try again.');
      setIsGoogleLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

      {/* Demo Credentials */}
      <div className="rounded-2xl border border-white/8 bg-slate-800/30 p-4">
        <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-slate-500">
          Quick Demo Login
        </p>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Admin', email: 'admin@zendafund.com', pass: 'Admin@123' },
            { label: 'Creator', email: 'creator@zendafund.com', pass: 'Creator@123' },
            { label: 'Supporter', email: 'supporter@zendafund.com', pass: 'Supporter@123' },
          ].map((d) => (
            <button
              key={d.label}
              type="button"
              onClick={() => fillDemo(d.email, d.pass)}
              className="rounded-xl bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-400 transition-all hover:bg-emerald-500/20 hover:text-emerald-300 active:scale-95"
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Server Error */}
      {serverError && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {serverError}
        </div>
      )}

      {/* Email */}
      <div className="space-y-2">
        <label className="ml-1 text-sm font-semibold text-slate-300">Email Address</label>
        <div className="relative group">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-[#10b981] transition-colors" />
          <input
            type="email"
            placeholder="name@example.com"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email address' },
            })}
            className={`w-full bg-slate-800/40 border ${
              errors.email
                ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500'
                : 'border-white/5 focus:border-[#10b981] focus:ring-[#10b981]/20'
            } rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 transition-all`}
          />
        </div>
        {errors.email && <p className="ml-1 mt-1 text-xs text-red-500">{errors.email.message}</p>}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label className="ml-1 text-sm font-semibold text-slate-300">Password</label>
        <div className="relative group">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-[#10b981] transition-colors" />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Minimum 6 characters' },
            })}
            className={`w-full bg-slate-800/40 border ${
              errors.password
                ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500'
                : 'border-white/5 focus:border-[#10b981] focus:ring-[#10b981]/20'
            } rounded-2xl py-4 pl-12 pr-12 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 transition-all`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {errors.password && <p className="ml-1 mt-1 text-xs text-red-500">{errors.password.message}</p>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="mt-6 w-full rounded-2xl bg-[#10b981] py-5 text-lg font-bold tracking-wide text-white shadow-lg shadow-[#10b981]/20 transition-all hover:bg-[#059669] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">or</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* Google Sign-In */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isGoogleLoading}
        className="w-full flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-slate-800/40 py-4 text-sm font-semibold text-slate-200 transition-all hover:border-white/20 hover:bg-slate-800/70 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {/* Google SVG Icon */}
        <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none">
          <path d="M43.611 20.083H42V20H24v8h11.303C33.654 32.657 29.332 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" fill="#FFC107"/>
          <path d="M6.306 14.691l6.571 4.819C14.655 15.108 19.000 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" fill="#FF3D00"/>
          <path d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" fill="#4CAF50"/>
          <path d="M43.611 20.083H42V20H24v8h11.303a11.99 11.99 0 01-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" fill="#1976D2"/>
        </svg>
        {isGoogleLoading ? 'Redirecting...' : 'Continue with Google'}
      </button>

      <p className="mt-6 text-center font-medium text-slate-400">
        Don&apos;t have an account?{' '}
        <a
          href="/register"
          className="text-[#10b981] underline-offset-4 transition-colors hover:text-[#059669] hover:underline"
        >
          Create one
        </a>
      </p>
    </form>
  );
}
