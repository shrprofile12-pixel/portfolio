import createMiddleware from 'next-intl/middleware';
import { routing } from '../src/i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Matcher ignoring internal paths, API routes, and static assets
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};