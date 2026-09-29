process.env.TZ = 'America/Sao_Paulo';

import assert from 'node:assert/strict';
import test from 'node:test';

import {
	availableTags,
	filterPosts,
	formatPostDate,
	latestPosts,
	normalizeSearch,
	translationTarget
} from './format.js';

/** @param {Partial<import('./format.js').PostSummary>} overrides */
function post(overrides) {
	return {
		title: 'Title',
		description: 'Description',
		date: '2026-09-18',
		lang: /** @type {'en' | 'pt'} */ ('pt'),
		slug: 'slug',
		tags: ['Arquitetura'],
		readingTime: 3,
		translationKey: 'key',
		url: '/blog/pt/slug/',
		...overrides
	};
}

test('formats dates without shifting the day in a negative UTC offset', () => {
	assert.equal(formatPostDate('2026-09-18', 'pt'), '18 set 2026');
	assert.equal(formatPostDate('2026-01-01', 'pt'), '1 jan 2026');
	assert.equal(formatPostDate('2026-09-18', 'en'), 'Sep 18, 2026');
	assert.equal(formatPostDate('2026-09-18', 'pt', 'long'), '18 de setembro de 2026');
	assert.equal(formatPostDate('2026-09-18', 'en', 'long'), 'September 18, 2026');
});

test('normalizes search text by removing accents and case', () => {
	assert.equal(normalizeSearch('  Liderança TÉCNICA '), 'lideranca tecnica');
});

test('filters by language, tag and accent-insensitive multi-word query', () => {
	const posts = [
		post({ slug: 'a', title: 'Liderança técnica', tags: ['Liderança'] }),
		post({ slug: 'b', title: 'Multi-tenancy no Sigebra', tags: ['Laravel', 'Multi-tenancy'] }),
		post({ slug: 'c', lang: 'en', title: 'Technical leadership', tags: ['Leadership'] })
	];

	assert.deepEqual(filterPosts(posts, { lang: 'pt' }).map((p) => p.slug), ['a', 'b']);
	assert.deepEqual(filterPosts(posts, { lang: 'pt', query: 'lideranca' }).map((p) => p.slug), ['a']);
	assert.deepEqual(filterPosts(posts, { lang: 'pt', query: 'LARAVEL sigebra' }).map((p) => p.slug), ['b']);
	assert.deepEqual(filterPosts(posts, { lang: 'pt', tag: 'Liderança' }).map((p) => p.slug), ['a']);
	assert.deepEqual(filterPosts(posts, { lang: 'en', tag: 'Liderança' }), []);
});

test('lists tags of one language, most used first then alphabetical', () => {
	const posts = [
		post({ tags: ['Laravel', 'Arquitetura'] }),
		post({ tags: ['Arquitetura', 'Times'] }),
		post({ lang: 'en', tags: ['Leadership'] })
	];

	assert.deepEqual(availableTags(posts, 'pt'), [
		{ tag: 'Arquitetura', count: 2 },
		{ tag: 'Laravel', count: 1 },
		{ tag: 'Times', count: 1 }
	]);
	assert.deepEqual(availableTags(posts, 'en'), [{ tag: 'Leadership', count: 1 }]);
});

test('returns the newest posts of a language, capped, and nothing when the language has none', () => {
	const posts = [
		post({ slug: 'old', date: '2026-01-01' }),
		post({ slug: 'new', date: '2026-09-01' }),
		post({ slug: 'mid', date: '2026-05-01' }),
		post({ slug: 'mid2', date: '2026-04-01' })
	];

	assert.deepEqual(latestPosts(posts, 'pt', 3).map((p) => p.slug), ['new', 'mid', 'mid2']);
	assert.deepEqual(latestPosts(posts, 'en', 3), []);
});

test('falls back to the blog index when an article has no translation', () => {
	assert.equal(translationTarget({ pt: '/blog/pt/a/', en: '/blog/en/a/' }, 'en'), '/blog/en/a/');
	assert.equal(translationTarget({ pt: '/blog/pt/a/' }, 'en'), '/blog/');
});
