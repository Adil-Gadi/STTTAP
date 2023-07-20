import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
	// control rendering mode (server/hybrid)
	output: 'server',

	integrations: [tailwind()],
});
