"use client";

import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Droplets,
  Lightbulb,
  type LucideIcon,
  Route,
  Shapes,
  Trash2,
  TreePine,
  Zap,
} from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import Link from "next/link";

export type Category = {
  id?: string;
  _id?: string;
  title: string;
};

type Tone = { icon: string; glow: string };

const tones = {
  blue: {
    icon: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    glow: "bg-blue-500/25",
  },
  cyan: {
    icon: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
    glow: "bg-cyan-500/25",
  },
  amber: {
    icon: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    glow: "bg-amber-500/25",
  },
  emerald: {
    icon: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    glow: "bg-emerald-500/25",
  },
  yellow: {
    icon: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
    glow: "bg-yellow-500/25",
  },
  teal: {
    icon: "bg-teal-500/10 text-teal-600 dark:text-teal-400",
    glow: "bg-teal-500/25",
  },
  violet: {
    icon: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    glow: "bg-violet-500/25",
  },
  slate: {
    icon: "bg-slate-500/10 text-slate-600 dark:text-slate-400",
    glow: "bg-slate-500/25",
  },
} satisfies Record<string, Tone>;

const rules: {
  keywords: string[];
  icon: LucideIcon;
  tone: Tone;
}[] = [
  {
    keywords: ["road", "street", "traffic", "bridge"],
    icon: Route,
    tone: tones.blue,
  },
  {
    keywords: ["drain", "water", "sewer", "flood"],
    icon: Droplets,
    tone: tones.cyan,
  },
  {
    keywords: ["electric", "power", "gas"],
    icon: Zap,
    tone: tones.amber,
  },
  {
    keywords: ["waste", "garbage", "trash", "sanitation"],
    icon: Trash2,
    tone: tones.emerald,
  },
  { keywords: ["light"], icon: Lightbulb, tone: tones.yellow },
  {
    keywords: ["park", "tree", "environment", "garden"],
    icon: TreePine,
    tone: tones.teal,
  },
  {
    keywords: ["building", "construction", "housing"],
    icon: Building2,
    tone: tones.violet,
  },
];

function getStyle(title?: string): { icon: LucideIcon; tone: Tone } {
  const t = (title ?? "").toLowerCase();
  const match = rules.find((r) => r.keywords.some((k) => t.includes(k)));
  return match ?? { icon: Shapes, tone: tones.slate };
}

const ease = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

export default function Categories({ categories }: { categories: Category[] }) {
  const reduceMotion = useReducedMotion();

  if (categories.length === 0) return null;

  return (
    <section className="relative isolate overflow-hidden border-y bg-muted/30">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-0 -z-10 size-80 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-6 md:py-24">
        {/* Heading */}
        <motion.div
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease }}
        >
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full border bg-background px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary shadow-sm">
              Categories
            </span>
            <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              Browse issues by{" "}
              <span className="bg-linear-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                type
              </span>
            </h2>
            <p className="mt-3 max-w-xl text-pretty text-base text-muted-foreground md:text-lg">
              Find problems in your area faster and follow how each category is
              being resolved.
            </p>
          </div>

          <Link
            href="/complaints"
            className="group inline-flex h-11 shrink-0 items-center justify-center gap-2 self-start rounded-lg border bg-background px-5 text-sm font-semibold shadow-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 md:self-auto"
          >
            View all complaints
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        {/* Grid */}
        <motion.ul
          className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:mt-14 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
          variants={container}
          initial={reduceMotion ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {categories.map((cat) => {
            const { icon: Icon, tone } = getStyle(cat.title);
            const id = cat.id ?? cat._id;
            const href = id
              ? `/complaints?categoryId=${encodeURIComponent(id)}`
              : "/complaints";

            return (
              <motion.li key={id ?? cat.title} variants={item}>
                <Link
                  href={href}
                  className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-foreground/15 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                >
                  {/* Hover glow */}
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute -right-8 -top-8 size-28 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100 ${tone.glow}`}
                  />

                  <ArrowUpRight className="absolute right-4 top-4 size-4 -translate-x-1 translate-y-1 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />

                  <span
                    className={`relative flex size-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 ${tone.icon}`}
                  >
                    <Icon className="size-6" />
                  </span>

                  <div className="relative">
                    <h3 className="text-sm font-semibold leading-snug tracking-tight sm:text-base">
                      {cat.title}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      View issues
                    </p>
                  </div>
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
