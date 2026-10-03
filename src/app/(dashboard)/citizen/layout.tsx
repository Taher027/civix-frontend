import type { ReactNode } from "react";
import RoleGuard from "@/components/auth/RoleGuard";
import DashboardShell from "@/components/dashboard/dashboard-shell";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <RoleGuard allowedRoles={["CITIZEN"]}>
      <DashboardShell auth="CITIZEN">{children}</DashboardShell>
    </RoleGuard>
  );
}
