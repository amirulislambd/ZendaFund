"use client";

import benefits from "@/lib/data/benefits";
import faqs from "@/lib/data/FAQ";
import { motion } from "framer-motion";
import { Coins, Sparkles } from "lucide-react";

interface Package {
  id: string;
  title: string;
  credits: number;
  priceUsd: number;
  badge: string;
  featured: boolean;
  color: string;
  features: readonly string[];
}

interface Props {
  user: any;
  packages: readonly Package[];
}

export default function PurchaseCreditGrid({ user, packages }: Props) {
  return (
    <section className="space-y-10">
      {/* Hero */}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-8"
      >
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="absolute -bottom-20 left-10 h-52 w-52 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-2 text-cyan-400">
              <Sparkles className="h-5 w-5" />

              <span className="font-medium">Purchase Credits</span>
            </div>

            <h1 className="max-w-xl text-4xl font-bold text-white">
              Support creators with platform credits.
            </h1>

            <p className="mt-4 max-w-2xl text-slate-300">
              Purchase credits securely and use them anytime to contribute to
              campaigns you love.
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="rounded-2xl border border-cyan-400/20 bg-white/5 p-6 backdrop-blur-xl"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-cyan-500/20 p-4">
                <Coins className="h-8 w-8 text-cyan-400" />
              </div>

              <div>
                <p className="text-sm text-slate-400">Current Balance</p>

                <h2 className="text-4xl font-bold text-white">
                  {user?.credits ?? 0}
                </h2>

                <p className="text-cyan-400">Available Credits</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Pricing Cards  */}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
  {packages.map((pkg, index) => (
    <motion.div
      key={pkg.id}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: index * 0.08,
      }}
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      className={`group relative overflow-hidden rounded-2xl border bg-slate-900/70 backdrop-blur-xl transition-all ${
        pkg.featured
          ? "border-cyan-400 shadow-xl shadow-cyan-500/15"
          : "border-white/10 hover:border-cyan-500/40"
      }`}
    >
      {/* Top Gradient */}
      <div
        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${pkg.color}`}
      />

      {/* Featured Badge */}
      {pkg.featured && (
        <div className="absolute left-0 top-0 rounded-br-xl bg-cyan-500 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
          Most Popular
        </div>
      )}

      {/* Small Badge */}
      <div className="absolute right-4 top-4 rounded-full border border-cyan-400/30 bg-cyan-500/20 px-3 py-1 text-[11px] font-semibold text-cyan-300">
        {pkg.badge}
      </div>

      <div className="p-6">
        {/* Icon */}
        <div
          className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${pkg.color}`}
        >
          <Coins className="h-6 w-6 text-white" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white">
          {pkg.title}
        </h3>

        <p className="mt-1 text-sm text-slate-400">
          Perfect for supporting campaigns
        </p>

        {/* Credits */}
        <div className="mt-5">
          <span className="text-4xl font-extrabold text-white">
            {pkg.credits}
          </span>

          <span className="ml-2 text-sm text-slate-400">
            Credits
          </span>
        </div>

        {/* Price */}
        <div className="mt-3">
          <span className="text-3xl font-bold text-cyan-400">
            ${pkg.priceUsd}
          </span>
        </div>

        {/* Divider */}
        <div className="my-5 h-px bg-white/10" />

        {/* Features */}
        <ul className="space-y-2">
          {pkg.features.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-2 text-xs text-slate-300"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              {feature}
            </li>
          ))}
        </ul>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => console.log(pkg)}
          className={`mt-6 w-full rounded-xl bg-gradient-to-r ${pkg.color} py-2.5 font-semibold text-white shadow-lg transition-all duration-300`}
        >
          Purchase Now
        </motion.button>
      </div>

      {/* Hover Glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div
          className={`absolute -bottom-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-gradient-to-r ${pkg.color} opacity-20 blur-3xl`}
        />
      </div>
    </motion.div>
  ))}
</div>
      {/* Benefits  */}

      <section className="mt-20">
      <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  viewport={{ once: true }}
  className="mb-12 flex flex-col items-center text-center"
>
  <span className="mb-3 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
    Benefits
  </span>

  <h2 className="bg-gradient-to-r from-white via-cyan-300 to-cyan-500 bg-clip-text text-4xl font-extrabold text-transparent md:text-5xl">
    Why Buy Credits?
  </h2>

  <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />

  <p className="mt-6 max-w-2xl text-base leading-7 text-slate-400">
    Purchase credits securely and support verified campaigns instantly with
    fast delivery and transparent pricing.
  </p>
</motion.div>

  <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
    {benefits.map((item, index) => {
      const Icon = item.icon;

      return (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-white/10 bg-slate-900/60 p-8 text-center backdrop-blur"
        >
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/20">
            <Icon className="h-8 w-8 text-cyan-400" />
          </div>

          <h3 className="text-xl font-semibold text-white">
            {item.title}
          </h3>

          <p className="mt-3 text-sm text-slate-400">
            {item.description}
          </p>
        </motion.div>
      );
    })}
  </div>
</section>

{/* FAQ */}

<section className="mt-24">
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  viewport={{ once: true }}
  className="mb-12 flex flex-col items-center text-center"
>
  <span className="mb-3 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-violet-400">
    Support
  </span>

  <h2 className="bg-gradient-to-r from-white via-violet-300 to-pink-400 bg-clip-text text-4xl font-extrabold text-transparent md:text-5xl">
    Frequently Asked Questions
  </h2>

  <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-violet-500 to-pink-500" />

  <p className="mt-6 max-w-2xl text-base leading-7 text-slate-400">
    Find answers to the most common questions about purchasing and using
    credits on ZendaFund.
  </p>
</motion.div>

  <div className="space-y-5">
    {faqs.map((faq, index) => (
      <motion.div
        key={faq.q}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.08 }}
        viewport={{ once: true }}
        className="rounded-2xl border border-white/10 bg-slate-900/60 p-6"
      >
        <h3 className="text-lg font-semibold text-white">
          {faq.q}
        </h3>

        <p className="mt-3 text-slate-400">
          {faq.a}
        </p>
      </motion.div>
    ))}
  </div>
</section>

    </section>
    
  );
}
