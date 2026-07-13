"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Campaign, User } from "@/types";
import { Contribution } from "@/lib/actions/contribution";

type DonationWidgetProps = {
  campaign: Campaign;
  user: User;
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

  const userData = {
    supporterName: user?.name,
    supporterEmail: user?.email,
    supporterImage: user?.image,
  };

  const handleContinue = async () => {
    // TODO: hook this up to Stripe Checkout — create a session server-side
    // with { campaignId: campaign._id, amount, userId: user.id } and redirect
    // the browser to the returned session URL.
    const data = {
      campaignId: campaign._id,
      creatorName: campaign.creatorName,
      creatorEmail: campaign.creatorEmail,
      amount,
      ...userData,
    };

    const res = await Contribution({ data });
    if (res) {
      console.log(res);
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
            whileTap={{ scale: 0.95 }}
            onClick={() => handlePresetClick(preset)}
            className={`rounded-2xl border px-3 py-2.5 text-sm font-semibold transition-colors ${
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
            value={customAmount}
            onChange={(event) => handleCustomChange(event.target.value)}
            placeholder={`Min. ${minContribution}`}
            className="w-full rounded-2xl border border-(--border) bg-(--surface-muted) px-4 py-3 text-(--foreground) outline-none transition focus:border-(--accent) focus:ring-2 focus:ring-(--accent)/20"
          />
        </div>
        {isBelowMinimum && (
          <p className="mt-2 text-xs text-red-400">
            Minimum contribution is {minContribution.toLocaleString()} credits.
          </p>
        )}
      </div>

      <motion.button
        type="button"
        disabled={isBelowMinimum || amount <= 0}
        whileTap={{ scale: 0.97 }}
        onClick={handleContinue}
        className="mt-6 w-full rounded-2xl bg-(--accent) py-3 text-sm font-semibold text-(--surface) transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
      >
        Continue to secure payment →
      </motion.button>

      <p className="mt-3 text-center text-xs text-(--muted)">
        Payments are securely processed by Stripe.
      </p>
    </motion.div>
  );
}