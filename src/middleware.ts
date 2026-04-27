import createMiddleware from 'next-intl/middleware';
import {locales, defaultLocale} from './i18n';

export default createMiddleware({
  defaultLocale,
  locales
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|pt|es|fr)/:path*']
};
