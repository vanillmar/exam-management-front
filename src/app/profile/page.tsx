
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/api/auth/[...nextauth]/route"; // Adjust path as needed
import { requireRole } from "@/lib/guards";
import { Roles } from "@/types/role";
import ProfileForm from "./ProfileForm";

export default async function ProfilePage() {
  await requireRole([
    Roles.ADMIN,
    Roles.INSPECTOR,
    Roles.INSTRUCTOR,
    Roles.PILOT,
    Roles.STUDENT,
    Roles.USER,
  ]);

  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const { id, username, email, avatar } = session.user;
  const currentImage = avatar
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${avatar}`
    : "/default-avatar.png";

  // Render a client component that will use SWR to fetch the fresh user
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {/* Pass minimal data from server to client: user id and current avatar URL */}
      {/* ProfileForm will handle fetching, populating and updating via SWR */}
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore Server -> Client prop */}
      <ProfileForm userId={id ?? ""} currentImage={currentImage} username={username ?? ""} email={email ?? ""} />
    </div>
  );
}
