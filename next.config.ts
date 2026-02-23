
import type {NextConfig} from 'next';

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const path = require('path');

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
  // experimental: { allowedDevOrigins: [...] } removed because it's not available in this Next.js version

  webpack(config, { isServer }) {
    // Configure Webpack to handle SVG files
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    // Provide a small shim for motion-dom internal module that some bundlers can fail to resolve
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'motion-dom/dist/es/utils/supports/linear-easing.mjs': path.resolve(__dirname, 'src/shims/linear-easing.mjs')
    };
    return config;
  },
};

// Conditionally apply the bundle analyzer
const finalConfig = process.env.ANALYZE === 'true' ? withBundleAnalyzer(nextConfig) : nextConfig;

module.exports = finalConfig;
