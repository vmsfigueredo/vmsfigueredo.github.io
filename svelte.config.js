import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html',
			precompress: false,
			strict: true
		}),
		// User/org site served at root — no base path.
		paths: { base: '' },
		prerender: {
			// The article route is legitimately empty while every post is a draft.
			// Any other unseen route is still a build error.
			handleUnseenRoutes: ({ routes, message }) => {
				if (routes.every((route) => route === '/blog/[lang]/[slug]')) return;
				throw new Error(message);
			}
		}
	}
};

export default config;
