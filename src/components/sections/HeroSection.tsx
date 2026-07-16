"use client";

import Image from "next/image";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import { heroSlides } from "@/lib/heroSlides";

export default function HeroSection() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section
      suppressHydrationWarning
      className="relative isolate overflow-hidden"
      style={{ backgroundColor: "var(--surface)" }}
    >
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={900}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop
        pagination={{ clickable: true, el: ".hero-pagination" }}
        onSwiper={(s) => {
          swiperRef.current = s;
        }}
        className="hero-swiper h-[560px] w-full sm:h-[640px] lg:h-[85vh] lg:min-h-[620px]"
      >
        {heroSlides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="relative h-full w-full overflow-hidden">
              {/* Full-bleed background image with continuous slow zoom */}
              <Image
                src={slide.image}
                alt={`${slide.headingLine1} ${slide.headingLine2}`}
                fill
                priority={i === 0}
                sizes="(max-width: 768px) 100vw, 75vw"
                className="kb-img object-cover"
              />

              {/* Gentle overlays to blend the image beautifully with the website's theme */}
              <div className="absolute inset-0 bg-[var(--surface)]/20" />
              <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[var(--surface)] to-transparent opacity-80" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[var(--surface)] to-transparent opacity-90" />

              {/* Overlaid copy */}
              <div className="relative z-10 flex h-full items-center justify-center px-6 sm:px-10 lg:px-16">
                <div className="w-full max-w-3xl rounded-[2rem] border border-(--border) bg-(--surface)/80 p-8 text-center shadow-2xl backdrop-blur-md sm:p-10 lg:p-12">
                  <div className="mx-auto flex w-fit items-center gap-3">
                    <span className="h-px w-8 bg-(--accent)/70" />
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-(--accent)">
                      {slide.eyebrow}
                    </span>
                  </div>

                  <h1 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-tight text-(--foreground) sm:text-5xl lg:text-[3.5rem]">
                    <span className="block">{slide.headingLine1}</span>
                    <span className="block bg-gradient-to-r from-(--accent) to-(--accent)/70 bg-clip-text text-transparent">
                      {slide.headingLine2}
                    </span>
                  </h1>

                  <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-(--muted) sm:text-lg">
                    {slide.description}
                  </p>

                  <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={slide.primaryCta.href}
                      className="inline-flex min-w-[180px] items-center justify-center rounded-full bg-(--accent) px-6 py-3 text-sm font-semibold text-(--surface) shadow-lg shadow-[rgba(52,211,153,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-(--accent)/80"
                    >
                      {slide.primaryCta.label}
                    </a>
                    <a
                      href={slide.secondaryCta.href}
                      className="inline-flex min-w-[180px] items-center justify-center rounded-full border border-(--border) bg-(--surface)/15 px-6 py-3 text-sm font-semibold text-(--foreground) backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-(--accent)/70 hover:bg-(--accent)/10 hover:text-(--accent)"
                    >
                      {slide.secondaryCta.label}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .hero-swiper {
          --swiper-pagination-color: #34d399;
          --swiper-pagination-bullet-inactive-color: #ffffff;
          --swiper-pagination-bullet-inactive-opacity: 0.35;
        }

        @keyframes kenburns {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.14);
          }
        }
        .kb-img {
          animation: kenburns 14s ease-in-out infinite alternate;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .kb-img {
            animation: none;
          }
        }
      `}</style>

      {/* Controls: pagination (left half) + arrows (over image, right half) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-7 z-20 flex items-center justify-between px-6 sm:px-10 lg:px-16">
        <div className="hero-pagination pointer-events-auto flex items-center gap-2 [&_.swiper-pagination-bullet]:h-2 [&_.swiper-pagination-bullet]:w-2 [&_.swiper-pagination-bullet]:rounded-full [&_.swiper-pagination-bullet]:transition-all [&_.swiper-pagination-bullet-active]:w-6" />

        <div className="pointer-events-auto hidden gap-2 lg:flex">
          <button
            aria-label="Previous slide"
            onClick={() => swiperRef.current?.slidePrev()}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-(--border) bg-(--surface-muted)/70 text-(--foreground) backdrop-blur-sm transition-colors hover:border-(--accent)/70 hover:text-(--accent)"
          >
            ‹
          </button>
          <button
            aria-label="Next slide"
            onClick={() => swiperRef.current?.slideNext()}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-(--border) bg-(--surface-muted)/70 text-(--foreground) backdrop-blur-sm transition-colors hover:border-(--accent)/70 hover:text-(--accent)"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}