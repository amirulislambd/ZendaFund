"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Contribution } from "@/types";
import ContributionsTable from "@/components/shared/Contributionstable";

type ContributionsViewProps = {
  contributions: Contribution[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
};

// Animates a number counting up from 0 to `value` whenever `value` changes.
function CountUpNumber({ value }: { value: number }) {
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 0.8, bounce: 0 });
  const rounded = useTransform(springValue, (latest) => Math.round(latest));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    motionValue.set(value);
  }, [value, motionValue]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => setDisplay(latest));
    return unsubscribe;
  }, [rounded]);

  return <>{display}</>;
}

function ContributionsHeader({
  pagination,
}: {
  pagination: ContributionsViewProps["pagination"];
}) {
  const stats = [
    {
      label: "Total Contributions",
      value: pagination.total,
      color: "text-cyan-400",
    },
    {
      label: "Current Page",
      value: pagination.page,
      color: "text-emerald-400",
    },
    {
      label: "Total Pages",
      value: pagination.pages,
      color: "text-violet-400",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-[#050d2a] via-[#071331] to-[#0a2a45]"
    >
      {/* Background Accent */}
      <div className="absolute inset-y-0 right-0 w-[35%] bg-gradient-to-l from-cyan-800/20 via-sky-900/15 to-transparent" />
      <div className="absolute -right-28 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative z-10 flex flex-col gap-10 p-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div className="max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400">
            ✦ My Contributions
          </div>

          <h1 className="text-3xl font-bold leading-tight text-white md:text-5xl">
            Keep track of every
            <br />
            contribution you've made.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
            View your contribution history, payment methods, campaign details,
            and monitor the impact you've made by supporting creators.
          </p>
        </div>

        {/* Right Card */}
        <div className="w-full max-w-sm rounded-2xl border border-cyan-500/20 bg-[#07162e]/80 p-6 backdrop-blur-md">
          <div className="space-y-5">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center justify-between"
              >
                <span className="text-sm text-slate-300">{stat.label}</span>

                <span className={`text-3xl font-bold ${stat.color}`}>
                  <CountUpNumber value={stat.value} />
                </span>
              </div>
            ))}

            <div className="pt-3 border-t border-white/10">
              <p className="text-center text-sm font-medium text-cyan-400">
                Contribution Overview
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
export default function ContributionsView({
  contributions,
  pagination,
}: ContributionsViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const goToPage = (page: number) => {
    if (page < 1 || page > pagination.pages || page === pagination.page) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    startTransition(() => {
      router.replace(`?${params.toString()}`);
    });
  };

  return (
    <div>
      <ContributionsHeader pagination={pagination} />

      <motion.div
        key={pagination.page}
        animate={{ opacity: isPending ? 0.5 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <ContributionsTable
          contributions={contributions}
          showPaymentMethod
          showDate
          emptyMessage="You haven't made any contributions yet."
        />

        {/* Pagination */}
        {pagination.pages > 1 && (
          <nav className="mt-6 flex flex-col items-center gap-3 rounded-[28px] border border-(--border) bg-(--surface) p-4 shadow-sm sm:flex-row sm:justify-between">
            <div className="text-sm text-(--muted)">
              Showing page {pagination.page} of {pagination.pages} (
              {pagination.total} contributions)
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => goToPage(pagination.page - 1)}
                disabled={pagination.page <= 1}
                className="rounded-full border border-(--border) bg-(--surface-muted) px-4 py-2 text-sm text-(--foreground) transition hover:border-(--accent) disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from(
                { length: pagination.pages },
                (_, index) => index + 1,
              ).map((pageNumber) => (
                <motion.button
                  key={pageNumber}
                  type="button"
                  whileTap={{ scale: 0.92 }}
                  onClick={() => goToPage(pageNumber)}
                  className={`rounded-full px-4 py-2 text-sm transition-colors ${
                    pageNumber === pagination.page
                      ? "bg-(--accent) text-(--surface)"
                      : "border border-(--border) bg-(--surface-muted) text-(--foreground) hover:border-(--accent)"
                  }`}
                >
                  {pageNumber}
                </motion.button>
              ))}
              <button
                type="button"
                onClick={() => goToPage(pagination.page + 1)}
                disabled={pagination.page >= pagination.pages}
                className="rounded-full border border-(--border) bg-(--surface-muted) px-4 py-2 text-sm text-(--foreground) transition hover:border-(--accent) disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </nav>
        )}
      </motion.div>
    </div>
  );
}