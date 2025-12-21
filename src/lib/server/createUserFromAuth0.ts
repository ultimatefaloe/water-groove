import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function createUserFromAuth0(auth0User: any) {
  try {
    const auth0Id = auth0User?.sub;
    if (!auth0Id) return null;

    const existingUser = await db.user.findUnique({
      where: { auth0Id },
    });

    if (existingUser) return existingUser;

    const createdUser =  await db.user.create({
      data: {
        auth0Id,
        email: auth0User.email ?? null,
        fullName: auth0User.name ?? null,
        picture: auth0User.picture ?? null,
      },
    });
    return createdUser
  } catch (error) {
    console.log(error)
    // Prisma-specific handling
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("Prisma error creating user:", error.code);
    } else {
      console.error("Unknown error creating user:", error);
    }

    // Prevent app from crashing
    return null;
  }
}
