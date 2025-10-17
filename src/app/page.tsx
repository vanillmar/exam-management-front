"using client";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession();

  if (session) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }
  return null; // Or a loading state
}
