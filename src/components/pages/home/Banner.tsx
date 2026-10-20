"use client";

import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Eye,
  Megaphone,
  Pause,
  Play,
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
  /** Banner background (every slide ends in the same dark navy for a unified look) */
  gradient: string;
  /** Color of the highlighted headline words */
  accent: string;
  /** Optional photo, e.g. "/banners/road.jpg" (put it in /public) */
  image?: string;
};

// href "report" is replaced with the role-based post-complaint link
const SLIDES: Slide[] = [
  {
    icon: Megaphone,
    eyebrow: "Centralized reporting",
    lead: "Report public issues.",
    highlight: "Track every fix.",
    text: "No more unanswered complaints or endless follow-ups. Report roads, drains, power or any civic problem in one place and follow its progress through resolution.",
    cta: { label: "Report a problem", href: "report" },
    secondary: { label: "Track complaints", href: "/complaints" },
    gradient: "from-blue-700 via-blue-900 to-slate-950",
    accent: "text-sky-300",
  },
  {
    icon: ThumbsUp,
    eyebrow: "Community priority",
    lead: "Let the community decide",
    highlight: "what matters most.",
    text: "Neighbors support the issues that matter most, helping urgent problems rise to the top and get the attention they deserve.",
    cta: { label: "Explore top issues", href: "/complaints" },
    secondary: { label: "Report a problem", href: "report" },
    gradient: "from-indigo-700 via-indigo-900 to-slate-950",
    accent: "text-indigo-200",
  },
  {
    icon: Wrench,
    eyebrow: "Volunteer action",
    lead: "Local people step up.",
    highlight: "Real change follows.",
    text: "Volunteers can pick up verified issues, coordinate the work and share updates, closing the gap between a complaint and a solution.",
    cta: { label: "Browse complaints", href: "/complaints" },
    secondary: { label: "Report a problem", href: "report" },
    gradient: "from-teal-700 via-teal-900 to-slate-950",
    accent: "text-teal-200",
  },
  {
    icon: Eye,
    eyebrow: "Full transparency",
    lead: "Every update,",
    highlight: "out in the open.",
    text: "See who is handling an issue, what has been done and what comes next. Clear updates keep everyone informed from report to resolution.",
    cta: { label: "Track complaints", href: "/complaints" },
    secondary: { label: "Report a problem", href: "report" },
    gradient: "from-cyan-700 via-sky-900 to-slate-950",
    accent: "text-cyan-200",
  },
];

const AUTOPLAY_MS = 4000;
const ease = [0.22, 1, 0.36, 1] as const;

