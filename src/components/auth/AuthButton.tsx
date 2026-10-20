"use client";

import { LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "@/app/(public)/(auth)/_Action/AuthAction";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AuthButton({
  isLoggedIn,
  stacked = false,
  onNavigate,
}: {
  isLoggedIn: boolean;
  /** Full-width vertical layout (used inside the mobile menu) */
  stacked?: boolean;
  onNavigate?: () => void;
}) {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    onNavigate?.();
    router.replace("/login");
    router.refresh();
  };

  const size = cn("h-9 px-4 text-sm font-medium", stacked && "h-10 w-full");

  if (!isLoggedIn) {
    return (
      <div
        className={cn(
          "flex items-center gap-2",
          stacked && "flex-col-reverse gap-2",
        )}
      >
        <Button
          variant={stacked ? "outline" : "ghost"}
          render={
            <Link href="/login" onClick={onNavigate}>
              Login
            </Link>
          }
          nativeButton={false}
          className={size}
        />
        <Button
          render={
            <Link href="/register" onClick={onNavigate}>
              Register
            </Link>
          }
          nativeButton={false}
          className={cn(size, "shadow-sm")}
        />
      </div>
    );
  }

  return (
    <Button
      onClick={handleLogout}
      variant="outline"
      className={cn(
        size,
        "gap-2 hover:border-destructive/40 hover:bg-destructive/10 hover:text-destructive",
      )}
    >
      <LogOut className="size-4" />
      Logout
    </Button>
  );
}
