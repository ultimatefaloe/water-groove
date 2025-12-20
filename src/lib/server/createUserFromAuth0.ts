import { db } from "@/lib/db";

export async function createUserFromAuth0(auth0User: any) {
  const auth0Id = auth0User.sub;

  if(!auth0Id) return null;

  const existingUser = await db.user.findUnique({
    where: { auth0Id },
  });

  if (existingUser) return existingUser;

  return await db.user.create({
    data: {
      auth0Id,
      email: auth0User.email,
      fullName: auth0User.name,
      picture: auth0User.picture,
    },
  });
}