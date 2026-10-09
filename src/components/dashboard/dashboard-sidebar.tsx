"use client";
import { HeartHandshake } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { adminRoutes } from "@/routes/admin.route";
import { citizenRoutes } from "@/routes/citizen.route";
import { volunteerRoutes } from "@/routes/volunteer.route";
import type { userRole } from "@/types/auth.type";
import type { SidebarItems } from "@/types/sidebar.type";

const sidebarRoutes: Partial<Record<userRole, SidebarItems>> = {
  CITIZEN: citizenRoutes,
  ADMIN: adminRoutes,
  VOLUNTEER: volunteerRoutes,
};

const ROLE_LABEL: Partial<Record<userRole, string>> = {
  CITIZEN: "Citizen",
  ADMIN: "Administrator",
  VOLUNTEER: "Volunteer",
};

export function DashboardSidebar({ role }: { role: userRole }) {
  const pathname = usePathname();
  const routes: SidebarItems = sidebarRoutes[role] || [];

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <HeartHandshake className="size-5" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-base font-semibold tracking-tight">
              Civix
            </span>
            <span className="text-xs text-muted-foreground">
              {ROLE_LABEL[role] ?? "Dashboard"} panel
            </span>
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="gap-1 px-2 py-3">
        {routes?.map((group) => (
          <SidebarGroup key={group.title} className="py-2">
            <SidebarGroupLabel className="mb-1 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-0.5">
                {group.items.map((item) => {
                  const active = pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        render={<Link href={item.url} />}
                        isActive={active}
                        className={cn(
                          "relative h-9 rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors",
                          "hover:bg-accent hover:text-foreground",
                          active &&
                            "bg-primary/10 font-semibold text-primary hover:bg-primary/10 hover:text-primary",
                        )}
                      >
                        {active && (
                          <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-primary" />
                        )}
                        <span className="truncate">{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
