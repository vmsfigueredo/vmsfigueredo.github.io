/**
 * Pure helpers shared by the blog pages and the home page. No SvelteKit imports,
 * so they run under `node --test` and in the browser alike.
 *
 * @typedef {'en' | 'pt'} Lang
 * @typedef {{ title: string, description: string, date: string, lang: Lang, slug: string, tags: string[], readingTime: number, translationKey: string, cover?: string, url: string }} PostSummary
 */

const INTL_LOCALE = { en: 'en-US', pt: 'pt-BR' };

/**
 * Format a YYYY-MM-DD post date. Always in UTC so the day never shifts with the
 * reader's timezone.
 *
 * @param {string} date
 * @param {Lang} lang
 * @param {'short' | 'long'} [style]
 */
export function formatPostDate(date, lang, style = 'short') {
	const value = new Date(`${date}T00:00:00Z`);
	const month = style === 'long' ? 'long' : 'short';
	const formatter = new Intl.DateTimeFormat(INTL_LOCALE[lang], {
		day: 'numeric',
		month,
		year: 'numeric',
		timeZone: 'UTC'
	});

	if (lang === 'pt' && style === 'short') {
		const parts = formatter.formatToParts(value);
		/** @param {string} type */
		const part = (type) => parts.find((item) => item.type === type)?.value ?? '';
		return `${part('day')} ${part('month').replace('.', '')} ${part('year')}`;
	}

	return formatter.format(value);
}

/** @param {string} value */
export function normalizeSearch(value) {
	return value
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '')
		.toLowerCase()
		.replace(/\s+/g, ' ')
		.trim();
}

/**
 * @param {PostSummary[]} posts
 * @param {{ lang: Lang, tag?: string, query?: string }} options
 */
export function filterPosts(posts, { lang, tag = '', query = '' }) {
	const terms = normalizeSearch(query).split(' ').filter(Boolean);

	return posts.filter((post) => {
		if (post.lang !== lang) return false;
		if (tag && !post.tags.includes(tag)) return false;
		if (terms.length === 0) return true;

		const haystack = normalizeSearch([post.title, post.description, ...post.tags].join(' '));
		return terms.every((term) => haystack.includes(term));
	});
}

/**
 * Tags used by one language, most frequent first, then alphabetical.
 *
 * @param {PostSummary[]} posts
 * @param {Lang} lang
 */
export function availableTags(posts, lang) {
	/** @type {Map<string, number>} */
	const counts = new Map();
	for (const post of posts) {
		if (post.lang !== lang) continue;
		for (const tag of post.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
	}

	return [...counts]
		.map(([tag, count]) => ({ tag, count }))
		.sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag, INTL_LOCALE[lang]));
}

/**
 * @param {PostSummary[]} posts
 * @param {Lang} lang
 * @param {number} [limit]
 */
export function latestPosts(posts, lang, limit = 3) {
	return posts
		.filter((post) => post.lang === lang)
		.sort((a, b) => b.date.localeCompare(a.date))
		.slice(0, limit);
}

/**
 * Where the language toggle should go from an article: its translation, or the
 * blog index when the article was not translated.
 *
 * @param {Partial<Record<Lang, string>>} translations
 * @param {Lang} lang
 */
export function translationTarget(translations, lang) {
	return translations[lang] ?? '/blog/';
}
