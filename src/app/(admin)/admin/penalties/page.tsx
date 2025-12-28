import { Metadata } from "next";
import { getAllPenalties } from "@/services/admin/r.service";
import PenaltiesClient from "../_components/PenaltiesClient";
import { resolveServerAuth } from "@/lib/server/auth0-server";
import { AdminPenaltiesQueryParams } from "@/types/adminType";

export const metadata: Metadata = {
  title: "Penalties Management | Water Groove Admin",
  description: "Manage and monitor all penalty transactions",
};

const page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  try {
    const resolved = await resolveServerAuth();
    const adminId = resolved?.user?.id;

    if (!adminId) {
      throw new Error("Admin authentication required");
    }

    // Parse query parameters
    const params: AdminPenaltiesQueryParams = {
      transactionId: searchParams.transactionId as string || undefined,
      order: (searchParams.order as 'asc' | 'desc') || 'desc',
      page: searchParams.page ? parseInt(searchParams.page as string) : 1,
      limit: searchParams.limit ? parseInt(searchParams.limit as string) : 20,
    };

    const response = await getAllPenalties(adminId, params);

    const data = response?.data ?? {
      data: [],
      total: 0,
      page: 1,
      limit: 20,
      totalPages: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    };

    return (
      <PenaltiesClient
        initialPenalties={data.data}
        total={data.total}
        page={data.page}
        limit={data.limit}
        totalPages={data.totalPages}
      />
    );
  } catch (error) {
    console.error("Error loading penalties:", error);
    
    // Fallback data for error state
    const fallbackData = {
      data: [],
      total: 0,
      page: 1,
      limit: 20,
      totalPages: 0,
    };

    return (
      <PenaltiesClient
        initialPenalties={fallbackData.data}
        total={fallbackData.total}
        page={fallbackData.page}
        limit={fallbackData.limit}
        totalPages={fallbackData.totalPages}
        isFallbackData={true}
      />
    );
  }
};

export default page;