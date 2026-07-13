"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Campaign } from "@/types";

type CampaignCardProps = {
  campaign: Campaign;
};

export default function CampaignCard({ campaign }: CampaignCardProps) {
  const {
    _id,
    title,
    creatorName,
    deadline,
    goal,
    raisedAmount,
    imageUrl,
  } = campaign;

  const progress = Math.min(
    100,
    Math.round((raisedAmount / goal) * 100) || 0,
  );

  const formattedDeadline = new Date(deadline).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col overflow-hidden rounded-3xl border border-(--border) bg-(--surface) shadow-[0_20px_60px_rgba(15,23,42,0.06)] transition-shadow hover:shadow-[0_24px_70px_rgba(15,23,42,0.12)]"
    >
      <div className="relative h-44 w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 text-base font-semibold text-(--foreground)">
          {title}
        </h3>

        <p className="mt-1 text-xs text-(--muted)">
          by <span className="font-medium text-(--foreground)">{creatorName}</span>
        </p>

        <div className="mt-4">
          <div className="h-2 w-full overflow-hidden rounded-full bg-(--surface-muted)">
            <div
              className="h-full rounded-full bg-(--accent) transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-(--muted)">
            <span>
              <span className="font-semibold text-(--foreground)">
                {raisedAmount.toLocaleString()}
              </span>{" "}
              raised
            </span>
            <span>
              Goal:{" "}
              <span className="font-semibold text-(--foreground)">
                {goal.toLocaleString()}
              </span>
            </span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-(--muted)">
          <span>Deadline</span>
          <span className="font-medium text-(--foreground)">
            {formattedDeadline}
          </span>
        </div>

        <Link
          href={`/campaigns/${_id}`}
          className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-(--accent) py-2.5 text-sm font-semibold text-(--surface) transition-opacity hover:opacity-90"
        >
          View Details →
        </Link>
      </div>
    </motion.div>
  );
}