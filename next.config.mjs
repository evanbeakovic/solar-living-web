import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/apartments',
        destination: '/accommodation',
        permanent: true,
      },
      {
        source: '/:locale(en|hr|de|it|ru|hu)/apartments',
        destination: '/:locale/accommodation',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
