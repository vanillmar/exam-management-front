// components/Sidebar.js
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
} from "@/components/ui/sidebar"

import { FaGraduationCap, FaBook, FaChartBar } from "react-icons/fa";
import { HiQuestionMarkCircle } from "react-icons/hi";

import { IoSettingsSharp } from "react-icons/io5";

import {
  HiChartPie,
  HiOfficeBuilding,
  HiHome,
  HiLogout,
  HiSupport,
  HiViewBoards,
} from "react-icons/hi";
import { Home } from "lucide-react";
import Image from "next/image";

export default function AppSidebar() {
  // Menu items.
const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: Home,
  },
  {
    title: "Company",
    url: "#",
    icon: HiOfficeBuilding,
  },
  {
    title: "Subjects",
    url: "#",
    icon: FaBook,
  },
  {
    title: "Exam & Certifications",
    url: "#",
    icon: FaGraduationCap,
  },
  {
    title: "Questions Management",
    url: "#",
    icon: HiQuestionMarkCircle,
  },
  {
    title: "Reports",
    url: "#",
    icon: FaChartBar,
  },
  {
    title: "Settings",
    url: "#",
    icon: IoSettingsSharp,
  },
  {
    title: "Logout",
    url: "#",
    icon: HiLogout,
  },
]
  return (
    <Sidebar className="bg-primary text-white h-screen transition-all z-50 overflow-y-auto">
      <SidebarHeader
      >
        <Image 
        width={10}
        height={10}
        src={"/logo.png"} 
        alt={"Fedgtech logo"} 
        className="logo p-5 text-center border-b border-white/10"/>
        Fedgetech
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            Application
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
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#">
                    <HiChartPie />
                    Upgrade to Pro
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem >
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#">
                <HiViewBoards /> 
                  Documentation
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem >
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#">
                  <HiSupport />
                  Help
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem >
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
