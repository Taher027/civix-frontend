"use client";
import { MapPin } from "lucide-react";
import Link from "next/link";

export default function HeroBanner({ userRole }: { userRole?: string }) {
  return (
    <section className="relative overflow-hidden border-b bg-linear-to-br from-primary/10 via-background to-background">
      <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 size-72 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <MapPin className="size-3.5 text-primary" />
            Community-driven problem solving
          </span>

          <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Your neighborhood&apos;s problems,{" "}
            <span className="text-primary">our responsibility</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            Report roads, drains, power outages or any civic issue. The
            community upvotes what matters, volunteers step in to fix it, and
            you can follow the progress until it&apos;s resolved.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={userRole ? `/${userRole}/post-complaint` : "/login"}
              className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-opacity hover:opacity-90"
            >
              Report a problem
            </Link>
            <Link
              href="/complaints"
              className="inline-flex h-11 items-center justify-center rounded-md border bg-background px-6 text-sm font-medium transition-colors hover:bg-muted"
            >
              Browse complaints
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
