"use client";

import { Camera, CheckCircle2, HandHeart, ThumbsUp } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";

const steps = [
  {
    icon: Camera,
    tag: "Citizen",
    title: "Report",
    text: "Add a photo, location and a short description of the problem.",
  },
  {
    icon: ThumbsUp,
    tag: "Community",
    title: "Upvote",
    text: "The community upvotes issues so the most important ones rise to the top.",
  },
  {
    icon: HandHeart,
    tag: "Volunteer",
    title: "Volunteer",
    text: "Volunteers apply to take on a problem and fix it on the ground.",
  },
  {
    icon: CheckCircle2,
    tag: "Everyone",
    title: "Resolved",
    text: "See before and after photos once the issue is marked resolved.",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export default function HowItWorks() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-background">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_1px_1px,var(--border)_1px,transparent_0)] bg-size-[28px_28px] opacity-60 mask-[radial-gradient(ellipse_70%_60%_at_50%_50%,#000_30%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-72 w-2xl -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-6 md:py-24">
        {/* Heading */}
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="inline-flex items-center rounded-full border bg-background/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary shadow-sm backdrop-blur">
            How it works
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            From problem to solution in{" "}
            <span className="bg-linear-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              four simple steps
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base text-muted-foreground md:text-lg">
            A clear, transparent process that connects citizens, the community
            and volunteers.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.ol
          className="relative mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4"
          variants={container}
          initial={reduceMotion ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Connector line (desktop) */}
          <motion.span
            aria-hidden="true"
            className="absolute left-[12.5%] right-[12.5%] top-7 hidden origin-left border-t-2 border-dashed border-primary/30 lg:block"
            variants={{
              hidden: { scaleX: 0 },
              show: { scaleX: 1, transition: { duration: 1.2, ease } },
            }}
          />

          {steps.map(({ icon: Icon, tag, title, text }, i) => (
            <motion.li
              key={title}
              variants={item}
              className="group relative flex flex-col items-center text-center"
            >
              {/* Icon */}
              <div className="relative z-10 flex size-14 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-chart-2 text-primary-foreground shadow-lg shadow-primary/25 ring-8 ring-background transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-110">
                <Icon className="size-6" />
                <span className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full bg-background text-xs font-bold text-primary shadow-sm ring-1 ring-border">
                  {i + 1}
                </span>
              </div>

              {/* Card */}
              <div className="-mt-7 h-full w-full rounded-2xl border bg-card px-6 pb-7 pt-12 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/30 group-hover:shadow-xl group-hover:shadow-primary/5">
                <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-primary">
                  {tag}
                </span>
                <h3 className="mt-3 text-lg font-semibold tracking-tight">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {text}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
