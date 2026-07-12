import { createNavigation } from 'next-intl/navigation';

export const { Link, redirect, usePathname, useRouter } = createNavigation({
  locales: ['en', 'hr', 'de', 'it', 'ru', 'hu', 'cs', 'sk'] as const,
});
