import { getServerSession } from "next-auth/next";
import { authOptions } from "@/api/auth/[...nextauth]/route"; // Adjust path as needed
import { redirect } from "next/navigation";
import RegisterCard from "@/components/RegisterCard";
import { getRedirectPath } from "@/lib/utils";

export default async function RegisterPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    // If the user is already authenticated, redirect them to the home page or dashboard
    const roles: string[] = session.user?.roles;
    redirect(getRedirectPath(roles));
  }

  return (
    <div>
      <RegisterCard />
    </div>
  );
}
