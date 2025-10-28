import { getServerSession } from "next-auth/next";
import { authOptions } from "@/api/auth/[...nextauth]/route"; // Adjust path as needed

import ProfilePictureUploader from "@/components/profile/profile-picture-uploader";
import { requireRole } from "@/lib/guards";
import { Roles } from "@/types/role";


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
  const userId = session?.user.id ?? "";
  const currentImage = session?.user?.avatar
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${session.user.avatar}`
    : "/default-avatar.png";
  console.log(currentImage);
  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      <ProfilePictureUploader userId={userId} currentImage={currentImage} />
    </div>
  );
}
