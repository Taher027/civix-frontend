"use client";
import type { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import type { userRole } from "@/types/auth.type";
import { DashboardSidebar } from "./dashboard-sidebar";

export default function DashboardShell({
  children,
  auth,
}: {
  children: ReactNode;
  auth: userRole;
}) {
  return (
    <SidebarProvider>
      <DashboardSidebar role={auth} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
