import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { getMe } from "@/app/(dashboard)/_Action/getme";

export default async function AuthGuard({ children }: { children: ReactNode }) {
  const user = await getMe();
  if (!user) {
    redirect("/login");
  }

  return <>{children}</>;
}
