import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "hr", "de", "it", "ru", "hu"],
  defaultLocale: "en",
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
