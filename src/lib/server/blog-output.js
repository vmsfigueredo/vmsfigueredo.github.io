const DEFAULT_ORIGIN = 'https://vitorfigueredo.dev';

/** @typedef {import('./blog-parser.js').BlogMetadata} BlogMetadata */

/** @param {unknown} value */
function escapeXml(value) {
	return String(value)
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&apos;');
}

/** @param {string} origin @param {string} pathname */
function canonicalUrl(origin, pathname) {
	return `${origin.replace(/\/$/, '')}${pathname}`;
}

/** @param {BlogMetadata[]} posts @param {{origin?: string}} [options] */
export function generateRssFeed(posts, { origin = DEFAULT_ORIGIN } = {}) {
	const items = posts
		.map((post) => {
			const url = canonicalUrl(origin, post.url);
			const published = new Date(`${post.date}T00:00:00.000Z`).toUTCString();

			return [
				'\t\t<item>',
				`\t\t\t<title>${escapeXml(post.title)}</title>`,
				`\t\t\t<description>${escapeXml(post.description)}</description>`,
				`\t\t\t<link>${escapeXml(url)}</link>`,
				`\t\t\t<guid isPermaLink="true">${escapeXml(url)}</guid>`,
				`\t\t\t<pubDate>${published}</pubDate>`,
				...post.tags.map((tag) => `\t\t\t<category>${escapeXml(tag)}</category>`),
				'\t\t</item>'
			].join('\n');
		})
		.join('\n');
	const language = posts[0]?.lang ?? 'en';

	return [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
		'\t<channel>',
		'\t\t<title>Vitor Figueredo — Writing</title>',
		`\t\t<link>${escapeXml(`${origin.replace(/\/$/, '')}/blog/`)}</link>`,
		'\t\t<description>Notes on software architecture, product engineering and technical leadership.</description>',
		`\t\t<language>${language}</language>`,
		`\t\t<atom:link href="${escapeXml(`${origin.replace(/\/$/, '')}/feed.xml`)}" rel="self" type="application/rss+xml" />`,
		items,
		'\t</channel>',
		'</rss>',
		''
	].join('\n');
}

/** @param {string} sitemap @param {BlogMetadata[]} posts @param {{origin?: string}} [options] */
export function appendBlogSitemap(sitemap, posts, { origin = DEFAULT_ORIGIN } = {}) {
	const blogUrl = canonicalUrl(origin, '/blog/');
	const entries = sitemap.includes(`<loc>${blogUrl}</loc>`)
		? []
		: [`\t<url><loc>${escapeXml(blogUrl)}</loc></url>`];
	entries.push(
		...posts
		.filter((post) => !sitemap.includes(`<loc>${canonicalUrl(origin, post.url)}</loc>`))
		.map(
			(post) =>
				`\t<url><loc>${escapeXml(canonicalUrl(origin, post.url))}</loc><lastmod>${post.date}</lastmod></url>`
		)
	);

	if (entries.length === 0) return sitemap;
	const closingTagIndex = sitemap.lastIndexOf('</urlset>');
	if (closingTagIndex === -1) throw new Error('Sitemap is missing its closing </urlset> tag');

	return `${sitemap.slice(0, closingTagIndex)}${entries.join('\n')}\n${sitemap.slice(closingTagIndex)}`;
}
