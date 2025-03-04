import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    coverage: {
      exclude: ['public', 'scripts', 'src/generated'],
      include: ['src/components', 'src/connected-components', 'src/hooks', 'src/utils'],
      provider: 'v8', // Ensures Istanbul is used for coverage
      reporter: ['text', 'lcov'],
      all: true,
      reportsDirectory: 'coverage',
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
  plugins: [
    swc.vite({
      module: { type: 'es6' },
      jsc: {
        transform: {
          react: {
            runtime: 'automatic',
          },
        },
      },
    }),
    react({
      jsxRuntime: 'automatic',
    }),
  ],
  resolve: {
    alias: {
      '@Utils': path.resolve(__dirname, 'src', 'utils'),
      '@Hooks': path.resolve(__dirname, 'src', 'hooks'),
      '@Redux': path.resolve(__dirname, 'src', 'redux'),
      '@providers': path.resolve(__dirname, 'src', 'providers'),
      '@Lib': path.resolve(__dirname, 'src', 'lib'),
      '@Features': path.resolve(__dirname, 'src', 'features'),
      '@Connected-components': path.resolve(__dirname, 'src', 'connected-components'),
      '@Components': path.resolve(__dirname, 'src', 'components'),

      '@App': path.resolve(__dirname, 'app'),
      '@Src': path.resolve(__dirname, 'src'),
      '@Playwright': path.resolve(__dirname, 'tests'),

      '@Root': path.resolve(__dirname),
    },
  },
});
