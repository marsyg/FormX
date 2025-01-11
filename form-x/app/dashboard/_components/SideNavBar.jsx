import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  ChartLine,
  ShieldCheck,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
// Menu items.
const items = [
  {
    title: "MyForms",
    url: "dashboard",
    icon: Home,
  },
  {
    title: "Analytics",
    url: "analytics",
    icon: ChartLine,
  },
  {
    title: "Templates",
    url: "template",
    icon: Calendar,
  },
  {
    title: "Upgrade",
    url: "upgrade",
    icon: ShieldCheck,
  },
];

export default function SideNavBar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="m-3 mt-4 font-bold text-4xl">
            FormX AI
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
