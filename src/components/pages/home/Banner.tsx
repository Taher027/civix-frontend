"use client";

import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Eye,
  Megaphone,
  ShieldCheck,
  ThumbsUp,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type PanInfo,
  type Variants,
} from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Slide = {
  icon: LucideIcon;
  eyebrow: string;
  lead: string;
  highlight: string;
  text: string;
  cta: { label: string; href: string };
  secondary: { label: string; href: string };
  /** Tailwind gradient classes for the banner background */
  gradient: string;
  /** Tailwind text color for the highlighted headline part */
  accent: string;
  /** Optional photo, e.g. "/banners/road.jpg" (put it in /public) */
  image?: string;
};

// "report" is replaced with the role-based post-complaint link
const SLIDES: Slide[] = [
  {
    icon: Megaphone,
    eyebrow: "Centralized reporting",
    lead: "Report public issues.",
    highlight: "Track every fix.",
    text: "No more unanswered complaints or endless follow-ups. Report roads, drains, power or any civic problem in one place and watch its status update live until it is resolved.",
    cta: { label: "Report a problem", href: "report" },
    secondary: { label: "Track complaints", href: "/complaints" },
    gradient: "from-blue-600 via-blue-700 to-indigo-900",
    accent: "text-sky-200",
  },
  {
    icon: ThumbsUp,
    eyebrow: "Community priority",
    lead: "Let the community decide",
    highlight: "what is urgent.",
    text: "Neighbors upvote the issues that matter most, so serious problems rise to the top and get the attention they deserve, faster.",
    cta: { label: "See top issues", href: "/complaints" },
    secondary: { label: "Report a problem", href: "report" },
    gradient: "from-violet-600 via-purple-700 to-indigo-900",
    accent: "text-fuchsia-200",
  },
  {
    icon: Wrench,
    eyebrow: "Volunteer action",
    lead: "Volunteers step in.",
    highlight: "Problems get fixed.",
    text: "Local volunteers pick up verified issues, coordinate the work and post updates, closing the gap between a complaint and a real solution.",
    cta: { label: "Browse complaints", href: "/complaints" },
    secondary: { label: "Report a problem", href: "report" },
    gradient: "from-emerald-600 via-teal-700 to-cyan-900",
    accent: "text-emerald-200",
  },
  {
    icon: Eye,
    eyebrow: "Full transparency",
    lead: "Every update,",
    highlight: "visible to everyone.",
    text: "See who is handling your issue, what has been done and what comes next. Clear communication at every stage, from report to resolution.",
    cta: { label: "Track complaints", href: "/complaints" },
    secondary: { label: "Report a problem", href: "report" },
    gradient: "from-amber-500 via-orange-600 to-rose-800",
    accent: "text-amber-100",
  },
];

const AUTOPLAY_MS = 5000;
const ease = [0.22, 1, 0.36, 1] as const;

