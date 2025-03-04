/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';
import createNextIntlPlugin from 'next-intl/plugin';

// Define __dirname manually since it's not available in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.minimize = true;
    }

    config.resolve.alias = {
      ...config.resolve.alias,
      '@Playwright': path.resolve(__dirname, 'tests'),
      '@Generated': path.resolve(__dirname, 'src/generated'),
      '@Utils': path.resolve(__dirname, 'src/utils'),
      '@Redux': path.resolve(__dirname, 'src/redux'),
      '@Providers': path.resolve(__dirname, 'src/providers'),
      '@Lib': path.resolve(__dirname, 'src/lib'),
      '@Hooks': path.resolve(__dirname, 'src/hooks'),
      '@Features': path.resolve(__dirname, 'src/features'),
      '@Connected-components': path.resolve(__dirname, 'src/connected-components'),
      '@Components': path.resolve(__dirname, 'src/components'),
      '@App': path.resolve(__dirname, 'app'),
      '@Src': path.resolve(__dirname, 'src'),
      '@Root': path.resolve(__dirname, '.'),
    };

    return config;
  },
  images: {
    remotePatterns: [],
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
