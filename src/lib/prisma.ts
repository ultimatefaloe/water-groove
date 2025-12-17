
/**
 * ------------------------------------
 * Database Connection Check (Startup)
 * ------------------------------------
 */
export async function checkDbConnection(): Promise<void> {
  try {
    // Lightweight, fast, safe query
    await prisma.$queryRaw`SELECT 1`;
    console.info("✅ Database connection established");
  } catch (error) {
    console.error("❌ Database connection failed", error);
    throw error; // Fail fast in production
  }
}

/**
 * ------------------------------------
 * Database Health Check (Monitoring)
 * ------------------------------------
 * Can be used for:
 * - /api/health
 * - Kubernetes liveness/readiness
 * - Docker healthcheck
 * - Uptime monitoring
 */
export async function getDbHealth() {
  const start = Date.now();

  try {
    await prisma.$queryRaw`SELECT 1`;

    return {
      status: "healthy",
      database: "postgresql",
      latencyMs: Date.now() - start,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return {
      status: "unhealthy",
      database: "postgresql",
      latencyMs: null,
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
