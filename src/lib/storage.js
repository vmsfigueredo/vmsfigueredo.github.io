/** localStorage access that never throws (private mode, blocked storage). */

/** @param {string} key */
export function readStorage(key) {
	try {
		return localStorage.getItem(key);
	} catch {
		return null;
	}
}

/** @param {string} key @param {string} value */
export function writeStorage(key, value) {
	try {
		localStorage.setItem(key, value);
	} catch {
		/* storage unavailable: preference lives for this page view only */
	}
}
