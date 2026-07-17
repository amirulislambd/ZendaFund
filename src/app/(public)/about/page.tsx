"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import {
  Target,
  Eye,
  HeartHandshake,
  ShieldCheck,
  Rocket,
  Users,
} from "lucide-react";

const FEATURES = [
  {
    title: "Transparent Funding",
    description:
      "Track every contribution with complete visibility and real-time progress updates.",
    icon: ShieldCheck,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    title: "Launch Faster",
    description:
      "Create campaigns in minutes and start receiving support without complicated setup.",
    icon: Rocket,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  {
    title: "Community Driven",
    description:
      "Connect directly with supporters and build a loyal community around your vision.",
    icon: Users,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
];
const faqItems = [
  {
    question: "What is ZendaFund?",
    answer:
      "ZendaFund is a modern crowdfunding platform that helps creators, innovators, and communities raise funds for meaningful projects.",
  },
  {
    question: "Who can create a campaign?",
    answer:
      "Anyone with a verified account can launch a campaign and start receiving support from the community.",
  },
  {
    question: "How do supporters contribute?",
    answer:
      "Supporters can contribute using credits or secure online payment methods available on the platform.",
  },
  {
    question: "Is fundraising transparent?",
    answer:
      "Yes. Campaign progress, contributions, and funding goals are displayed clearly for transparency.",
  },
];

export default function AboutPage() {
  return (
    <main
      className="
          min-h-screen
          bg-[#020817]
          text-white
        "
    >
      <div
        className="
            mx-auto
            max-w-7xl
            px-4
            py-20
            sm:px-6
            lg:px-8
          "
      >
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="
          relative
          overflow-hidden
          rounded-[32px]
          border
          border-white/10
          bg-white/[0.03]
          px-6
          py-20
          backdrop-blur-xl
          lg:px-16
        "
        >
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

          <div className="relative z-10 text-center">
            <span
              className="
              inline-flex
              rounded-full
              border
              border-cyan-500/20
              bg-cyan-500/10
              px-4
              py-2
              text-sm
              font-medium
              text-cyan-400
            "
            >
              ✦ About ZendaFund
            </span>

            <h1
              className="
              mt-6
              text-5xl
              font-black
              md:text-6xl
              lg:text-7xl
            "
            >
              Funding Dreams,
              <br />
              Building Communities.
            </h1>

            <p
              className="
              mx-auto
              mt-6
              max-w-3xl
              text-lg
              text-slate-400
            "
            >
              ZendaFund empowers creators, innovators, and dreamers by
              connecting them with supporters.
            </p>

            <div
              className="
              mt-10
              flex
              flex-col
              gap-4
              sm:flex-row
              sm:justify-center
            "
            >
              <Link
                href="/explore"
                className="
                rounded-2xl
                bg-cyan-500
                px-8
                py-4
                font-semibold
                text-slate-950
              "
              >
                Explore Campaigns
              </Link>

              <Link
                href="/contact"
                className="
                rounded-2xl
                border
                border-white/10
                px-8
                py-4
                font-semibold
              "
              >
                Contact Us
              </Link>
            </div>
          </div>
        </motion.section>
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        ></motion.section>
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24"
        >
          <div className="text-center">
            <span
              className="
        inline-flex
        rounded-full
        border
        border-cyan-500/20
        bg-cyan-500/10
        px-4
        py-2
        text-sm
        font-medium
        text-cyan-400
      "
            >
              Why Choose Us
            </span>

            <h2
              className="
        mt-4
        text-4xl
        font-black
      "
            >
              Designed for Creators
              <br />
              and Supporters
            </h2>

            <p
              className="
        mx-auto
        mt-4
        max-w-2xl
        text-slate-400
      "
            >
              Every feature is built to make fundraising easier, more
              transparent, and more impactful.
            </p>
          </div>

          <div
            className="
      mt-12
      grid
      gap-6
      md:grid-cols-3
    "
          >
            {FEATURES.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -8,
                }}
                className="
            group
            relative
            overflow-hidden
            rounded-[28px]
            border
            border-white/10
            bg-white/[0.03]
            p-8
            backdrop-blur-xl
          "
              >
                <div
                  className="
              absolute
              -right-10
              -top-10
              h-32
              w-32
              rounded-full
              bg-white/5
              blur-3xl
              transition-all
              duration-500
              group-hover:scale-150
            "
                />

                <div
                  className={`
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              ${feature.bg}
              ${feature.color}
            `}
                >
                  <feature.icon className="h-7 w-7" />
                </div>

                <h3
                  className="
              mt-6
              text-xl
              font-bold
            "
                >
                  {feature.title}
                </h3>

                <p
                  className="
              mt-3
              leading-7
              text-slate-400
            "
                >
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24"
        >
          <div
            className="
      relative
      overflow-hidden
      rounded-[32px]
      border
      border-white/10
      bg-white/[0.03]
      p-8
      backdrop-blur-xl
      lg:p-12
    "
          >
            {/* Glow */}

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
        relative
        grid
        gap-10
        lg:grid-cols-2
        lg:items-center
      "
            >
              {/* Left Side */}

              <div>
                <span
                  className="
            inline-flex
            rounded-full
            border
            border-cyan-500/20
            bg-cyan-500/10
            px-4
            py-2
            text-sm
            font-medium
            text-cyan-400
          "
                >
                  Our Purpose
                </span>

                <h2
                  className="
            mt-5
            text-4xl
            font-black
            lg:text-5xl
          "
                >
                  Turning Ideas Into Real Impact
                </h2>

                <p
                  className="
            mt-6
            max-w-xl
            leading-8
            text-slate-400
          "
                >
                  ZendaFund exists to help creators, innovators and dreamers
                  bring their ideas to life through community support and
                  transparent crowdfunding.
                </p>
              </div>

              {/* Right Side */}

              <div className="space-y-5">
                {/* Mission */}

                <div
                  className="
            rounded-3xl
            border
            border-white/10
            bg-white/[0.03]
            p-6
          "
                >
                  <div
                    className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-cyan-500/10
              text-cyan-400
            "
                  >
                    <Target className="h-6 w-6" />
                  </div>

                  <h3 className="mt-4 text-xl font-bold">Our Mission</h3>

                  <p className="mt-3 text-slate-400 leading-7">
                    Make fundraising accessible, transparent and effective for
                    everyone regardless of background.
                  </p>
                </div>

                {/* Vision */}

                <div
                  className="
            rounded-3xl
            border
            border-white/10
            bg-white/[0.03]
            p-6
          "
                >
                  <div
                    className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-violet-500/10
              text-violet-400
            "
                  >
                    <Eye className="h-6 w-6" />
                  </div>

                  <h3 className="mt-4 text-xl font-bold">Our Vision</h3>

                  <p className="mt-3 text-slate-400 leading-7">
                    Become the most trusted crowdfunding platform where ideas,
                    innovation and communities grow together.
                  </p>
                </div>

                {/* Values */}

                <div
                  className="
            rounded-3xl
            border
            border-white/10
            bg-white/[0.03]
            p-6
          "
                >
                  <div
                    className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-emerald-500/10
              text-emerald-400
            "
                  >
                    <HeartHandshake className="h-6 w-6" />
                  </div>

                  <h3 className="mt-4 text-xl font-bold">Our Values</h3>

                  <p className="mt-3 text-slate-400 leading-7">
                    Transparency, trust, innovation and community-first thinking
                    guide everything we build.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24"
        >
          <div className="text-center">
            <span
              className="
        inline-flex
        rounded-full
        border
        border-cyan-500/20
        bg-cyan-500/10
        px-4
        py-2
        text-sm
        font-medium
        text-cyan-400
      "
            >
              FAQ
            </span>

            <h2
              className="
        mt-4
        text-4xl
        font-black
      "
            >
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mx-auto mt-12 max-w-4xl space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="
          rounded-3xl
          border
          border-white/10
          bg-white/[0.03]
          p-6
        "
              >
                <h3 className="text-lg font-bold">{item.question}</h3>

                <p className="mt-3 text-slate-400 leading-7">{item.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24"
        >
          <div
            className="
      relative
      overflow-hidden
      rounded-[32px]
      border
      border-cyan-500/20
      bg-gradient-to-br
      from-cyan-500/10
      via-white/[0.03]
      to-violet-500/10
      p-8
      text-center
      backdrop-blur-xl
      lg:p-16
    "
          >
            {/* Glow */}

            <div
              className="
        absolute
        left-1/2
        top-1/2
        h-80
        w-80
        -translate-x-1/2
        -translate-y-1/2
        rounded-full
        bg-cyan-500/20
        blur-[150px]
      "
            />

            <div className="relative">
              <span
                className="
          inline-flex
          rounded-full
          border
          border-cyan-500/20
          bg-cyan-500/10
          px-4
          py-2
          text-sm
          font-medium
          text-cyan-400
        "
              >
                Join The Community
              </span>

              <h2
                className="
          mx-auto
          mt-6
          max-w-3xl
          text-4xl
          font-black
          lg:text-6xl
        "
              >
                Ready To Bring Your Idea To Life?
              </h2>

              <p
                className="
          mx-auto
          mt-5
          max-w-2xl
          text-lg
          text-slate-400
        "
              >
                Start a campaign, share your vision, and connect with supporters
                who believe in what you're building.
              </p>

              <div
                className="
          mt-10
          flex
          flex-col
          justify-center
          gap-4
          sm:flex-row
        "
              >
                <Link
                  href="/explore"
                  className="
            rounded-2xl
            bg-cyan-500
            px-8
            py-4
            font-semibold
            text-slate-950
            transition
            hover:bg-cyan-400
          "
                >
                  Explore Campaigns
                </Link>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
