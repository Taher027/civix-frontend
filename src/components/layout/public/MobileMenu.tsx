"use client";

import { HeartHandshake, Menu } from "lucide-react";
import { Suspense, useState } from "react";
import AuthButton from "@/components/auth/AuthButton";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import NavLinks from "./NavLinks";
import SearchForm from "./SearchForm";

type NavItem = { name: string; url: string };

export default function MobileMenu({
  items,
  isLoggedIn,
}: {
  items: NavItem[];
  isLoggedIn: boolean;
}) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="inline-flex size-9 items-center justify-center rounded-md border bg-background text-foreground shadow-xs transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50">
        <Menu className="size-5" />
        <span className="sr-only">Open menu</span>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="flex w-[85%] max-w-sm flex-col gap-0 p-0"
      >
        {/* Header */}
        <div className="border-b px-5 py-4">
          <SheetTitle className="flex items-center gap-2.5 text-base font-bold tracking-tight">
            <span className="flex size-8 items-center justify-center rounded-lg bg-linear-to-br from-primary to-chart-2 text-primary-foreground">
              <HeartHandshake className="size-4" />
            </span>
            Civix
          </SheetTitle>
        </div>

        {/* Body */}
        <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5">
          <Suspense fallback={null}>
            <SearchForm onSubmitted={close} />
          </Suspense>

          <NavLinks items={items} variant="mobile" onNavigate={close} />
        </div>

        {/* Footer: auth buttons */}
        <div className="border-t px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <AuthButton isLoggedIn={isLoggedIn} stacked onNavigate={close} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
