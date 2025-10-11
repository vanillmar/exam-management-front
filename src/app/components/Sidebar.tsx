// components/Sidebar.js
import {
  Sidebar as FlowbiteSidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
  SidebarLogo,
} from "flowbite-react";
import {
  HiChartPie,
  HiHome,
  HiLogout,
  HiSupport,
  HiUsers,
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
            icon={HiUsers}
            active={activeMenu === "personnel"}
            onClick={() => onMenuClick("personnel")}
          >
            Personnel Management
          </SidebarItem>
          <SidebarItem href="#" icon={HiUsers}>
            Company Management
          </SidebarItem>
          <SidebarItem href="#" icon={HiUsers}>
            Exams & Certifications
          </SidebarItem>
          <SidebarItem href="#" icon={HiUsers}>
            Subject Management
          </SidebarItem>
          <SidebarItem href="#" icon={HiUsers}>
            Reports
          </SidebarItem>
          <SidebarItem href="#" icon={HiUsers}>
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
