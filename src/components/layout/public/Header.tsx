import { HeartHandshake } from "lucide-react";
import Link from "next/link";
import { getMe } from "@/app/(dashboard)/_Action/getme";
import AuthButton from "@/components/auth/AuthButton";
import NavLinks from "./NavLinks";

const dashboardRoute = {
  ADMIN: "/admin",
  CITIZEN: "/citizen",
  VOLUNTEER: "/volunteer",
} as const;

export default async function Header() {
  const user = await getMe();
  const role = user?.role as keyof typeof dashboardRoute | undefined;

  const routes = [
    { name: "Home", url: "/" },
    { name: "About us", url: "/about-us" },
    ...(role ? [{ name: "Dashboard", url: dashboardRoute[role] }] : []),
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <HeartHandshake className="size-5" />
          </span>
          <span className="text-lg font-semibold tracking-tight">Civix</span>
        </Link>

        <NavLinks items={routes} />

        <div className="flex items-center gap-2">
          <AuthButton isLoggedIn={!!role} />
        </div>
      </div>
    </header>
  );
}
