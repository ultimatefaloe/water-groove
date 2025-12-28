import { Auth0Client } from "@auth0/nextjs-auth0/server";

export const auth0 = new Auth0Client({
  authorizationParameters: {
    audience: "https://api.watergroove.com",
    scope: "openid profile email",
  },
  session: {
    cookie: {
      sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax",   // survives OAuth redirect on localhost
      secure: process.env.NODE_ENV === 'production' ? true : false,     // must be false on HTTP
    },
    rolling: true,
    absoluteDuration: 3600,
  },
});
