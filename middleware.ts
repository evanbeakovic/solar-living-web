import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "hr", "de", "it", "ru", "hu", "cs", "sk", "pl", "sl", "uk"],
  defaultLocale: "en",
  // Explicit defaults (next-intl already applies these unless overridden):
  // browser Accept-Language detection, with a manual-switch preference
  // remembered via a functional (non-tracking) cookie.
  localeDetection: true,
  localeCookie: { name: "NEXT_LOCALE", sameSite: "lax" },
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
