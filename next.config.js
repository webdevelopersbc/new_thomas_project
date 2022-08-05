/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true, // IMPORTANT!!! REMOVE WHEN STABLE
  },
  productionBrowserSourceMaps: true,
};

module.exports = nextConfig;
