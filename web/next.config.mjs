import webpackConfig from './webpack.config.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import jsonImporter from 'node-sass-json-importer';
import nextBuildId from 'next-build-id';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add support for custom build dirs
  // This env variable is supposed to be set by the build process.
  // Do not set it manually in the .env file.
  distDir: process.env.DIST_DIR || '.next',
  reactStrictMode: true,
  // The pre-commit hook takes care of linting
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['localhost', 'cdn.sanity.io'],
    formats: ['image/avif', 'image/webp'],
    imageSizes: [256, 384, 512],
    deviceSizes: [640, 750, 828, 1024, 1200, 1680, 1920, 2048],
  },
  generateBuildId: () => nextBuildId({ dir: __dirname }),
  sassOptions: {
    includePaths: [path.join(__dirname, './src/styles/')],
    prependData: `@import "util.scss";`,
    importer: jsonImporter(),
  },
  // pageExtensions: ['page.tsx', 'page.ts', 'page.js'],
  webpack: webpackConfig,
  async headers() {
    return [
      {
        // matching all font routes
        source: '/fonts/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
        ],
      },
      {
        source: '/img/:path*',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=9999999999, must-revalidate',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
