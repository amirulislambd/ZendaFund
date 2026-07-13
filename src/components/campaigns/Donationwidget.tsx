"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import type { Campaign, User } from "@/types";

type DonationWidgetProps = {
  campaign: Campaign;
  user: User | null;
};

const PRESET_AMOUNTS = [10, 25, 50, 100];

export default function DonationWidget({
  campaign,
  user,
}: DonationWidgetProps) {
  const [amount, setAmount] = useState<number>(
    Math.max(campaign.minimumContribution ?? 1, PRESET_AMOUNTS[0]),
  );
  const [customAmount, setCustomAmount] = useState("");
  const minContribution = campaign.minimumContribution ?? 1;
  const isBelowMinimum = amount < minContribution;
  const isSupporter = user?.role === "supporter";

  const handlePresetClick = (value: number) => {
    setAmount(value);
    setCustomAmount("");
  };

  const handleCustomChange = (value: string) => {
    setCustomAmount(value);
    const parsed = Number(value);
    if (!Number.isNaN(parsed) && value.trim() !== "") {
      setAmount(parsed);
    }
  };

  const getRoleMessage = () => {
    if (!user) return null;
    switch (user.role) {
      case "creator":
        return "Creators cannot contribute to their own campaigns.";
      case "admin":
        return "Admin accounts cannot make contributions.";
      default:
        return (
          <>
            Contributions are only available for Supporter accounts. Your
            account role is{" "}
            <span className="font-semibold text-(--foreground)">
              {user.role}
            </span>
            .
          </>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-3xl border border-(--border) bg-(--surface) p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
    >
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-(--accent)">
        Support this campaign
      </p>
      <h3 className="mt-2 text-lg font-semibold text-(--foreground)">
        Choose an amount
      </h3>

      <div className="mt-4 grid grid-cols-4 gap-2">
        {PRESET_AMOUNTS.map((preset) => (
          <motion.button
            key={preset}
            type="button"
            disabled={!isSupporter}
            whileTap={{ scale: 0.95 }}
            onClick={() => handlePresetClick(preset)}
            className={`rounded-2xl border px-3 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
              amount === preset && customAmount === ""
                ? "border-(--accent) bg-(--accent)/10 text-(--accent)"
                : "border-(--border) bg-(--surface-muted) text-(--foreground) hover:border-(--accent)"
            }`}
          >
            {preset}
          </motion.button>
        ))}
      </div>

      <div className="mt-4">
        <label
          htmlFor="custom-amount"
          className="text-xs font-medium text-(--muted)"
        >
          Or enter a custom amount (credits)
        </label>
        <div className="relative mt-2">
          <input
            id="custom-amount"
            type="number"
            min={1}
            disabled={!isSupporter}
            value={customAmount}
            onChange={(event) => handleCustomChange(event.target.value)}
            placeholder={`Min. ${minContribution}`}
            className="w-full rounded-2xl border border-(--border) bg-(--surface-muted) px-4 py-3 text-(--foreground) outline-none transition focus:border-(--accent) focus:ring-2 focus:ring-(--accent)/20 disabled:cursor-not-allowed disabled:opacity-40"
          />
        </div>
        {isBelowMinimum && isSupporter && (
          <p className="mt-2 text-xs text-red-400">
            Minimum contribution is {minContribution.toLocaleString()} credits.
          </p>
        )}
      </div>

      {!user ? (
        <Link
          href="/login"
          className="mt-6 block w-full rounded-2xl bg-(--accent) py-3 text-center text-sm font-semibold text-(--surface) transition-opacity hover:opacity-90"
        >
          Log in to contribute
        </Link>
      ) : isSupporter ? (
        <form action="/api/contribution-checkout" method="POST">
          <input type="hidden" name="campaignId" value={campaign._id} />
          <input type="hidden" name="campaignTitle" value={campaign.title} />
          <input
            type="hidden"
            name="creatorName"
            value={campaign.creatorName ?? ""}
          />
          <input
            type="hidden"
            name="creatorEmail"
            value={campaign.creatorEmail ?? ""}
          />
          <input type="hidden" name="amount" value={amount} />

          <motion.button
            type="submit"
            disabled={isBelowMinimum || amount <= 0}
            whileTap={{ scale: 0.97 }}
            className="mt-6 w-full rounded-2xl bg-(--accent) py-3 text-sm font-semibold text-(--surface) transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
          >
            Contribute now →
          </motion.button>
        </form>
      ) : (
        <div>
          <button
            type="button"
            disabled
            className="mt-6 w-full cursor-not-allowed rounded-2xl bg-(--surface-muted) py-3 text-sm font-semibold text-(--muted) opacity-60"
          >
            Contribute now →
          </button>
          <p className="mt-3 text-center text-xs text-(--muted)">
            {getRoleMessage()}
          </p>
        </div>
      )}

      {isSupporter && (
        <p className="mt-3 text-center text-xs text-(--muted)">
          Your contribution will be marked as pending until approved by the
          creator.
        </p>
      )}
    </motion.div>
  );
}