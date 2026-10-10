import { getMe } from "@/app/(dashboard)/_Action/getme";
import { MapPin } from "lucide-react";
import Link from "next/link";

const explore = [
  { label: "Home", href: "/" },
  { label: "Browse complaints", href: "/complaints" },
];

const getStarted = [
  { label: "Log in", href: "/login" },
  { label: "Sign up", href: "/register" },
];

export default async function Footer() {
  const year = new Date().getFullYear();
  const me = await getMe();
  const userRole = me?.role?.toLowerCase();

  return (
    <footer className="border-t bg-muted/40">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <MapPin className="size-5" />
              </span>
              <span className="text-lg font-bold tracking-tight">
                Complaint Solutions
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              A community-driven platform where citizens report civic issues,
              volunteers step in to fix them, and everyone can follow the
              progress.
            </p>
          </div>

          {/* Explore */}
          <nav aria-label="Explore">
            <h3 className="text-sm font-semibold">Explore</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {explore.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Get started */}
          <nav aria-label="Get started">
            <h3 className="text-sm font-semibold">Get started</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {getStarted.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA */}
          <div>
            <h3 className="text-sm font-semibold">See a problem?</h3>
            <p className="mt-4 text-sm text-muted-foreground">
              Report it today and let the community take it from there.
            </p>
            <Link
              href={userRole ? `/${userRole}/post-complaint` : "/login"}
              className="mt-4 inline-flex h-10 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Report a problem
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {year} Complaint Solutions. All rights reserved.</p>
          <p>Built for real, visible change.</p>
        </div>
      </div>
    </footer>
  );
}