export default function HeroBanner({ userRole }: { userRole?: string }) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  // Two separate reasons to pause, so they never cancel each other out:
  const [userPaused, setUserPaused] = useState(false); // Pause/Play button
  const [interacting, setInteracting] = useState(false); // hover or focus
  const paused = userPaused || interacting;

  const total = SLIDES.length;
  const slide = SLIDES[index];
  const Icon = slide.icon;

  const reportHref = userRole ? `/${userRole}/post-complaint` : "/login";
  const resolveHref = (href: string) => (href === "report" ? reportHref : href);

  const paginate = (direction: number) =>
    setIndex((current) => (current + direction + total) % total);

  const onPanEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -70) paginate(1);
    else if (info.offset.x > 70) paginate(-1);
  };

  const slideVariants: Variants = {
    enter: { opacity: 0 },
    center: {
      opacity: 1,
      transition: {
        duration: reduceMotion ? 0 : 0.55,
        ease,
        staggerChildren: reduceMotion ? 0 : 0.08,
        delayChildren: reduceMotion ? 0 : 0.08,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: reduceMotion ? 0 : 0.25, ease },
    },
  };

  const textVariants: Variants = {
    enter: { opacity: 0, x: reduceMotion ? 0 : -22 },
    center: {
      opacity: 1,
      x: 0,
      transition: { duration: reduceMotion ? 0 : 0.45, ease },
    },
  };

  const bgVariants: Variants = {
    enter: { scale: reduceMotion ? 1 : 1.06 },
    center: {
      scale: 1,
      transition: {
        duration: reduceMotion ? 0 : AUTOPLAY_MS / 1000 + 0.5,
        ease: "linear",
      },
    },
  };

  const controlButton =
    "flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white";

  return (
    <section className="border-b bg-background py-4 sm:py-6">
      {/* Keyframes for the active dot's progress bar */}
      <style>{`@keyframes hero-progress{from{transform:scaleX(0)}to{transform:scaleX(1)}}`}</style>

      <div className="mx-auto w-full max-w-7xl px-3 sm:px-6 lg:px-8">
        <motion.section
          aria-roledescription="carousel"
          aria-label="Platform highlights"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") paginate(1);
            if (event.key === "ArrowLeft") paginate(-1);
          }}
          onMouseEnter={() => setInteracting(true)}
          onMouseLeave={() => setInteracting(false)}
          onFocus={() => setInteracting(true)}
          onBlur={(event) => {
            if (
              !event.currentTarget.contains(event.relatedTarget as Node | null)
            ) {
              setInteracting(false);
            }
          }}
          onPanEnd={onPanEnd}
          className="relative isolate min-h-127.5 overflow-hidden rounded-[1.75rem] bg-slate-950 shadow-2xl shadow-slate-950/20 ring-1 ring-black/5 outline-none focus-visible:ring-2 focus-visible:ring-ring sm:min-h-132.5 md:min-h-140 md:rounded-[2rem] lg:min-h-147.5"
        >
          <AnimatePresence initial={false} mode="sync">
            <motion.div
              key={index}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              // Don't announce every slide while it auto-rotates
              aria-live={paused ? "polite" : "off"}
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
                      sizes="(max-width: 768px) 100vw, 1280px"
                      priority={index === 0}
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-slate-950/85 via-slate-950/55 to-slate-950/15" />
                  </>
                )}
              </motion.div>

              {/* Soft highlight + dot pattern */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_85%_15%,rgba(255,255,255,0.14),transparent)]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-size-[28px_28px] opacity-[0.07] mask-[linear-gradient(to_right,black,transparent_90%)]"
              />

              {/* Decorative rings + icon */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-36 top-1/2 hidden -translate-y-1/2 md:block"
              >
                <div className="relative flex size-136 items-center justify-center lg:size-168">
                  <span className="absolute inset-0 rounded-full border border-white/10" />
                  <span className="absolute inset-14 rounded-full border border-white/10" />
                  <span className="absolute inset-28 rounded-full border border-white/10" />
                  <span className="absolute inset-44 rounded-full border border-white/8" />
                  <Icon
                    strokeWidth={0.8}
                    className="size-56 text-white/14 lg:size-72"
                  />
                </div>
              </div>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-28 -left-20 size-72 rounded-full bg-white/8 blur-3xl sm:size-96"
              />

              {/* Content */}
              <div className="relative flex min-h-127.5 items-center px-5 pb-24 pt-12 sm:min-h-132.5 sm:px-10 md:min-h-140 md:px-14 md:pb-28 lg:min-h-147.5 lg:px-20">
                <div className="max-w-2xl text-left text-white">
                  <motion.span
                    variants={textVariants}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-semibold tracking-wide text-white/95 shadow-sm backdrop-blur-md sm:text-sm"
                  >
                    <ShieldCheck className="size-4 text-white/90" />
                    {slide.eyebrow}
                  </motion.span>

                  <motion.h1
                    variants={textVariants}
                    className="mt-5 max-w-2xl text-balance text-[2.15rem] font-bold leading-[1.06] tracking-[-0.04em] sm:mt-6 sm:text-5xl md:text-6xl lg:text-7xl"
                  >
                    {slide.lead}{" "}
                    <span className={slide.accent}>{slide.highlight}</span>
                  </motion.h1>

                  <motion.p
                    variants={textVariants}
                    className="mt-5 max-w-xl text-pretty text-sm leading-7 text-white/75 sm:mt-6 sm:text-base sm:leading-8 md:text-lg"
                  >
                    {slide.text}
                  </motion.p>

                  <motion.div
                    variants={textVariants}
                    className="mt-7 flex flex-col gap-3 min-[420px]:flex-row sm:mt-8"
                  >
                    <motion.div
                      whileHover={reduceMotion ? undefined : { y: -2 }}
                      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                    >
                      <Link
                        href={resolveHref(slide.cta.href)}
                        className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-black/15 transition-colors hover:bg-sky-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 min-[420px]:w-auto sm:px-6"
                      >
                        {slide.cta.label}
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </motion.div>

                    <motion.div
                      whileHover={reduceMotion ? undefined : { y: -2 }}
                      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                    >
                      <Link
                        href={resolveHref(slide.secondary.href)}
                        className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-white/25 bg-white/8 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:border-white/40 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white min-[420px]:w-auto sm:px-6"
                      >
                        {slide.secondary.label}
                      </Link>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    variants={textVariants}
                    className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-white/65 sm:mt-9 sm:text-sm"
                  >
                    <span className="inline-flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-emerald-300" />
                      Community-powered
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-sky-300" />
                      Transparent updates
                    </span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls (fixed while slides change) */}
          <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between gap-4 border-t border-white/10 bg-slate-950/20 px-5 py-4 backdrop-blur-sm sm:px-10 sm:py-5 md:px-14 lg:px-20">
            {/* Dots with progress */}
            <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
              {SLIDES.map((item, slideIndex) => {
                const active = slideIndex === index;

                return (
                  <button
                    key={item.eyebrow}
                    type="button"
                    onClick={() => setIndex(slideIndex)}
                    aria-label={`Go to slide ${slideIndex + 1}: ${item.eyebrow}`}
                    aria-current={active ? "true" : undefined}
                    className="flex h-7 items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                  >
                    <span
                      className={`relative block h-1.5 overflow-hidden rounded-full transition-[width,background-color] duration-300 ${
                        active
                          ? "w-8 bg-white/35 sm:w-11"
                          : "w-2 bg-white/35 hover:bg-white/70"
                      }`}
                    >
                      {active && (
                        <span
                          // A new key restarts the CSS animation for each slide.
                          // When it finishes, the next slide is shown (auto slide).
                          key={index}
                          className="absolute inset-0 origin-left rounded-full bg-white"
                          style={
                            reduceMotion
                              ? undefined
                              : {
                                  animationName: "hero-progress",
                                  animationDuration: `${AUTOPLAY_MS}ms`,
                                  animationTimingFunction: "linear",
                                  animationFillMode: "forwards",
                                  animationPlayState: paused
                                    ? "paused"
                                    : "running",
                                }
                          }
                          onAnimationEnd={(event) => {
                            if (event.target === event.currentTarget) {
                              paginate(1);
                            }
                          }}
                        />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Counter + buttons */}
            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <span className="hidden text-xs font-semibold tabular-nums text-white/75 sm:inline">
                {String(index + 1).padStart(2, "0")}
                <span className="mx-1.5 text-white/35">/</span>
                {String(total).padStart(2, "0")}
              </span>

              <button
                type="button"
                onClick={() => setUserPaused((current) => !current)}
                aria-label={
                  userPaused
                    ? "Play automatic slides"
                    : "Pause automatic slides"
                }
                aria-pressed={userPaused}
                className={controlButton}
              >
                {userPaused ? (
                  <Play className="size-4" />
                ) : (
                  <Pause className="size-4" />
                )}
              </button>

              <button
                type="button"
                onClick={() => paginate(-1)}
                aria-label="Previous slide"
                className={controlButton}
              >
                <ChevronLeft className="size-4" />
              </button>

              <button
                type="button"
                onClick={() => paginate(1)}
                aria-label="Next slide"
                className={controlButton}
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </motion.section>
      </div>
    </section>
  );
}
