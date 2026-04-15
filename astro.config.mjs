import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://spignelon.github.io',
  integrations: [tailwind()],
  output: 'static',
});
