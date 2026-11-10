import { getRequestConfig } from 'next-intl/server';
import { routing } from '@/i18n/routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // Await requestLocale to get the locale safely
  let resolvedLocale = await requestLocale;

  // Validate that the incoming locale is supported; otherwise use defaultLocale
  if (!resolvedLocale || !routing.locales.includes(resolvedLocale as (typeof routing.locales)[number])) {
    resolvedLocale = routing.defaultLocale;
  }

  return {
    locale: resolvedLocale,
    messages: (await import(`../messages/${resolvedLocale}.json`)).default,
  };
});