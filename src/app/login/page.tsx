import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/api/auth/[...nextauth]/route"; // Adjust path as needed
import { getRedirectPath } from "@/lib/utils";
import LoginCard from "@/components/LoginCard";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    // If the user is already authenticated, redirect them to the home page or dashboard
    const roles: string[] = session.user?.roles;
    redirect(getRedirectPath(roles));
  }

  return <LoginCard />;
}
