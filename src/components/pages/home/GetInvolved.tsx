import { Check, HandHeart, Megaphone } from "lucide-react";
import Link from "next/link";

const roles = [
  {
    icon: Megaphone,
    badge: "For citizens",
    title: "Report a problem",
    text: "See something broken in your area? Let everyone know and track it until it is fixed.",
    points: [
      "Post issues with photos and location",
      "Get support through community upvotes",
      "Follow progress from pending to resolved",
    ],
    cta: "Sign up as a citizen",
    href: "/register",
    featured: false,
  },
  {
    icon: HandHeart,
    badge: "For volunteers",
    title: "Help fix problems",
    text: "Want to make a visible difference? Pick a problem near you and take it on.",
    points: [
      "Browse pending complaints",
      "Apply to the ones you can help with",
      "Upload resolved photos as proof",
    ],
    cta: "Join as a volunteer",
    href: "/register",
    featured: true,
  },
];

export default function GetInvolved({
  isLoggedIn = false,
}: {
  isLoggedIn?: boolean;
}) {
  if (isLoggedIn) return null;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 md:px-6 md:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          Get involved
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
          There is a role for everyone
        </h2>
        <p className="mt-3 text-muted-foreground">
          Whether you spot problems or love solving them, you can be part of the
          change.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
        {roles.map(
          ({ icon: Icon, badge, title, text, points, cta, href, featured }) => (
            <div
              key={title}
              className={
                featured
                  ? "flex flex-col rounded-2xl bg-primary p-8 text-primary-foreground shadow-lg"
                  : "flex flex-col rounded-2xl border bg-card p-8"
              }
            >
              <div className="flex items-center justify-between">
                <span
                  className={
                    featured
                      ? "flex size-12 items-center justify-center rounded-xl bg-primary-foreground/15"
                      : "flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary"
                  }
                >
                  <Icon className="size-6" />
                </span>
                <span
                  className={
                    featured
                      ? "rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-medium"
                      : "rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                  }
                >
                  {badge}
                </span>
              </div>

              <h3 className="mt-6 text-2xl font-bold">{title}</h3>
              <p
                className={
                  featured
                    ? "mt-2 text-sm text-primary-foreground/80"
                    : "mt-2 text-sm text-muted-foreground"
                }
              >
                {text}
              </p>

              <ul className="mt-6 space-y-3 text-sm">
                {points.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={href}
                className={
                  featured
                    ? "mt-8 inline-flex h-11 items-center justify-center rounded-md bg-background px-6 text-sm font-medium text-foreground transition-opacity hover:opacity-90"
                    : "mt-8 inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                }
              >
                {cta}
              </Link>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
