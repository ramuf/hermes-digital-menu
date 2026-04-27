import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';

export const locales = ['en', 'pt', 'es', 'fr'];
export const defaultLocale = 'en';

export default getRequestConfig(async ({ locale }) => {
  const received = locale as string | undefined;
  // Log received locale for debugging
  // eslint-disable-next-line no-console
  console.log('getRequestConfig received locale:', received);

  let loc = received || defaultLocale;
  if (!locales.includes(loc)) {
    // eslint-disable-next-line no-console
    console.error(`Invalid locale "${loc}"; falling back to default "${defaultLocale}"`);
    loc = defaultLocale;
  }

  return {
    locale: loc,
    // messages are stored at the repo root `messages/` folder
    messages: (await import(`../messages/${loc}.json`)).default,
  };
});
