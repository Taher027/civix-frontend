import type { ReactNode } from "react";
import RoleGuard from "@/components/auth/RoleGuard";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <RoleGuard allowedRoles={["VOLUNTEER"]}> {children}</RoleGuard>;
}
