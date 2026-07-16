"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Quote } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";

import {
  GetTestimonials,
  Testimonial,
} from "@/lib/api/testimonials";

export default function TestimonialsSection() {
  const sectionRef =
    useRef<HTMLDivElement>(null);

  const isInView = useInView(
    sectionRef,
    {
      once: true,
      margin: "200px",
    },
  );

  const [testimonials, setTestimonials] =
    useState<Testimonial[]>([]);

  const [isLoading, setIsLoading] =
    useState(false);

  const [hasFetched, setHasFetched] =
    useState(false);

  useEffect(() => {
    if (!isInView || hasFetched) return;

    setHasFetched(true);
    setIsLoading(true);

    GetTestimonials(10)
      .then(({ testimonials }) =>
        setTestimonials(testimonials),
      )
      .finally(() =>
        setIsLoading(false),
      );
  }, [isInView, hasFetched]);  return (
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
          h-72
          w-72
          -translate-x-1/2
          rounded-full
          bg-cyan-500/10
          blur-[120px]
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
        className="relative mb-14 text-center"
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
          ✦ Community Testimonials
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
          Loved By Our Community
        </h2>

        <p
          className="
            mx-auto
            mt-4
            max-w-2xl
            text-slate-400
          "
        >
          Thousands of supporters are
          helping meaningful projects
          reach their goals and create
          real impact.
        </p>
      </motion.div>

      {/* Loading */}

      {isLoading ? (
        <div className="flex justify-center gap-5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="
                hidden
                h-64
                w-80
                animate-pulse
                rounded-3xl
                bg-white/5
                md:block
              "
            />
          ))}
        </div>
      ) : testimonials.length === 0 ? (
        hasFetched && (
          <div className="text-center">
            <p className="text-slate-400">
              No testimonials found.
            </p>
          </div>
        )
      ) : (        <motion.div
        initial={{ opacity: 0 }}
        animate={
          isInView
            ? { opacity: 1 }
            : {}
        }
        transition={{
          duration: 0.5,
          delay: 0.15,
        }}
      >
        <Swiper
          modules={[
            Autoplay,
            Pagination,
          ]}
          spaceBetween={24}
          slidesPerView={1}
          loop={
            testimonials.length > 3
          }
          autoplay={{
            delay: 4000,
            disableOnInteraction:
              false,
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="!pb-14"
        >
          {testimonials.map(
            (
              testimonial,
              index,
            ) => (
              <SwiperSlide
                key={`${testimonial.supporterName}-${index}`}
              >
                <motion.div
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  className="
                    group
                    relative
                    flex
                    h-full
                    flex-col
                    overflow-hidden
                    rounded-3xl
                    border
                    border-white/10
                    bg-gradient-to-br
                    from-[#08111f]
                    via-[#0b1628]
                    to-[#071321]
                    p-6
                    backdrop-blur-xl
                  "
                >
                  {/* Glow */}

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
                      group-hover:bg-cyan-500/20
                    "
                  />

                  {/* Quote */}

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
                    <Quote size={22} />
                  </div>

                  {/* Stars */}

                  <div className="mt-5 text-yellow-400">
                    ★★★★★
                  </div>

                  {/* Content */}

                  <p
                    className="
                      mt-5
                      flex-1
                      text-sm
                      leading-7
                      text-slate-300
                    "
                  >
                    Supported{" "}
                    <span className="font-semibold text-white">
                      {
                        testimonial.campaignTitle
                      }
                    </span>{" "}
                    with{" "}
                    <span className="font-semibold text-cyan-400">
                      {testimonial.contributionAmount.toLocaleString()}
                      {" "}
                      credits
                    </span>
                    .
                  </p>

                  {/* Badge */}

                  <div
                    className="
                      mt-5
                      inline-flex
                      w-fit
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
                    Verified Supporter
                  </div>

                  {/* Footer */}

                  <div className="mt-6 flex items-center gap-3">
                    <img
                      src={
                        testimonial.supporterImage ||
                        "/assets/avatar-placeholder.png"
                      }
                      alt={
                        testimonial.supporterName
                      }
                      loading="lazy"
                      className="
                        h-12
                        w-12
                        rounded-full
                        border-2
                        border-cyan-500/20
                        object-cover
                      "
                    />

                    <div>
                      <p className="font-semibold text-white">
                        {
                          testimonial.supporterName
                        }
                      </p>

                      <p className="text-xs text-slate-400">
                        Community Member
                      </p>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ),
          )}
        </Swiper>
      </motion.div>
    )}
  </section>
);
}