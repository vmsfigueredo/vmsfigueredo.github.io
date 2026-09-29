import { get, writable } from 'svelte/store';
import { browser } from '$app/environment';
import { readStorage, writeStorage } from '$lib/storage.js';

/** @typedef {'system' | 'light' | 'dark'} Theme */

const STORAGE_KEY = 'theme';
const ORDER = /** @type {Theme[]} */ (['system', 'light', 'dark']);

/** Starts as "system" everywhere; `initTheme` loads the saved choice after mount. */
export const theme = writable(/** @type {Theme} */ ('system'));

/** @param {Theme} value */
function apply(value) {
	const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	const effective = value === 'system' ? (prefersDark ? 'dark' : 'light') : value;
	const root = document.documentElement;
	root.classList.toggle('dark', effective === 'dark');
	root.classList.toggle('light', effective === 'light');
}

let started = false;

export function initTheme() {
	if (!browser || started) return;
	started = true;

	const saved = readStorage(STORAGE_KEY);
	if (saved === 'light' || saved === 'dark' || saved === 'system') theme.set(saved);
	theme.subscribe((value) => {
		writeStorage(STORAGE_KEY, value);
		apply(value);
	});
	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
		if (get(theme) === 'system') apply('system');
	});
}

/** Cycle system → light → dark → system. */
export function cycleTheme() {
	theme.update((current) => ORDER[(ORDER.indexOf(current) + 1) % ORDER.length]);
}
