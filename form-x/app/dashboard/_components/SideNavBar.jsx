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

// Menu items.
const items = [
  {
    title: "MyForms",
    url: "#",
    icon: Home,
  },
  {
    title: "Analytics",
    url: "#",
    icon: ChartLine,
  },
  {
    title: "Templates",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Upgrade",
    url: "#",
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
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
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
