import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
} from "flowbite-react";
import { signOut } from "next-auth/react";

export default function AvatarDropdown({ username, email, image }) {
  return (
    <Dropdown
      label={<Avatar alt="User settings" img={image} rounded />}
      arrowIcon={false}
      inline
    >
      <DropdownHeader>
        <span className="block text-sm">{username}</span>
        <span className="block truncate text-sm font-medium">{email}</span>
      </DropdownHeader>
      <DropdownItem>Dashboard</DropdownItem>
      <DropdownItem>Settings</DropdownItem>
      <DropdownItem>Earnings</DropdownItem>
      <DropdownDivider />
      <DropdownItem onClick={() => signOut({ callbackUrl: "/login" })}>
        Logout
      </DropdownItem>
    </Dropdown>
  );
}
