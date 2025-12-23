import { TransactionStatus, TransactionType } from '@prisma/client';
import { NextResponse } from "next/server";
import { TransactionQueryParams } from "@/types/type";
import { getTransactions } from "@/services/client/r.service";
import { getServerUserId } from '@/lib/server/auth0-server';

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const userId = await getServerUserId()
    const { searchParams } = new URL(req.url);

    const query: TransactionQueryParams = {
      type: (searchParams.get("type") as TransactionType) ?? undefined,
      status: (searchParams.get("status") as TransactionStatus) ?? undefined,
      from: searchParams.get("from") ?? undefined,
      to: searchParams.get("to") ?? undefined,
      page: searchParams.get("page") ?? undefined,
      limit: searchParams.get("limit") ?? undefined,
      sortBy: searchParams.get("sortBy") as any,
      sortOrder: searchParams.get("sortOrder") as any,
    };

    const res = await getTransactions(userId, query);

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.error("Get transactions error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        data: [],
      },
      { status: 500 }
    );
  }
}
