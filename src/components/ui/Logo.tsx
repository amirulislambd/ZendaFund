"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type LogoProps = {
  href?: string;
  showText?: boolean;
  className?: string;
};

export default function Logo({
  href = "/",
  showText = true,
  className = "",
}: LogoProps) {
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isDashboard = pathname.startsWith("/dashboard");

  // Home => Large
  // Dashboard => Medium
  // Other Pages => Small

  const iconSize = isHome ? 60 : 42;

  const textClass = isHome
    ? "text-3xl xl:text-4xl leading-none"
    : isDashboard
    ? "text-xl lg:text-2xl leading-none"
    : "text-lg";

  const content = (
    <div
      className={`logo group relative inline-flex items-center overflow-hidden ${className}`}
    >
      {/* Light Sweep */}
      <span className="light-sweep" />

      <Image
        src="/assets/logo.png"
        alt="ZendaFund"
        width={iconSize}
        height={iconSize}
        priority
        className="relative z-10 transition-all duration-500 group-hover:scale-105"
      />

      {showText && (
        <span
          className={`relative z-10 -ml-1.5 ${textClass} font-bold tracking-tight text-white transition-all duration-500`}
        >
          <span className="brand">
            enda
            <span className="text-emerald-400 transition-colors duration-500 group-hover:text-emerald-200">
              Fund
            </span>
          </span>
        </span>
      )}

      <style jsx>{`
        .logo {
          isolation: isolate;
        }

        .brand {
          position: relative;
          display: inline-block;
          transition: all 0.45s ease;
        }

        .group:hover .brand {
          color: #d1fae5;
          text-shadow:
            0 0 8px rgba(16,185,129,.35),
            0 0 18px rgba(16,185,129,.18);
        }

        .light-sweep {
          position: absolute;

          top: -120%;
          left: -75%;

          width: 40%;
          height: 320%;

          transform: rotate(24deg);

          background: linear-gradient(
            90deg,
            transparent,
            rgba(255,255,255,.02),
            rgba(255,255,255,.12),
            rgba(255,255,255,.45),
            rgba(255,255,255,.12),
            rgba(255,255,255,.02),
            transparent
          );

          filter: blur(14px);

          pointer-events: none;

          z-index: 5;

          animation: sweep 9s ease-in-out infinite;
        }

        .group:hover .light-sweep {
          animation-duration: 6.5s;
          filter: blur(16px) brightness(1.2);
        }

        .group:hover img {
          filter:
            drop-shadow(0 0 10px rgba(16,185,129,.35))
            drop-shadow(0 0 20px rgba(16,185,129,.15));
        }

        @keyframes sweep {
          0% {
            left: -75%;
            opacity: 0;
          }

          8% {
            opacity: .08;
          }

          18% {
            opacity: .22;
          }

          30% {
            opacity: .45;
          }

          42% {
            opacity: .95;
          }

          55% {
            opacity: .55;
          }

          68% {
            opacity: .28;
          }

          82% {
            opacity: .12;
          }

          100% {
            left: 175%;
            opacity: 0;
          }
        }

        /* Hover Animation */

        .group:hover {
          transform: translateY(-1px);
        }

        .group:hover .brand {
          letter-spacing: 0.02em;
        }

        .group:hover .text-emerald-400 {
          color: #bbf7d0 !important;
        }

        .group img {
          transition:
            transform .45s ease,
            filter .45s ease;
        }

        .brand {
          transition:
            color .45s ease,
            text-shadow .45s ease,
            letter-spacing .45s ease;
        }
      `}</style>
    </div>
  );

  if (!href) return content;

  return (
    <Link
      href={href}
      className="inline-flex items-center"
      aria-label="ZendaFund"
    >
      {content}
    </Link>
  );
}