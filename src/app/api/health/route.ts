export const runtime = "nodejs";


import { NextResponse } from "next/server";
import { getDbHealth } from "@/lib/prisma";

export async function GET() {
  console.log('Endpoint reached')
  const db = await getDbHealth();

  const statusCode = db.status === "healthy" ? 200 : 503;

  return NextResponse.json(
    {
      status: db.status,
      services: {
        database: db,
      },
    },
    { status: statusCode }
  );
}
