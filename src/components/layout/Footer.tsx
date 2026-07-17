import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { FaFacebook } from "react-icons/fa";
import { BsGithub } from "react-icons/bs";
import { LiaLinkedin } from "react-icons/lia";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#020817] mt-5 md:mt-10 lg:mt-16">
      {" "}
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
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {" "}
        <div className="hidden gap-10 md:grid md:grid-cols-2 lg:grid-cols-4">
          {" "}
          <div>
            <div
              className="
                inline-flex
                items-center
                rounded-full
                border
                border-cyan-500/20
                bg-cyan-500/10
                px-3
                py-1
                text-xs
                font-medium
                text-cyan-400
              "
            >
              ✦ Crowdfunding Platform
            </div>

            <h3 className="mt-4 text-2xl font-bold text-white">ZendaFund</h3>

            <p className="mt-4 text-sm leading-6 text-slate-400">
              Empowering creators, innovators, and dreamers by connecting them
              with supporters around the world.
            </p>
          </div>{" "}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
              Quick Links
            </h4>

            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-cyan-400">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/explore" className="hover:text-cyan-400">
                  Explore Campaigns
                </Link>
              </li>

              <li>
                <Link href="/dashboard" className="hover:text-cyan-400">
                  Dashboard
                </Link>
              </li>

              <li>
                <Link href="/about" className="hover:text-cyan-400">
                  About Us
                </Link>
              </li>
            </ul>
          </div>{" "}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
              Resources
            </h4>

            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-cyan-400">
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link href="/terms" className="hover:text-cyan-400">
                  Terms of Service
                </Link>
              </li>

              <li>
                <Link href="/contact" className="hover:text-cyan-400">
                  Contact
                </Link>
              </li>

              <li>
                <Link href="/faq" className="hover:text-cyan-400">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>{" "}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
              Contact
            </h4>

            <ul className="mt-5 space-y-4 text-sm text-slate-400">
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-cyan-400" />
                hello@zendafund.com
              </li>

              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-cyan-400" />
                +880 1700-000000
              </li>

              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-cyan-400" />
                Dhaka, Bangladesh
              </li>
            </ul>

            <div className="mt-6 flex gap-3">
              <a href="#" className="rounded-xl border border-white/10 p-3">
                <FaFacebook className="h-4 w-4" />
              </a>

              <a href="#" className="rounded-xl border border-white/10 p-3">
                <BsGithub className="h-4 w-4" />
              </a>

              <a href="#" className="rounded-xl border border-white/10 p-3">
                <LiaLinkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="md:hidden">
          <div className="text-center">
            <div
              className="
        inline-flex
        items-center
        rounded-full
        border
        border-cyan-500/20
        bg-cyan-500/10
        px-3
        py-1
        text-xs
        font-medium
        text-cyan-400
      "
            >
              ✦ Crowdfunding Platform
            </div>

            <h3 className="mt-4 text-2xl font-bold text-white">ZendaFund</h3>

            <p className="mt-3 text-sm text-slate-400">
              Empowering creators and supporters worldwide.
            </p>
          </div>

          {/* Important Links */}

          <div className="mt-8 flex flex-wrap justify-center gap-5 text-sm">
            <Link href="/" className="transition hover:text-cyan-400">
              Home
            </Link>

            <Link href="/explore" className="transition hover:text-cyan-400">
              Explore
            </Link>

            <Link href="/dashboard" className="transition hover:text-cyan-400">
              Dashboard
            </Link>

            <Link href="/contact" className="transition hover:text-cyan-400">
              Contact
            </Link>
          </div>

          {/* Social Icons */}

          <div className="mt-8 flex justify-center gap-3">
            <a
              href="#"
              className="
        rounded-xl
        border
        border-white/10
        p-3
        transition
        hover:border-cyan-500/30
        hover:bg-cyan-500/10
      "
            >
              <FaFacebook className="h-4 w-4" />
            </a>

            <a
              href="#"
              className="
        rounded-xl
        border
        border-white/10
        p-3
        transition
        hover:border-cyan-500/30
        hover:bg-cyan-500/10
      "
            >
              <BsGithub className="h-4 w-4" />
            </a>

            <a
              href="#"
              className="
        rounded-xl
        border
        border-white/10
        p-3
        transition
        hover:border-cyan-500/30
        hover:bg-cyan-500/10
      "
            >
              <LiaLinkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
        {/* Bottom */}
        <div
          className="
    mt-12
    border-t
    border-white/10
    pt-6
    text-center
    text-sm
    text-slate-500
  "
        >
          © {new Date().getFullYear()} ZendaFund. All rights reserved.
        </div>
      </div>{" "}
      {/* Container End */}
    </footer>
  );
}
