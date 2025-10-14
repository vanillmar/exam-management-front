export function getRedirectPathByRole(roleName: string): string {
  const map: Record<string, string> = {
    ADMIN: "/admin/dashboard",
    TEACHER: "/teacher",
    STUDENT: "/dashboard",
    USER: "/home",
  };
  return map[roleName] || "/home";
}
