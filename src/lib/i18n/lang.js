/** @typedef {'en' | 'pt'} Locale */

/**
 * `<html lang>` for the prerendered page. Only Portuguese articles have a
 * language fixed by their URL; everything else is served in English first.
 *
 * @param {string} pathname
 * @returns {'en' | 'pt-BR'}
 */
export function htmlLang(pathname) {
	return /^\/blog\/pt(?:\/|$)/.test(pathname) ? 'pt-BR' : 'en';
}

/**
 * Locale for the first client render: article URL, then saved choice, then browser.
 *
 * @param {{ pathname: string, saved?: string | null, navigatorLanguage?: string }} input
 * @returns {Locale}
 */
export function resolveInitialLocale({ pathname, saved, navigatorLanguage = '' }) {
	const fromPath = /^\/blog\/(en|pt)\//.exec(pathname)?.[1];
	if (fromPath === 'en' || fromPath === 'pt') return fromPath;
	if (saved === 'en' || saved === 'pt') return saved;
	return navigatorLanguage.toLowerCase().startsWith('pt') ? 'pt' : 'en';
}
