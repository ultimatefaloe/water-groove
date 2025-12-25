import { Suspense } from "react";
import { Metadata } from "next";
import { getServerAdmin } from "@/lib/server/auth0-server";
import { getAdminDashboardOverview } from "@/services/admin/r.service";
import AdminDashboardClient from "../_components/AdminDashboardClient";
import { AdminDashboardOverview } from "@/types/adminType";

export const metadata: Metadata = {
  title: "Admin Dashboard | Water Groove",
  description: "Secure your future with water groove investment",
};

export default async function DashboardPage() {
  try {
    // Get Auth0 user on server side
    const auth0User = await getServerAdmin();

    // Fetch dashboard data
    const dashboardData = await getAdminDashboardOverview(auth0User.id);

    if (!dashboardData?.data) {
      throw new Error("Dashboard data not available");
    }

    const processedData: AdminDashboardOverview = {
      ...dashboardData.data,
      totalWithdrawalAmount: Number.isNaN(
        dashboardData.data.totalWithdrawalAmount
      )
        ? 0
        : dashboardData.data.totalWithdrawalAmount,
      totalRoiPaidAmount: Number.isNaN(dashboardData.data.totalRoiPaidAmount)
        ? 0
        : dashboardData.data.totalRoiPaidAmount,
    };
    return (
      <Suspense
        fallback={
          <div className="min-h-screen bg-wg-primary flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wg-accent"></div>
          </div>
        }
      >
        <AdminDashboardClient serverData={processedData} />
      </Suspense>
    );
  } catch (error: any) {
    console.log("Error loading dashboard:", error.message);
    return (
      <div className="flex min-h-screen items-center justify-center bg-wg-primary px-4">
        <div
          role="alert"
          className="w-full max-w-md rounded-2xl border border-wg-accent/30 bg-wg-secondary/40 p-6 text-center shadow-lg"
        >
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-wg-accent/10">
            <svg
              className="h-6 w-6 text-wg-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75M12 15.75h.007M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <h2 className="text-xl font-semibold text-wg-accent">
            Dashboard failed to load
          </h2>

          <p className="mt-2 text-sm text-wg-neutral/60">
            {error.message ||
              `Something went wrong while loading your dashboard. Please try again,
            or contact support if the problem persists.`}
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={() => window.location.reload()}
              className="rounded-lg bg-wg-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-wg-accent/90 focus:outline-none focus:ring-2 focus:ring-wg-accent/50"
            >
              Retry
            </button>

            <a
              href="/support"
              className="rounded-lg border border-wg-accent/40 px-4 py-2 text-sm font-medium text-wg-accent transition hover:bg-wg-accent/10 focus:outline-none focus:ring-2 focus:ring-wg-accent/50"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    );
  }
}
