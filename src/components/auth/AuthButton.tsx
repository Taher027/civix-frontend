"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "@/app/(public)/(auth)/_Action/AuthAction";
import { Button } from "@/components/ui/button";

export default function AuthButton({ isLoggedIn }: { isLoggedIn: boolean }) {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
    router.refresh();
  };

  if (!isLoggedIn) {
    return (
      <div className="flex  gap-4 justify-between items-center">
        <Button
          variant="outline"
          render={<Link href="/login">Login</Link>}
          nativeButton={false}
          className="text-lg font-medium"
        />
        <Button
          variant="outline"
          render={<Link href="/register">Register</Link>}
          nativeButton={false}
          className="text-lg font-medium"
        />
      </div>
    );
  }

  return (
    <Button
      onClick={handleLogout}
      variant="destructive"
      className="text-lg font-medium"
    >
      Logout
    </Button>
  );
}
