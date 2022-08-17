/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true, // IMPORTANT!!! REMOVE WHEN STABLE
  },
  productionBrowserSourceMaps: true, // IMPORTANT!!! REMOVE IN PRODUCTION RELEASE
};

module.exports = withBundleAnalyzer(nextConfig);
