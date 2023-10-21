import { defineMiddleware } from "astro/middleware";
import { isAuth } from "./auth/isAuth";

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware(async (context, next) => {
  //Authorization middleware for server-side rendering
  const auth = await isAuth(
    context.cookies.get("my-refresh-token")?.value,
    context.cookies.get("my-access-token")?.value,
  );

  context.locals.loggedIn = auth ? true : false;
  if (auth) {
    context.locals.session = auth;
  }

  return next();
});
