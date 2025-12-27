import { getServerAdminId } from "@/lib/server/auth0-server";
import { approveDeposit, rejectDeposit } from "@/services/admin/cud.service";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const transactionId = (await params).id

    if (!transactionId) {
      return NextResponse.json(
        { success: false, message: "transactionId is required" },
        { status: 400 }
      );
    }

    const adminId = await getServerAdminId();

   const res = await rejectDeposit(transactionId, adminId)

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.error("Deposit error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
