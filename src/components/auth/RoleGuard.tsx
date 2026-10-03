import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { getMe } from "@/app/(dashboard)/_Action/getme";
import type { userRole } from "@/types/auth.type";

export const dashboardRoute: Record<userRole, string> = {
  ADMIN: "/admin",
  CITIZEN: "/citizen",
  VOLUNTEER: "/volunteer",
};
export default async function RoleGuard({
  children,
  allowedRoles,
}: {
  children: ReactNode;
  allowedRoles?: userRole[];
}) {
  const user = await getMe();
  if (!user) {
    redirect("/login");
  }
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    redirect(dashboardRoute[user.role as userRole] ?? "/");
  }

  return <>{children}</>;
}
