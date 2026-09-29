import assert from 'node:assert/strict';
import test from 'node:test';

import { appendBlogSitemap, generateRssFeed } from './blog-output.js';

/** @type {import('./blog-parser.js').BlogMetadata[]} */
const posts = [
	{
		title: 'Architecture & delivery',
		description: 'Boundaries < decisions',
		date: '2026-08-28',
		lang: 'en',
		slug: 'architecture',
		tags: ['Architecture'],
		readingTime: 2,
		translationKey: 'architecture',
		url: '/blog/en/architecture/'
	}
];

test('generates escaped RSS items with canonical article URLs', () => {
	const xml = generateRssFeed(posts, { origin: 'https://vitorfigueredo.dev' });

	assert.match(xml, /<title>Architecture &amp; delivery<\/title>/);
	assert.match(xml, /<description>Boundaries &lt; decisions<\/description>/);
	assert.match(xml, /<link>https:\/\/vitorfigueredo\.dev\/blog\/en\/architecture\/<\/link>/);
	assert.match(xml, /<guid isPermaLink="true">https:\/\/vitorfigueredo\.dev\/blog\/en\/architecture\/<\/guid>/);
	assert.match(xml, /<language>en<\/language>/);
});

test('appends article URLs while preserving every byte of the original sitemap entries', () => {
	const original = [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
		'\t<url><loc>https://vitorfigueredo.dev/</loc></url>',
		'\t<url><loc>https://vitorfigueredo.dev/troco</loc></url>',
		'</urlset>',
		''
	].join('\n');
	const output = appendBlogSitemap(original, posts, { origin: 'https://vitorfigueredo.dev' });
	const closingTag = original.indexOf('</urlset>');

	assert.equal(output.slice(0, closingTag), original.slice(0, closingTag));
	assert.equal(output.slice(-'</urlset>\n'.length), '</urlset>\n');
	assert.match(output, /<loc>https:\/\/vitorfigueredo\.dev\/blog\/en\/architecture\/<\/loc>/);
	assert.match(output, /<lastmod>2026-08-28<\/lastmod>/);
	assert.equal(
		(output.match(/<loc>https:\/\/vitorfigueredo\.dev\/blog\/<\/loc>/g) ?? []).length,
		1
	);
});

test('does not add blog URLs already present in the static sitemap', () => {
	const original = `<?xml version="1.0"?><urlset><url><loc>https://vitorfigueredo.dev/blog/</loc></url><url><loc>https://vitorfigueredo.dev/blog/en/architecture/</loc></url></urlset>`;

	assert.equal(appendBlogSitemap(original, posts), original);
});
