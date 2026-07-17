"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { Mail, Phone, MapPin, HelpCircle, LifeBuoy } from "lucide-react";

const contactItems = [
  {
    title: "Email Support",
    description: "Get help with campaigns, contributions, and account issues.",
    icon: Mail,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    title: "FAQ Center",
    description: "Find answers to common questions instantly.",
    icon: HelpCircle,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  {
    title: "Live Assistance",
    description: "Need urgent help? Reach out to our support team.",
    icon: LifeBuoy,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
];

export default function ContactPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="
        min-h-screen
        bg-[#020817]
        text-white
      "
    >
      <main
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
          transition={{ duration: 0.6 }}
          className="
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-white/10
        bg-white/[0.03]
        p-8
        backdrop-blur-xl
        lg:p-14
      "
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
          bg-emerald-500/10
          blur-[120px]
        "
          />

          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
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
                Contact ZendaFund
              </span>

              <h1
                className="
              mt-6
              text-4xl
              font-black
              leading-tight
              lg:text-6xl
            "
              >
                We're Here To Help You Succeed
              </h1>

              <p
                className="
              mt-5
              max-w-xl
              text-lg
              leading-8
              text-slate-400
            "
              >
                Whether you need help with a campaign, payments, contributions,
                or account settings, our team is ready to assist.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/explore"
                  className="
                rounded-2xl
                bg-cyan-500
                px-6
                py-3
                font-semibold
                text-slate-950
                transition
                hover:bg-cyan-400
              "
                >
                  Explore Campaigns
                </Link>

                <Link
                  href="/about"
                  className="
                rounded-2xl
                border
                border-white/10
                px-6
                py-3
                font-semibold
                transition
                hover:border-cyan-500/30
                hover:bg-white/5
              "
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Right Side */}

            <div
              className="
            rounded-[28px]
            border
            border-white/10
            bg-white/[0.03]
            p-8
          "
            >
              <h2 className="text-2xl font-bold">Contact Information</h2>

              <p className="mt-3 text-slate-400">
                Reach out through any of the channels below and we'll respond as
                soon as possible.
              </p>

              <div className="mt-8 space-y-5">
                <div className="flex items-center gap-4">
                  <Mail className="h-5 w-5 text-cyan-400" />
                  <span>support@zendafund.com</span>
                </div>

                <div className="flex items-center gap-4">
                  <Phone className="h-5 w-5 text-cyan-400" />
                  <span>+880 1700 000000</span>
                </div>

                <div className="flex items-center gap-4">
                  <MapPin className="h-5 w-5 text-cyan-400" />
                  <span>Dhaka, Bangladesh</span>
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
          className="mt-20"
        >
          <div className="mb-10 text-center">
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
              Support Options
            </span>

            <h2
              className="
        mt-5
        text-3xl
        font-black
        lg:text-5xl
      "
            >
              How Can We Help?
            </h2>

            <p
              className="
        mx-auto
        mt-4
        max-w-2xl
        text-slate-400
      "
            >
              Choose the support channel that best fits your needs.
            </p>
          </div>

          <div
            className="
      grid
      gap-6
      md:grid-cols-2
      lg:grid-cols-3
    "
          >
            {contactItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.4,
                }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
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
                {/* Glow */}

                <div
                  className="
            absolute
            -right-10
            -top-10
            h-28
            w-28
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
            ${item.bg}
            ${item.color}
          `}
                >
                  <item.icon className="h-7 w-7" />
                </div>

                <h3
                  className="
            mt-6
            text-xl
            font-bold
          "
                >
                  {item.title}
                </h3>

                <p
                  className="
            mt-3
            leading-7
            text-slate-400
          "
                >
                  {item.description}
                </p>

                <div
                  className={`
            mt-6
            h-[2px]
            w-full
            rounded-full
            ${item.bg}
          `}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20"
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
        absolute
        bottom-0
        right-0
        h-72
        w-72
        rounded-full
        bg-emerald-500/10
        blur-[120px]
      "
            />

            <div className="relative">
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
                  Send Message
                </span>

                <h2
                  className="
            mt-5
            text-3xl
            font-black
            lg:text-5xl
          "
                >
                  We'd Love To Hear From You
                </h2>

                <p
                  className="
            mx-auto
            mt-4
            max-w-2xl
            text-slate-400
          "
                >
                  Have a question, suggestion, or issue? Send us a message and
                  our team will respond as quickly as possible.
                </p>
              </div>

              <form className="mx-auto mt-12 max-w-3xl">
                <div className="grid gap-5 md:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="
              rounded-2xl
              border
              border-white/10
              bg-white/[0.03]
              px-5
              py-4
              outline-none
              transition
              focus:border-cyan-500/40
            "
                  />

                  <input
                    type="email"
                    placeholder="Your Email"
                    className="
              rounded-2xl
              border
              border-white/10
              bg-white/[0.03]
              px-5
              py-4
              outline-none
              transition
              focus:border-cyan-500/40
            "
                  />
                </div>

                <input
                  type="text"
                  placeholder="Subject"
                  className="
            mt-5
            w-full
            rounded-2xl
            border
            border-white/10
            bg-white/[0.03]
            px-5
            py-4
            outline-none
            transition
            focus:border-cyan-500/40
          "
                />

                <textarea
                  rows={6}
                  placeholder="Write your message..."
                  className="
            mt-5
            w-full
            rounded-2xl
            border
            border-white/10
            bg-white/[0.03]
            px-5
            py-4
            outline-none
            transition
            focus:border-cyan-500/40
          "
                />

                <button
                  type="submit"
                  className="
            mt-6
            w-full
            rounded-2xl
            bg-cyan-500
            px-6
            py-4
            font-semibold
            text-slate-950
            transition
            hover:bg-cyan-400
          "
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </motion.section>
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <div
            className="
      relative
      overflow-hidden
      rounded-[32px]
      border
      border-white/10
      bg-gradient-to-br
      from-cyan-500/10
      via-transparent
      to-emerald-500/10
      p-8
      text-center
      backdrop-blur-xl
      lg:p-14
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
        bg-cyan-500/10
        blur-[140px]
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
          leading-tight
          lg:text-6xl
        "
              >
                Turn Ideas Into Reality With Community Support
              </h2>

              <p
                className="
          mx-auto
          mt-5
          max-w-2xl
          text-lg
          leading-8
          text-slate-400
        "
              >
                Discover inspiring campaigns, support meaningful causes, or
                launch your own project today.
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
        </motion.section>{" "}
      </main>
    </motion.div>
  );
}
