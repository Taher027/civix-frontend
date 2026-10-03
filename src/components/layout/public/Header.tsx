import Link from "next/link";
import { getMe } from "@/app/(dashboard)/_Action/getme";
import AuthButton from "@/components/auth/AuthButton";

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
  ];

  return (
    <header className="w-full h-16 border border-b">
      <div className="flex justify-between items-center h-full max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <h2>logo here</h2>
        </div>

        <nav className="flex gap-5">
          {routes.map((route) => (
            <Link
              key={route.url}
              href={route.url}
              className="font-medium text-lg"
            >
              {route.name}
            </Link>
          ))}

          {role && (
            <Link href={dashboardRoute[role]} className="font-medium text-lg">
              Dashboard
            </Link>
          )}
        </nav>
        <div>
          <AuthButton isLoggedIn={!!role} />
        </div>
      </div>
    </header>
  );
}
