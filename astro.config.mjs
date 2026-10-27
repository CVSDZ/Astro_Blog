// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://cvsdz.xyz',
  output: 'static',                 // 纯静态,无需任何部署适配器
  vite: { plugins: [tailwindcss()] },
  markdown: {
    shikiConfig: {
      // 明/暗双主题,配合 global.css 里的 .astro-code 切换
      themes: { light: 'github-light', dark: 'github-dark' },
    },
  },
  integrations: [react()]
});