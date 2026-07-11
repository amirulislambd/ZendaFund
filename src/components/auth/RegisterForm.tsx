"use client";

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Camera,
  ChevronDown,
  Check,
  UserCircle
} from 'lucide-react';
import { signUp, signIn } from '@/lib/auth-client';
import { RegisterFormInputs } from '@/types';

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<RegisterFormInputs>({
    defaultValues: {
      role: undefined
    }
  });

  const selectedRole = watch('role');

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      const { data: user, error } = await signUp.email({
        email: data.email,
        password: data.password,
        name: data.fullName,
        role: data.role,
        credits: data.role === 'Supporter' ? 50 : 20,
        profilePic: avatarPreview || undefined,
      } as any);

      if (error) {
        console.error('Registration failed:', error);
        alert(error.message || 'Registration failed');
        return;
      }

      // On success, redirect to dashboard
      window.location.href = '/';
    } catch (err) {
      console.error('Registration error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* 1. Stylish Avatar Upload slot */}
      <div className="flex flex-col items-center justify-center mb-6">
        <div className="relative group">
          <label
            htmlFor="avatar-upload"
            className="cursor-pointer block relative transition-transform active:scale-95 duration-200"
          >
            <div className="w-28 h-28 rounded-full border-2 border-dashed border-white/20 bg-slate-800/30 flex flex-col items-center justify-center overflow-hidden transition-all group-hover:border-[#10b981] group-hover:bg-slate-800/60 ring-4 ring-transparent group-hover:ring-[#10b981]/10">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Profile Preview" className="w-full h-full object-cover" />
              ) : (
                <>
                  <Camera className="w-8 h-8 text-slate-400 group-hover:text-[#10b981] transition-colors mb-1" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center px-4 leading-tight group-hover:text-[#10b981]">
                    Upload Profile
                  </span>
                </>
              )}
            </div>

            <div className="absolute inset-0 flex items-center justify-center bg-[#10b981]/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
              <span className="sr-only">Upload avatar</span>
            </div>
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            className="hidden"
            {...register("avatar")}
            onChange={(e) => {
              register("avatar").onChange(e);
              handleAvatarChange(e);
            }}
          />
        </div>
      </div>

      {/* Full Name */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-300 ml-1">Full Name</label>
        <div className="relative group">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-[#10b981] transition-colors" />
          <input
            type="text"
            placeholder="John Doe"
            {...register("fullName", { required: "Full name is required" })}
            className={`w-full bg-slate-800/40 border ${errors.fullName ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-white/5 focus:border-[#10b981] focus:ring-[#10b981]/20'} rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 transition-all`}
          />
        </div>
        {errors.fullName && <p className="text-red-500 text-xs mt-1 ml-1">{errors.fullName.message}</p>}
      </div>

      {/* Email Address */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-300 ml-1">Email Address</label>
        <div className="relative group">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-[#10b981] transition-colors" />
          <input
            type="email"
            placeholder="name@example.com"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email address" }
            })}
            className={`w-full bg-slate-800/40 border ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-white/5 focus:border-[#10b981] focus:ring-[#10b981]/20'} rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 transition-all`}
          />
        </div>
        {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email.message}</p>}
      </div>

      {/* Password Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-300 ml-1">Password</label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-[#10b981] transition-colors" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" }
              })}
              className={`w-full bg-slate-800/40 border ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-white/5 focus:border-[#10b981] focus:ring-[#10b981]/20'} rounded-2xl py-4 pl-12 pr-12 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 transition-all`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-xs mt-1 ml-1">{errors.password.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-300 ml-1">Confirm Password</label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-[#10b981] transition-colors" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (val) => {
                  if (watch('password') != val) {
                    return "Your passwords do not match";
                  }
                }
              })}
              className={`w-full bg-slate-800/40 border ${errors.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-white/5 focus:border-[#10b981] focus:ring-[#10b981]/20'} rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 transition-all`}
            />
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 ml-1">{errors.confirmPassword.message}</p>}
        </div>
      </div>

      {/* 2. Custom Role Dropdown Selector */}
      <div className="space-y-2 relative">
        <label className="text-sm font-semibold text-slate-300 ml-1">Select User Role</label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsRoleOpen(!isRoleOpen)}
            className={`w-full bg-slate-800/40 border ${errors.role ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-white/5 focus:border-[#10b981] focus:ring-[#10b981]/20'} rounded-2xl py-4 pl-12 pr-4 text-left text-white focus:outline-none focus:ring-2 transition-all flex items-center justify-between group`}
          >
            <div className="flex items-center gap-3">
              <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus:text-[#10b981] transition-colors" />
              <span className={selectedRole ? "text-white" : "text-slate-600"}>
                {selectedRole || "Choose your role"}
              </span>
            </div>
            <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${isRoleOpen ? 'rotate-180 text-[#10b981]' : ''}`} />
          </button>

          <input
            type="hidden"
            {...register("role", { required: "Please select a role" })}
          />

          {isRoleOpen && (
            <div className="absolute z-20 w-full mt-2 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              {(['Supporter', 'Creator'] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setValue("role", option, { shouldValidate: true });
                    setIsRoleOpen(false);
                  }}
                  className="w-full px-6 py-4 flex items-center justify-between text-slate-300 hover:bg-slate-800 hover:text-white transition-all text-left"
                >
                  <span className="font-medium">{option}</span>
                  {selectedRole === option && <Check className="w-5 h-5 text-[#10b981]" />}
                </button>
              ))}
            </div>
          )}
        </div>
        {errors.role && <p className="text-red-500 text-xs mt-1 ml-1">{errors.role.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-[#10b981] hover:bg-[#059669] text-white font-bold py-5 rounded-2xl shadow-lg shadow-[#10b981]/20 transition-all active:scale-[0.98] mt-6 text-lg tracking-wide"
      >
        Create Account
      </button>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">or</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* Google Sign-Up */}
      <button
        type="button"
        onClick={async () => {
          setIsGoogleLoading(true);
          await signIn.social({ provider: 'google', callbackURL: '/' });
          setIsGoogleLoading(false);
        }}
        disabled={isGoogleLoading}
        className="w-full flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-slate-800/40 py-4 text-sm font-semibold text-slate-200 transition-all hover:border-white/20 hover:bg-slate-800/70 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none">
          <path d="M43.611 20.083H42V20H24v8h11.303C33.654 32.657 29.332 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" fill="#FFC107"/>
          <path d="M6.306 14.691l6.571 4.819C14.655 15.108 19.000 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" fill="#FF3D00"/>
          <path d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" fill="#4CAF50"/>
          <path d="M43.611 20.083H42V20H24v8h11.303a11.99 11.99 0 01-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" fill="#1976D2"/>
        </svg>
        {isGoogleLoading ? 'Redirecting...' : 'Continue with Google'}
      </button>

      <p className="text-center text-slate-400 mt-6 font-medium">
        Already have an account?{" "}
        <a href="/login" className="text-[#10b981] hover:text-[#059669] transition-colors underline-offset-4 hover:underline">
          Sign In
        </a>
      </p>
    </form>
  );
}
