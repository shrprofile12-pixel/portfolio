import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
        pathname: '/shrprofile12-pixel/**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/shrprofile12-pixel/**',
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin(
  './src/i18n/request.ts'
);

export default withNextIntl(nextConfig);