export default function HeroBanner({ userRole }: { userRole?: string }) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const total = SLIDES.length;
  const slide = SLIDES[index];
  const Icon = slide.icon;
  const reportHref = userRole ? `/${userRole}/post-complaint` : "/login";
  const resolveHref = (href: string) => (href === "report" ? reportHref : href);

  const paginate = (dir: number) => setIndex((i) => (i + dir + total) % total);

  const onPanEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -70) paginate(1);
    else if (info.offset.x > 70) paginate(-1);
  };

  // Parent: fades the slide and staggers its children
  const slideVariants: Variants = {
    enter: { opacity: 0 },
    center: {
      opacity: 1,
      transition: {
        duration: 0.9,
        ease,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: { opacity: 0, transition: { duration: 0.7, ease } },
  };

  const textVariants: Variants = {
    enter: { opacity: 0, x: reduceMotion ? 0 : -36 },
    center: { opacity: 1, x: 0, transition: { duration: 0.6, ease } },
  };

  // Slow zoom on the background (Ken Burns)
  const bgVariants: Variants = {
    enter: { scale: reduceMotion ? 1 : 1.12 },
    center: {
      scale: 1,
      transition: { duration: AUTOPLAY_MS / 1000 + 1.5, ease: "linear" },
    },
  };

  return (
    <div className="border-b bg-background">
      {/* Progress keyframes used by the active dot */}
      <style>{`@keyframes banner-progress{from{transform:scaleX(0)}to{transform:scaleX(1)}}`}</style>

      <div className="mx-auto w-full max-w-7xl px-4 py-4 md:px-6 md:py-6">
        <motion.section
          aria-roledescription="carousel"
          aria-label="Platform highlights"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") paginate(1);
            if (e.key === "ArrowLeft") paginate(-1);
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onPanEnd={onPanEnd}
          className="relative h-120 touch-pan-y overflow-hidden rounded-3xl bg-slate-900 shadow-xl ring-1 ring-black/5 md:h-136"
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={index}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              aria-live="polite"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${total}`}
              className="absolute inset-0"
            >
              {/* Background */}
              <motion.div
                variants={bgVariants}
                className={`absolute inset-0 bg-linear-to-br ${slide.gradient}`}
              >
                {slide.image && (
                  <>
                    <Image
                      src={slide.image}
                      alt=""
                      fill
                      sizes="100vw"
                      priority={index === 0}
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-black/10" />
                  </>
                )}
              </motion.div>

              {/* Pattern + decorative shapes */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-size-[26px_26px] opacity-10 mask-[linear-gradient(to_right,transparent,#000_70%)]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 top-1/2 hidden -translate-y-1/2 md:block"
              >
                <div className="relative flex size-130 items-center justify-center">
                  <span className="absolute inset-0 rounded-full border border-white/10" />
                  <span className="absolute inset-12 rounded-full border border-white/10" />
                  <span className="absolute inset-24 rounded-full border border-white/10" />
                  <Icon strokeWidth={1} className="size-56 text-white/15" />
                </div>
              </div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-24 -left-24 size-80 rounded-full bg-white/10 blur-3xl"
              />

              {/* Content */}
              <div className="relative flex h-full items-center px-6 pb-16 sm:px-10 md:px-14">
                <div className="max-w-xl text-left text-white">
                  <motion.span
                    variants={textVariants}
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur"
                  >
                    <ShieldCheck className="size-3.5" />
                    {slide.eyebrow}
                  </motion.span>

                  <motion.h1
                    variants={textVariants}
                    className="mt-5 text-balance text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl"
                  >
                    {slide.lead}{" "}
                    <span className={slide.accent}>{slide.highlight}</span>
                  </motion.h1>

                  <motion.p
                    variants={textVariants}
                    className="mt-4 max-w-lg text-pretty text-sm leading-relaxed text-white/80 sm:text-base md:text-lg"
                  >
                    {slide.text}
                  </motion.p>

                  <motion.div
                    variants={textVariants}
                    className="mt-7 flex flex-wrap items-center gap-3"
                  >
                    <motion.div
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Link
                        href={resolveHref(slide.cta.href)}
                        className="group inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-semibold text-slate-900 shadow-lg shadow-black/20 transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                      >
                        {slide.cta.label}
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </motion.div>

                    <motion.div
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Link
                        href={resolveHref(slide.secondary.href)}
                        className="inline-flex h-11 items-center justify-center rounded-lg border border-white/40 bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                      >
                        {slide.secondary.label}
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom controls (stay fixed while slides change) */}
          <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between px-6 pb-5 sm:px-10 md:px-14">
            {/* Dots with progress */}
            <div className="flex items-center gap-2">
              {SLIDES.map((s, i) => {
                const active = i === index;
                return (
                  <button
                    key={s.eyebrow}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={active}
                    className="flex h-5 items-center focus-visible:outline-none"
                  >
                    <motion.span
                      animate={{ width: active ? 44 : 10 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 28,
                      }}
                      className="relative block h-1.5 overflow-hidden rounded-full bg-white/30"
                    >
                      {active && (
                        <span
                          // New key on every slide restarts the CSS animation.
                          // When it ends, the next slide is shown (auto slide).
                          key={index}
                          className="absolute inset-0 origin-left rounded-full bg-white"
                          style={
                            reduceMotion
                              ? undefined
                              : {
                                  animation: `banner-progress ${AUTOPLAY_MS}ms linear forwards`,
                                  animationPlayState: paused
                                    ? "paused"
                                    : "running",
                                }
                          }
                          onAnimationEnd={(e) => {
                            if (e.target === e.currentTarget) paginate(1);
                          }}
                        />
                      )}
                    </motion.span>
                  </button>
                );
              })}
            </div>

            {/* Counter + arrows */}
            <div className="flex items-center gap-3">
              <span className="hidden text-xs font-medium tabular-nums text-white/80 sm:inline">
                {String(index + 1).padStart(2, "0")}
                <span className="mx-1 text-white/40">/</span>
                {String(total).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={() => paginate(-1)}
                aria-label="Previous slide"
                className="flex size-9 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => paginate(1)}
                aria-label="Next slide"
                className="flex size-9 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
