import { defineMiddleware } from "astro/middleware";

const INDEX_PATH = "/api";

export const onRequest = defineMiddleware((context, next) => {
  /**
   * The middleware runs every time a page or endpoint is about to be rendered.
   * Only redirect if this is the home page
   */
  if (context.url.pathname.includes(INDEX_PATH)) {
    /**
     * Construct a full URL by passing `context.url` as the base URL
     */
    return Response.redirect(new URL("/404", context.url), 302);

    /**
     * You may also redirect using `context.redirect` as shown below:
     * =========================================
     * return context.redirect("/redirected", 302);
     * =========================================
     * Note that this only works in SSR mode
     */
  }

  return next();
});
