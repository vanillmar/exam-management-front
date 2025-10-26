import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route"; // Adjust path as needed
import { redirect } from "next/navigation";

export async function requireRole(
  allowedRoles: string[],
  redirectTo = "/unauthorized",
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const userRoles = session.user?.roles || [];

  const hasAccess = userRoles.some((role) => {
    return allowedRoles.includes(role);
  });
  if (!hasAccess) {
    redirect(redirectTo);
  }

  return session;
}

export async function requirePermission(
  required: string[],
  redirectTo = "/unauthorized",
) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const userPermissions = session.user?.roles || [];
  const hasAccess = required.every((p) => userPermissions.includes(p));

  if (!hasAccess) redirect(redirectTo);
  return session;
}
