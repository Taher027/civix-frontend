import { HeartHandshake, Menu } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { getMe } from "@/app/(dashboard)/_Action/getme";
import AuthButton from "@/components/auth/AuthButton";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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

  const routes = [
    { name: "Complaints", url: "/complaints" },
    { name: "About us", url: "/about-us" },
    ...(role ? [{ name: "Dashboard", url: dashboardRoute[role] }] : []),
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 z-50">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <HeartHandshake className="size-5" />
          </span>
          <span className="text-lg font-semibold tracking-tight">Civix</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <NavLinks items={routes} />
        </div>

        {/* Desktop Search */}
        <div className="hidden flex-1 justify-center md:flex">
          <Suspense fallback={null}>
            <SearchForm />
          </Suspense>
        </div>

        {/* Right Side Action Buttons */}
        <div className="flex items-center gap-2">
          <AuthButton isLoggedIn={!!role} />

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground size-9">
                <Menu className="size-5" />
                <span className="sr-only">Toggle Menu</span>
              </SheetTrigger>

              <SheetContent side="right" className="w-full max-w-75 p-6 pt-14">
                <div className="mb-8 px-1">
                  <Suspense fallback={null}>
                    <SearchForm />
                  </Suspense>
                </div>

                <nav className="flex flex-col gap-2 px-1">
                  {routes.map((route) => (
                    <Link
                      key={route.url}
                      href={route.url}
                      className="text-sm font-medium tracking-wide text-muted-foreground transition-colors hover:text-primary py-3 px-2 rounded-md hover:bg-accent/50"
                    >
                      {route.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
