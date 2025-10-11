// components/Header.js
import { HiSearch } from "react-icons/hi";
import { Avatar, TextInput } from "flowbite-react";

export default function Header() {
  return (
    <div className="header flex justify-between items-center p-5 h-[var(--header-height)] bg-black shadow-md rounded-md mb-5">
      <div className="max-w-md">
        <TextInput
          id="email4"
          icon={HiSearch}
          placeholder="Search..."
          className="outline-none"
        />
      </div>
      <div className="user-info flex items-center">
        <Avatar
          img="https://ui-avatars.com/api/?name=Admin+User&background=3498db&color=fff"
          alt="User"
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <h4 className="font-semibold">Admin User</h4>
          <p className="text-sm text-gray-600">Administrator</p>
        </div>
      </div>
    </div>
  );
}
