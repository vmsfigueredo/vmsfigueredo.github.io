import { htmlLang } from '$lib/i18n/lang.js';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const lang = htmlLang(event.url.pathname);
	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', lang)
	});
}
