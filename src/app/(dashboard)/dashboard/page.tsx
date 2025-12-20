import { Suspense } from "react";
import { DashboardSkeleton } from "./_components/dashboard/DashboardSkeleton";
import DashboardClient from "./_components/dashboard/DashboardClient";
import { Metadata } from "next";
import { getAllInvestmentCategory, getDashboardOverview } from "@/services/client/r.service";
import { getServerUser } from "@/lib/server/auth0-server";
import { DashboardOverviewData } from "@/types/type";

export const metadata: Metadata = {
  title: "Dashboard | Water Groove",
  description: "Secure your future with water groove investment"
}

// Helper function to format the dashboard data with proper types
function formatDashboardData(data: DashboardOverviewData, auth0User: any) {
  return {
    user: {
      ...data.user,
      // Ensure user data matches the Auth0 user
      id: data.user.id,
      email: data.user.email || auth0User.email,
      fullName: data.user.fullName || auth0User.name || 'User',
    },
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
    console.log(auth0User)
    
    // Fetch dashboard data
    const dashboardData = await getDashboardOverview(auth0User.id);
    const investmemtCategoeies = await getAllInvestmentCategory()
    
    // Format and validate data
    const formattedData = formatDashboardData(dashboardData, auth0User);

    return (
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardClient data={formattedData} categories={investmemtCategoeies?.data} />
      </Suspense>
    );
  } catch (error) {
    console.error('Error loading dashboard:', error);
    
    // Return error state
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Error Loading Dashboard</h2>
          <p className="text-muted-foreground mt-2">
            Please try again or contact support.
          </p>
        </div>
      </div>
    );
  }
}