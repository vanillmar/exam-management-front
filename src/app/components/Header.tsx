// components/Header.js
import { useSession } from "next-auth/react";
import { HiSearch } from "react-icons/hi";
import { TextInput } from "flowbite-react";
import AvatarDropdown from "./AvatarDropdown";
import { useRouter } from "next/navigation";
import LoadingScreen from "./LoadingScreen";
import { useEffect } from "react";
export default function Header() {
  const { signOut, data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") return <LoadingScreen />;
  if (!session) return null;
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
      <AvatarDropdown
        username={session.user?.name ?? ""}
        email={session.user?.email ?? ""}
        image={session.user?.image ?? ""}
        Logout={signOut}
      />
    </div>
  );
}
