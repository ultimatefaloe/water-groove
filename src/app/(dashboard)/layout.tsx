import DashboardShell from './dashboard/_components/DashboardShell';
import { requireUser } from '@/lib/auth/guards';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireUser();
  return <DashboardShell>{children}</DashboardShell>;
}
