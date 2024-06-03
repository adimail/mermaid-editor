"use server";

import { WideNavBar } from "@/components/ui/nav-bar";
import { getServerAuthSession } from "@/server/auth";

export async function NavBar() {
  const session = await getServerAuthSession();

  return <WideNavBar session={session} />;
}
