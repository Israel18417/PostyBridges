import { realpathSync } from 'node:fs';
import { defineConfig } from 'vite';

export default defineConfig({
  root: realpathSync(process.cwd()),
  build: {
    // Target modern browsers — smaller, faster output
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
    // Enable CSS minification
    cssMinify: true,
    // Inline small assets (< 4kb) as base64 to save round trips
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        // Deterministic asset filenames for long-term caching
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
});
