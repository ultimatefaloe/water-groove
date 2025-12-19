"use server"

import { requireUser } from "@/lib/auth"
import { getDashboardOverview } from "@/services/client.service"

export async function getDashboardOverviewAction() {
  const { userId } = await requireUser()
  return getDashboardOverview(userId)
}
