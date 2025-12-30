import { email } from "zod";
import DashboardShell from "./dashboard/_components/DashboardShell";
import { requireUser } from "@/lib/auth/guards";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const { user } = await requireUser();
  const user = {
    fullName: 'Tunmise',
    email: "ultimatefaloe@g.com",
    picture: ".."
  }
  return <DashboardShell authUser={user}>{children}</DashboardShell>;
}
