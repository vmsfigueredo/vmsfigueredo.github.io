import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';
import { translations } from './translations.js';

/** @typedef {'en' | 'pt'} Locale */

const STORAGE_KEY = 'lang';

/** @returns {Locale} */
function initialLocale() {
	if (browser) {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (saved === 'en' || saved === 'pt') return saved;
		const nav = navigator.language?.toLowerCase() ?? '';
		if (nav.startsWith('pt')) return 'pt';
	}
	return 'en';
}

export const locale = writable(/** @type {Locale} */ (initialLocale()));

if (browser) {
	locale.subscribe((value) => {
		localStorage.setItem(STORAGE_KEY, value);
		document.documentElement.lang = value === 'pt' ? 'pt-BR' : 'en';
	});
}

/** Toggle between the two locales. */
export function toggleLocale() {
	locale.update((l) => (l === 'en' ? 'pt' : 'en'));
}

/**
 * Reactive translation accessor.
 * Usage: $t.hero.title — resolves the active locale's tree.
 */
export const t = derived(locale, ($locale) => translations[$locale]);
