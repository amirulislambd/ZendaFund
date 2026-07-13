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
    { label: "Total", value: pagination.total, color: "emerald" },
    { label: "Current", value: pagination.page, color: "sky" },
    { label: "Pages", value: pagination.pages, color: "violet" },
  ] as const;

  const colorClasses = {
    emerald: {
      text: "text-emerald-400",
      hoverText: "group-hover:text-emerald-300",
      hoverBg: "hover:bg-emerald-500/10",
      hoverShadow: "hover:shadow-emerald-500/10",
    },
    sky: {
      text: "text-sky-400",
      hoverText: "group-hover:text-sky-300",
      hoverBg: "hover:bg-sky-500/10",
      hoverShadow: "hover:shadow-sky-500/10",
    },
    violet: {
      text: "text-violet-400",
      hoverText: "group-hover:text-violet-300",
      hoverBg: "hover:bg-violet-500/10",
      hoverShadow: "hover:shadow-violet-500/10",
    },
  } as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mb-8 rounded-3xl bg-(--card) px-8 py-10 shadow-sm"
    >
      <div className="flex flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="inline-flex items-center rounded-full bg-emerald-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-400"
        >
          ✦ SUPPORTER DASHBOARD
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.12 }}
          className="mt-5 text-4xl font-bold tracking-tight text-(--foreground) md:text-5xl"
        >
          My Contributions
        </motion.h1>

        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 64, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 h-1 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="mt-5 max-w-2xl text-sm leading-7 text-(--muted) md:text-base"
        >
          View all your contributions in one place. Track your donations,
          payment methods, campaign details, and monitor your overall impact.
        </motion.p>

        {/* Small Stats */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {stats.map((stat, index) => {
            const colors = colorClasses[stat.color];
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.32 + index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -4 }}
                className={`group rounded-2xl bg-(--background)/70 px-6 py-4 shadow-sm transition-colors duration-300 ${colors.hoverBg} hover:shadow-lg ${colors.hoverShadow}`}
              >
                <p
                  className={`text-xs uppercase tracking-wider text-(--muted) transition-colors duration-300 ${colors.hoverText}`}
                >
                  {stat.label}
                </p>

                <motion.h3
                  whileHover={{ scale: 1.1 }}
                  className={`mt-1 text-3xl font-bold ${colors.text}`}
                >
                  <CountUpNumber value={stat.value} />
                </motion.h3>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
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