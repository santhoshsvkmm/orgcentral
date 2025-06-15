
import type {NextConfig} from 'next';

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone', // Enables a standalone build optimized for Docker
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable static generation for specific pages
  unstable_excludeFiles: ['**/subcontractors/**'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  experimental: {
    allowedDevOrigins: [
      'https://6000-firebase-studio-1749708322608.cluster-ejd22kqny5htuv5dfowoyipt52.cloudworkstations.dev',
    ],
  },
};

// Conditionally apply the bundle analyzer
const finalConfig = process.env.ANALYZE === 'true' ? withBundleAnalyzer(nextConfig) : nextConfig;

module.exports = finalConfig;
