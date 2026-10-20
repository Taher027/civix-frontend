"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type NavItem = { name: string; url: string };

export default function NavLinks({
  items,
  variant = "desktop",
  onNavigate,
}: {
  items: NavItem[];
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const mobile = variant === "mobile";

  return (
    <nav
      aria-label="Main"
      className={cn(mobile ? "flex flex-col gap-1" : "flex items-center gap-1")}
    >
      {items.map((item) => {
        const active =
          item.url === "/"
            ? pathname === "/"
            : pathname === item.url || pathname.startsWith(`${item.url}/`);

        return (
          <Link
            key={item.name}
            href={item.url}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "text-sm font-medium transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
              mobile
                ? "flex items-center justify-between rounded-lg px-3 py-3 text-base"
                : "rounded-md px-3 py-2",
              active
                ? "bg-primary/10 font-semibold text-primary"
                : "text-muted-foreground hover:bg-accent hover:text-foreground",
            )}
          >
            {item.name}
            {mobile && (
              <ChevronRight
                className={cn(
                  "size-4",
                  active ? "text-primary" : "text-muted-foreground/60",
                )}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
