"use client";
// components/Sidebar.js
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { HiSupport, HiViewBoards } from "react-icons/hi";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  FileQuestion,
  BarChart3,
  Proportions,
  Settings,
  User2,
  ChevronUp,
  CircleQuestionMarkIcon
} from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavUser } from "./Nav-User";
// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Students",
    url: "/admin/students",
    icon: Users,
  },
  {
    title: "Instructors",
    url: "/admin/instructors",
    icon: GraduationCap,
  },
  {
    title: "Courses",
    url: "/admin/courses",
    icon: FileQuestion,
  },
  {
    title: "Exams",
    url: "/admin/exams",
    icon: FileQuestion,
  },
  {
    title: "Results",
    url: "/admin/results",
    icon: BarChart3,
  },
  {
    title: "Questions",
    url: "/admin/questions",
    icon: CircleQuestionMarkIcon
  },
  {
    title: "Reports",
    url: "/admin/reports",
    icon: Proportions,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
];

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <Image
          width={10}
          height={10}
          src={"/logo.png"}
          alt={"Fedgtech logo"}
          className="logo p-5 text-center border-b border-white/10"
        />
        Fedgetech
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
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
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/admin/docs">
                  <HiViewBoards />
                  Documentation
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/admin/support">
                  <HiSupport />
                  Help
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
