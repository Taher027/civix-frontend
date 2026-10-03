import type { ReactNode } from "react";
import RoleGuard from "@/components/auth/RoleGuard";
import DashboardShell from "@/components/dashboard/dashboard-shell";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <RoleGuard allowedRoles={["VOLUNTEER"]}>
      <DashboardShell auth="VOLUNTEER">{children}</DashboardShell>
    </RoleGuard>
  );
}
