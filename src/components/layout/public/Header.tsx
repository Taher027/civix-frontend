import { HeartHandshake } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { getMe } from "@/app/(dashboard)/_Action/getme";
import AuthButton from "@/components/auth/AuthButton";
import MobileMenu from "./MobileMenu";
import NavLinks from "./NavLinks";
import SearchForm from "./SearchForm";

const dashboardRoute = {
  ADMIN: "/admin",
  CITIZEN: "/citizen",
  VOLUNTEER: "/volunteer",
} as const;

export default async function Header() {
  const user = await getMe();
  const role = user?.role as keyof typeof dashboardRoute | undefined;
  const userRole = role?.toLowerCase();

  const routes = [
    { name: "Complaints", url: "/complaints" },
    { name: "About us", url: "/about-us" },
    // Logged-out users are sent to login instead of "/undefined/donate"
    { name: "Donate", url: userRole ? `/${userRole}/donate` : "/login" },
    ...(role ? [{ name: "Dashboard", url: dashboardRoute[role] }] : []),
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-3 px-4 md:px-6 lg:gap-6">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Civix home"
          className="flex shrink-0 items-center gap-2.5"
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-linear-to-br from-primary to-chart-2 text-primary-foreground shadow-sm ring-1 ring-primary/20">
            <HeartHandshake className="size-5" />
          </span>
          <span className="text-lg font-bold tracking-tight">Civix</span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden lg:block">
          <NavLinks items={routes} />
        </div>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          {/* Desktop search */}
          <div className="hidden w-52 lg:block xl:w-72">
            <Suspense fallback={null}>
              <SearchForm />
            </Suspense>
          </div>

          {/* Auth buttons (tablet + desktop). On phones they live in the menu */}
          <div className="hidden sm:block">
            <AuthButton isLoggedIn={!!role} />
          </div>

          {/* Mobile / tablet menu */}
          <div className="lg:hidden">
            <MobileMenu items={routes} isLoggedIn={!!role} />
          </div>
        </div>
      </div>
    </header>
  );
}
