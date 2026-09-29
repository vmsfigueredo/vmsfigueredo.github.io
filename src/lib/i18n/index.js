import { derived, writable } from 'svelte/store';
import { browser } from '$app/environment';
import { readStorage, writeStorage } from '$lib/storage.js';
import { resolveInitialLocale } from './lang.js';
import { translations } from './translations.js';

/** @typedef {import('./lang.js').Locale} Locale */

const STORAGE_KEY = 'lang';

/**
 * Starts as English on server and client so hydration matches the prerendered
 * HTML; `initLocale` switches to the visitor's language after mount.
 */
export const locale = writable(/** @type {Locale} */ ('en'));

let started = false;

/** @param {string} pathname */
export function initLocale(pathname) {
	if (!browser || started) return;
	started = true;

	locale.set(
		resolveInitialLocale({
			pathname,
			saved: readStorage(STORAGE_KEY),
			navigatorLanguage: navigator.language
		})
	);
	locale.subscribe((value) => {
		writeStorage(STORAGE_KEY, value);
		document.documentElement.lang = value === 'pt' ? 'pt-BR' : 'en';
	});
}

export function toggleLocale() {
	locale.update((current) => (current === 'en' ? 'pt' : 'en'));
}

/** Reactive dictionary for the active locale: `$t.hero.lead`. */
export const t = derived(locale, ($locale) => translations[$locale]);
