import { redirect } from "next/navigation";
import { createUserFromAuth0 } from "@/lib/server/createUserFromAuth0";
import AdminDashboardShell from "./_components/AdminDashboardShell";
import { auth0 } from "@/lib/server/auth0";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth0.getSession();

  // 🔒 Block unauthenticated users
  if (!session?.user) {
    redirect("/auth/login");
  }

  // 👤 Ensure user exists in DB
  await createUserFromAuth0(session.user);

  return <AdminDashboardShell>{children}</AdminDashboardShell>;
}
