"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Cpu,
  Palette,
  Users,
  HeartPulse,
  Leaf,
  GraduationCap,
} from "lucide-react";

const CATEGORIES = [
  {
    name: "Technology",
    icon: Cpu,
    color: "text-sky-400",
    bg: "bg-sky-500/10",
  },
  {
    name: "Art",
    icon: Palette,
    color: "text-pink-400",
    bg: "bg-pink-500/10",
  },
  {
    name: "Community",
    icon: Users,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    name: "Health",
    icon: HeartPulse,
    color: "text-rose-400",
    bg: "bg-rose-500/10",
  },
  {
    name: "Sustainability",
    icon: Leaf,
    color: "text-lime-400",
    bg: "bg-lime-500/10",
  },
  {
    name: "Education",
    icon: GraduationCap,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
] as const;

export default function ExploreByCategorySection() {
  return (
    <section className="relative overflow-hidden py-20">      {/* Background Glow */}

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

    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
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
              py-1
              text-sm
              font-medium
              text-cyan-400
            "
          >
            ✦ Explore Categories
          </div>

          <h2 className="mt-5 text-4xl font-bold text-(--foreground) md:text-5xl">
            Discover Projects By

            <span
              className="
                block
                bg-gradient-to-r
                from-cyan-400
                to-blue-500
                bg-clip-text
                text-transparent
              "
            >
              Your Interests
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-(--muted)">
            Explore campaigns across multiple categories
            and support causes that truly matter to you.
          </p>
        </motion.div>        <div
          className="
            grid
            grid-cols-2
            gap-5
            sm:grid-cols-3
            lg:grid-cols-6
          "
        >
          {CATEGORIES.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
              }}
              whileHover={{
                y: -8,
                scale: 1.03,
              }}
            >              <Link
            href={`/explore?category=${encodeURIComponent(
              category.name,
            )}`}
            className="
              group
              relative
              flex
              flex-col
              items-center
              overflow-hidden
              rounded-3xl
              border
              border-white/10
              bg-white/[0.03]
              p-6
              text-center
              backdrop-blur-xl
              transition-all
              duration-300
              hover:border-cyan-500/30
            "
          >
            {/* Hover Glow */}

            <div
              className="
                absolute
                -right-8
                -top-8
                h-24
                w-24
                rounded-full
                bg-cyan-500/10
                blur-3xl
                transition-all
                duration-500
                group-hover:scale-150
              "
            />

            {/* Icon */}

            <div
              className={`
                relative
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                ${category.bg}
                ${category.color}
                transition-all
                duration-300
                group-hover:scale-110
              `}
            >
              <category.icon className="h-8 w-8" />
            </div>

            <h3 className="mt-5 font-semibold text-(--foreground)">
              {category.name}
            </h3>

            <div
              className={`
                mt-4
                h-[2px]
                w-full
                rounded-full
                ${category.bg}
              `}
            />
          </Link>
        </motion.div>
      ))}
    </div>      </div>
    </section>
  );
}