import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { getMe } from "@/app/(dashboard)/_Action/getme";
export type Role = "ADMIN" | "CITIZEN" | "VOLUNTEER";
export const dashboardRoute: Record<Role, string> = {
  ADMIN: "/admin",
  CITIZEN: "/citizen",
  VOLUNTEER: "/volunteer",
};
export default async function RoleGuard({
  children,
  allowedRoles,
}: {
  children: ReactNode;
  allowedRoles?: Role[];
}) {
  const user = await getMe();
  if (!user) {
    redirect("/login");
  }
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    redirect(dashboardRoute[user.role as Role] ?? "/");
  }

  return <>{children}</>;
}
