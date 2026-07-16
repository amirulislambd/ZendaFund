"use client";

import { motion } from "framer-motion";
import {
  Search,
  HandCoins,
  TrendingUp,
} from "lucide-react";

const STEPS = [
  {
    number: "01",
    title: "Discover a Cause",
    description:
      "Browse campaigns by category, search for what matters most to you, and find inspiring projects created by real people.",
    icon: Search,
  },
  {
    number: "02",
    title: "Contribute Credits",
    description:
      "Support campaigns instantly using your credits. Every contribution helps creators move one step closer to their goals.",
    icon: HandCoins,
  },
  {
    number: "03",
    title: "Track the Impact",
    description:
      "Monitor campaign progress in real time, receive updates, and see exactly how your support makes a difference.",
    icon: TrendingUp,
  },
];

export default function HowItWorksSection() {
  return (
    <section className="relative overflow-hidden py-20">
      {/* Background Glow */}

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

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}

        <motion.div
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
          className="mb-16 text-center"
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
            ✦ How It Works
          </div>

          <h2 className="mt-5 text-4xl font-bold text-(--foreground) md:text-5xl">
            Support a Campaign
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
              In Three Simple Steps
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-(--muted)">
            Discover meaningful projects, contribute with confidence,
            and watch your impact grow in real time.
          </p>
        </motion.div>

        {/* Steps */}

        <div className="relative grid gap-6 lg:grid-cols-3">
          {/* Desktop Connection Line */}

          <div
            className="
              absolute
              left-1/2
              top-24
              hidden
              h-[2px]
              w-[70%]
              -translate-x-1/2
              bg-gradient-to-r
              from-cyan-500/30
              via-blue-500/40
              to-cyan-500/30
              lg:block
            "
          />

          {STEPS.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              whileHover={{
                y: -10,
                scale: 1.02,
              }}
              className="
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-white/[0.03]
                p-8
                backdrop-blur-xl
              "
            >
              {/* Hover Glow */}

              <div
                className="
                  absolute
                  -right-10
                  -top-10
                  h-32
                  w-32
                  rounded-full
                  bg-cyan-500/10
                  blur-3xl
                  transition-all
                  duration-500
                  group-hover:scale-150
                "
              />

              {/* Step Number */}

              <div
                className="
                  absolute
                  right-5
                  top-5
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-cyan-500/20
                  bg-cyan-500/10
                  text-lg
                  font-bold
                  text-cyan-400
                "
              >
                {step.number}
              </div>

              {/* Icon */}

              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  from-cyan-500/20
                  to-blue-500/20
                  text-cyan-400
                "
              >
                <step.icon className="h-8 w-8" />
              </div>

              {/* Content */}

              <h3 className="mt-6 text-xl font-bold text-(--foreground)">
                {step.title}
              </h3>

              <p className="mt-3 leading-7 text-(--muted)">
                {step.description}
              </p>

              {/* Bottom Accent */}

              <div
                className="
                  mt-6
                  h-[2px]
                  w-full
                  rounded-full
                  bg-gradient-to-r
                  from-cyan-500
                  to-blue-500
                  opacity-30
                "
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}