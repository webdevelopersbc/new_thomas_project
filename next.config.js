/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true, // IMPORTANT!!! REMOVE WHEN STABLE
  },
};

module.exports = nextConfig;
