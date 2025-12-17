import { Suspense } from "react";
import { DashboardSkeleton } from "../_components/dashboard/DashboardSkeleton";
import DashboardClient from "../_components/dashboard/DashboardClient";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Dashboard | Water Groove",
  description: "Secure your future with water groove investment"
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardClient />
    </Suspense>
  );
}
