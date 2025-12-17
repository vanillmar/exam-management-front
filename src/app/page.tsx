"using client";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { getRedirectPath } from "./lib/utils";

export default async function Page() {
  const session = await getServerSession();

  if (session) {
    const roles: string[] = session.user?.roles;
    redirect(getRedirectPath(roles));
  } else {
    redirect("/login");
  }
  return null; // Or a loading state
}
