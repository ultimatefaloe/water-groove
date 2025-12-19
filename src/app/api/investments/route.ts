export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function GET() {
  console.log('Endpoint reached')
  return NextResponse.json(
    {
      status: 200,
      services: {
        database:'Endpoint reached',
      },
    },
    { status: 200 }
  );
}
