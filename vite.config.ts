import { realpathSync } from 'node:fs';
import { defineConfig } from 'vite';

export default defineConfig({
  root: realpathSync(process.cwd())
});
