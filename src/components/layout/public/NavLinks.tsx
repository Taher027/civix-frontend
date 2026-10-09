"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type NavItem = { name: string; url: string };

export default function NavLinks({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1">
      {items.map((item) => {
        const active =
          item.url === "/"
            ? pathname === "/"
            : pathname === item.url || pathname.startsWith(`${item.url}/`);

        return (
          <Link
            key={item.url}
            href={item.url}
            className={cn(
              "rounded-md px-4 py-2 text-base font-medium transition-colors",
              "text-foreground/80 hover:bg-accent hover:text-foreground",
              active && "bg-primary/10 font-semibold text-primary",
            )}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
