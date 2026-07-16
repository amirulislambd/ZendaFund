"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Coins,
  Rocket,
  Users,
  HandHeart,
} from "lucide-react";

import {
  GetPlatformStats,
  PlatformStats,
} from "@/lib/api/lendingData";

function CountUpNumber({
  value,
}: {
  value: number;
}) {
  const motionValue =
    useMotionValue(0);

  const springValue =
    useSpring(motionValue, {
      duration: 1.2,
      bounce: 0,
    });

  const rounded =
    useTransform(
      springValue,
      (latest) =>
        Math.round(latest),
    );

  const [display, setDisplay] =
    useState(0);

  useEffect(() => {
    motionValue.set(value);
  }, [value, motionValue]);

  useEffect(() => {
    const unsubscribe =
      rounded.on(
        "change",
        (latest) =>
          setDisplay(latest),
      );

    return unsubscribe;
  }, [rounded]);

  return (
    <>
      {display.toLocaleString()}
    </>
  );
}

export default function PlatformImpactSection() {
  const sectionRef =
    useRef<HTMLDivElement>(null);

  const isInView = useInView(
    sectionRef,
    {
      once: true,
      margin: "200px",
    },
  );

  const [stats, setStats] =
    useState<PlatformStats>({
      totalRaised: 0,
      totalCampaignsFunded: 0,
      totalSupporters: 0,
      totalContributions: 0,
    });

  const [hasFetched, setHasFetched] =
    useState(false);

  useEffect(() => {
    if (!isInView || hasFetched)
      return;

    setHasFetched(true);

    GetPlatformStats().then(
      setStats,
    );
  }, [isInView, hasFetched]);

  const items = [
    {
      label: "Credits Raised",
      value: stats.totalRaised,
      icon: Coins,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Campaigns Funded",
      value:
        stats.totalCampaignsFunded,
      icon: Rocket,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
    },
    {
      label: "Supporters",
      value: stats.totalSupporters,
      icon: Users,
      color: "text-violet-400",
      bg: "bg-violet-500/10",
    },
    {
      label: "Contributions Made",
      value:
        stats.totalContributions,
      icon: HandHeart,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="
        relative
        mx-auto
        max-w-7xl
        px-4
        py-20
        sm:px-6
        lg:px-8
      "
    >
      {/* Background Glow */}

      <div
        className="
          absolute
          left-1/2
          top-0
          h-80
          w-80
          -translate-x-1/2
          rounded-full
          bg-cyan-500/10
          blur-[140px]
        "
      />

      {/* Header */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={
          isInView
            ? {
                opacity: 1,
                y: 0,
              }
            : {}
        }
        transition={{
          duration: 0.5,
        }}
        className="mb-14 text-center"
      >
        <div
          className="
            inline-flex
            items-center
            rounded-full
            border
            border-cyan-500/20
            bg-cyan-500/10
            px-4
            py-1.5
            text-sm
            font-medium
            text-cyan-400
          "
        >
          ✦ Platform Impact
        </div>

        <h2
          className="
            mt-5
            text-4xl
            font-bold
            text-white
            md:text-5xl
          "
        >
          Building Dreams Together
        </h2>

        <p
          className="
            mx-auto
            mt-4
            max-w-3xl
            text-slate-400
          "
        >
          Every contribution helps
          creators bring meaningful
          projects to life. Together,
          our community continues to
          grow and create real
          impact.
        </p>
      </motion.div>

      {/* Stats Container */}

      <div
       
      >
        {/* Glow Effects */}

        <div
          className="
            absolute
            left-0
            top-0
            h-72
            w-72
            rounded-full
            bg-cyan-500/10
            blur-[120px]
          "
        />

        <div
          className="
            absolute
            bottom-0
            right-0
            h-72
            w-72
            rounded-full
            bg-blue-500/10
            blur-[120px]
          "
        />

        <div className="relative">
          <div
            className="
              grid
              grid-cols-1
              gap-5
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            {items.map(
              (
                item,
                index,
              ) => (
                <motion.div
                  key={item.label}
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  animate={
                    isInView
                      ? {
                          opacity: 1,
                          y: 0,
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.4,
                    delay:
                      index * 0.08,
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.03,
                  }}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    p-6
                    backdrop-blur-xl
                  "
                >
                  {/* Hover Glow */}

                  <div
                    className="
                      absolute
                      -right-10
                      -top-10
                      h-24
                      w-24
                      rounded-full
                      bg-white/5
                      blur-3xl
                      transition-all
                      duration-500
                      group-hover:scale-150
                    "
                  />

                  {/* Icon */}

                  <div
                    className={`
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl
                      ${item.bg}
                      ${item.color}
                    `}
                  >
                    <item.icon className="h-7 w-7" />
                  </div>

                  {/* Value */}

                  <h3
                    className={`
                      mt-5
                      text-4xl
                      font-bold
                      ${item.color}
                    `}
                  >
                    <CountUpNumber
                      value={
                        item.value
                      }
                    />
                  </h3>

                  {/* Label */}

                  <p className="mt-2 text-sm text-slate-400">
                    {item.label}
                  </p>

                  {/* Bottom Accent */}

                  <div
                    className={`
                      mt-5
                      h-[2px]
                      w-full
                      rounded-full
                      ${item.bg}
                    `}
                  />
                </motion.div>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}