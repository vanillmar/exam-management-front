// components/Sidebar.js
import {
  Sidebar as FlowbiteSidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
  SidebarLogo,
} from "flowbite-react";
import { FaGraduationCap, FaBook, FaChartBar } from "react-icons/fa";
import { HiQuestionMarkCircle } from "react-icons/hi";

import { IoSettingsSharp } from "react-icons/io5";

import {
  HiChartPie,
  HiOutlineUserGroup,
  HiOfficeBuilding,
  HiHome,
  HiLogout,
  HiSupport,
  HiViewBoards,
} from "react-icons/hi";

export default function Sidebar({ activeMenu, onMenuClick }) {
  return (
    <FlowbiteSidebar className="bg-primary text-white h-screen transition-all z-50 overflow-y-auto">
      <SidebarLogo
        href="#"
        img="/logo.png"
        imgAlt="Fedgtech logo"
        className="logo p-5 text-center border-b border-white/10"
      >
        Fedgetech
      </SidebarLogo>

      <SidebarItems>
        <SidebarItemGroup>
          <SidebarItem
            href="#"
            icon={HiHome}
            active={activeMenu === "dashboard"}
            onClick={() => onMenuClick("dashboard")}
          >
            Dashboard
          </SidebarItem>
          <SidebarItem
            href="#"
            icon={HiOutlineUserGroup}
            active={activeMenu === "personnel"}
            onClick={() => onMenuClick("personnel")}
          >
            Personnel Management
          </SidebarItem>
          <SidebarItem
            href="#"
            icon={HiOfficeBuilding}
            active={activeMenu === "company"}
            onClick={() => onMenuClick("company")}
          >
            Company Management
          </SidebarItem>
          <SidebarItem
            href="#"
            icon={FaBook}
            active={activeMenu === "subjects"}
            onClick={() => onMenuClick("subjects")}
          >
            Subject Management
          </SidebarItem>
          <SidebarItem
            href="#"
            icon={FaGraduationCap}
            active={activeMenu === "exams"}
            onClick={() => onMenuClick("exams")}
          >
            Exams & Certifications
          </SidebarItem>
                    <SidebarItem
            href="#"
            icon={HiQuestionMarkCircle}
            active={activeMenu === "questions"}
            onClick={() => onMenuClick("questions")}
          >
            Questions Management
          </SidebarItem>
          <SidebarItem
            href="#"
            icon={FaChartBar}
            active={activeMenu === "reports"}
            onClick={() => onMenuClick("reports")}
          >
            Reports
          </SidebarItem>
          <SidebarItem
            href="#"
            icon={IoSettingsSharp}
            active={activeMenu === "settings"}
            onClick={() => onMenuClick("settings")}
          >
            Settings
          </SidebarItem>
          <SidebarItem icon={HiLogout}>Logout</SidebarItem>
        </SidebarItemGroup>
        <SidebarItemGroup>
          <SidebarItem href="#" icon={HiChartPie}>
            Upgrade to Pro
          </SidebarItem>
          <SidebarItem href="#" icon={HiViewBoards}>
            Documentation
          </SidebarItem>
          <SidebarItem href="#" icon={HiSupport}>
            Help
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </FlowbiteSidebar>
  );
}
