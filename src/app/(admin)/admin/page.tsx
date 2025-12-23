import { Suspense } from "react";
import { Metadata } from "next";
import {
  getAllInvestmentCategory,
  getDashboardOverview,
} from "@/services/client/r.service";
import { getServerUser } from "@/lib/server/auth0-server";
import { ApiResponse, CategoryDto, DashboardOverviewData } from "@/types/type";

export const metadata: Metadata = {
  title: "Admin Dashboard | Water Groove",
  description: "Secure your future with water groove investment",
};

// Helper function to format the dashboard data with proper types
function formatDashboardData(data: DashboardOverviewData, auth0User: any) {
  return {
    user: {
      ...data.user,
      // Ensure user data matches the Auth0 user
      id: data.user.id,
      email: data.user.email || auth0User.email,
      fullName: data.user.fullName || auth0User.name || "User",
    },
    category: data.category,
    wallet: data.wallet,
    activeInvestments: data.activeInvestments,
    pendingTransactions: data.pendingTransactions,
    nextRoiDate: data.nextRoiDate,
  };
}

export default async function DashboardPage() {
  try {
    // Get Auth0 user on server side
    const auth0User = await getServerUser();

    // Fetch dashboard data
    const dashboardData = await getDashboardOverview(auth0User.id);
    const investmemtCategoeies = await getAllInvestmentCategory();

    // Format and validate data
    const formattedData = formatDashboardData(dashboardData, auth0User);

    return (
      <Suspense fallback={<p>Loading...</p>}>
        {/* <AdminDashboardClient data={formattedData} categories={investmemtCategoeies.data ?? []} /> */}
      </Suspense>
    );
  } catch (error) {
    console.error("Error loading dashboard:", error);

    // Return error state
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-5 bg-wg-secondary/30 border border-wg-accent rounded-2xl">
          <h2 className="text-2xl font-bold text-wg-accent">
            Something went wrong, while loading dashboard
          </h2>
          <p className="text-muted-foreground mt-2">
            Please try again or contact support.
          </p>
        </div>
      </div>
    );
  }
}
