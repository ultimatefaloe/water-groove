import { redirect } from "next/navigation";
import { createUserFromAuth0 } from "@/lib/server/createUserFromAuth0";
import AdminDashboardShell from "./_components/AdminDashboardShell";
import { auth0 } from "@/lib/server/auth0";
import { getServerAdmin } from "@/lib/server/auth0-server";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getServerAdmin();

  // 🔒 Block unauthenticated users
  if (!admin) {
    redirect("/auth/login");
  }

  // 👤 Ensure user exists in DB
  // await createUserFromAuth0(session.user);

  return <AdminDashboardShell admin={admin}>{children}</AdminDashboardShell>;
}
