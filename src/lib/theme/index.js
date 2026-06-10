import { writable } from 'svelte/store';
import { browser } from '$app/environment';

/** @typedef {'system' | 'light' | 'dark'} Theme */

const STORAGE_KEY = 'theme';
const ORDER = /** @type {Theme[]} */ (['system', 'light', 'dark']);

/** @returns {Theme} */
function initial() {
	if (browser) {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (saved === 'light' || saved === 'dark' || saved === 'system') return saved;
	}
	return 'system';
}

export const theme = writable(/** @type {Theme} */ (initial()));

/**
 * Resolve a theme to the concrete class and apply it to <html>.
 * @param {Theme} value
 */
function apply(value) {
	if (!browser) return;
	const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	const effective = value === 'system' ? (prefersDark ? 'dark' : 'light') : value;
	const root = document.documentElement;
	root.classList.toggle('dark', effective === 'dark');
	root.classList.toggle('light', effective === 'light');
}

if (browser) {
	theme.subscribe((value) => {
		localStorage.setItem(STORAGE_KEY, value);
		apply(value);
	});

	// React to OS changes while in "system" mode.
	const mq = window.matchMedia('(prefers-color-scheme: dark)');
	mq.addEventListener('change', () => {
		if (localStorage.getItem(STORAGE_KEY) === 'system') apply('system');
	});
}

/** Cycle system → light → dark → system. */
export function cycleTheme() {
	theme.update((current) => {
		const next = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length];
		return next;
	});
}
