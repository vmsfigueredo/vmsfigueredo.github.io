import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { createBlogIndex, parsePost } from './blog-parser.js';

const validFrontmatter = {
	title: 'A dependable title',
	description: 'A useful description for readers.',
	date: '2026-09-01',
	lang: 'en',
	tags: ['Architecture', 'Laravel']
};

function postSource(overrides = {}, body = 'A short article body.') {
	const data = { ...validFrontmatter, ...overrides };
	const lines = ['---'];

	for (const [key, value] of Object.entries(data)) {
		if (value === undefined) continue;
		if (Array.isArray(value)) lines.push(`${key}: [${value.map((item) => JSON.stringify(item)).join(', ')}]`);
		else lines.push(`${key}: ${JSON.stringify(value)}`);
	}

	return `${lines.join('\n')}\n---\n\n${body}\n`;
}

/** @param {Record<string, string>} files */
async function temporaryPosts(files) {
	const directory = await mkdtemp(path.join(tmpdir(), 'portfolio-blog-'));

	for (const [relativePath, source] of Object.entries(files)) {
		const destination = path.join(directory, relativePath);
		await mkdir(path.dirname(destination), { recursive: true });
		await writeFile(destination, source, 'utf8');
	}

	return directory;
}

test('parses frontmatter and renders safe Markdown with stable unique heading ids', () => {
	const source = postSource(
		{ translationKey: 'architecture' },
		[
			'## Domain boundaries',
			'## Domain boundaries',
			'',
			'| Layer | Role |',
			'| --- | --- |',
			'| API | Entry point |',
			'',
			'```js',
			'const ready = true;',
			'```',
			'',
			'<script>alert("unsafe")</script>',
			'<a href="javascript:alert(1)">bad link</a>'
		].join('\n')
	);

	const post = parsePost(source, 'domain-boundaries.en.md');

	assert.deepEqual(post.toc, [
		{ id: 'domain-boundaries', text: 'Domain boundaries', level: 2 },
		{ id: 'domain-boundaries-2', text: 'Domain boundaries', level: 2 }
	]);
	assert.match(post.html, /<h2 id="domain-boundaries">/);
	assert.match(post.html, /<table>/);
	assert.match(post.html, /class="language-js"/);
	assert.doesNotMatch(post.html, /<script|javascript:/);
	assert.equal(post.slug, 'domain-boundaries');
	assert.equal(post.url, '/blog/en/domain-boundaries/');
	assert.equal(post.translationKey, 'architecture');
	assert.equal(post.readingTime, 1);
});

test('defaults translationKey to the filename slug', () => {
	const post = parsePost(postSource(), 'reliable-systems.en.md');

	assert.equal(post.translationKey, 'reliable-systems');
});

test('keeps generated heading ids unique when a heading already contains a numeric suffix', () => {
	const post = parsePost(
		postSource({}, ['## Hello', '## Hello', '## Hello 2'].join('\n')),
		'headings.en.md'
	);

	assert.deepEqual(
		post.toc.map(({ id }) => id),
		['hello', 'hello-2', 'hello-2-2']
	);
});

test('rejects malformed filenames and frontmatter fields', () => {
	/** @type {Array<[string, string, string, RegExp]>} */
	const cases = [
		['unsafe filename', postSource(), '../unsafe.en.md', /filename/i],
		['language mismatch', postSource(), 'post.pt.md', /language.*filename/i],
		['missing title', postSource({ title: undefined }), 'post.en.md', /title/i],
		['invalid date shape', postSource({ date: '09/01/2026' }), 'post.en.md', /date/i],
		['impossible date', postSource({ date: '2026-02-30' }), 'post.en.md', /date/i],
		['unsupported language', postSource({ lang: 'es' }), 'post.es.md', /filename/i],
		['empty tags', postSource({ tags: [] }), 'post.en.md', /tags/i],
		['invalid draft value', postSource({ draft: 'yes' }), 'post.en.md', /draft/i],
		['unsafe cover', postSource({ cover: 'javascript:alert(1)' }), 'post.en.md', /cover/i],
		['unknown field', postSource({ author: 'Someone' }), 'post.en.md', /unknown.*author/i]
	];

	for (const [name, source, filename, expected] of cases) {
		assert.throws(() => parsePost(source, filename), expected, name);
	}
});

test('discovers recursively, excludes drafts and future posts, and sorts newest first', async () => {
	const directory = await temporaryPosts({
		'older.en.md': postSource({ date: '2026-08-10' }),
		'nested/newer.en.md': postSource({ date: '2026-09-10' }),
		'draft.en.md': postSource({ date: '2026-09-12', draft: true }),
		'future.en.md': postSource({ date: '2026-09-19' })
	});
	const blog = await createBlogIndex({ directory, now: new Date('2026-09-18T12:00:00Z') });

	assert.deepEqual(
		blog.getPosts().map(({ slug }) => slug),
		['newer', 'older']
	);
	assert.equal(blog.getPost('en', 'draft'), null);
	assert.equal(blog.getPost('en', 'future'), null);
	assert.equal(blog.getPost('../en', 'older'), null);
});

test('returns translation links only for published matching translation keys', async () => {
	const directory = await temporaryPosts({
		'architecture.en.md': postSource({ translationKey: 'architecture' }),
		'arquitetura.pt.md': postSource({ lang: 'pt', translationKey: 'architecture' }),
		'draft-translation.pt.md': postSource({
			lang: 'pt',
			translationKey: 'standalone',
			draft: true
		}),
		'standalone.en.md': postSource({ translationKey: 'standalone' })
	});
	const blog = await createBlogIndex({ directory, now: new Date('2026-09-18T12:00:00Z') });

	const architecture = blog.getPost('en', 'architecture');
	const standalone = blog.getPost('en', 'standalone');
	assert.ok(architecture);
	assert.ok(standalone);
	assert.deepEqual(architecture.translations, {
		en: '/blog/en/architecture/',
		pt: '/blog/pt/arquitetura/'
	});
	assert.deepEqual(standalone.translations, {
		en: '/blog/en/standalone/'
	});
	assert.equal('html' in blog.getPosts()[0], false);
});

test('rejects duplicate localized slugs and duplicate localized translation keys', async () => {
	const duplicateSlugDirectory = await temporaryPosts({
		'one/shared.en.md': postSource({ translationKey: 'first' }),
		'two/shared.en.md': postSource({ translationKey: 'second' })
	});
	const duplicateTranslationDirectory = await temporaryPosts({
		'first.en.md': postSource({ translationKey: 'shared' }),
		'second.en.md': postSource({ translationKey: 'shared' })
	});

	await assert.rejects(
		createBlogIndex({ directory: duplicateSlugDirectory }),
		/duplicate.*en\/shared/i
	);
	await assert.rejects(
		createBlogIndex({ directory: duplicateTranslationDirectory }),
		/duplicate.*translation.*en\/shared/i
	);
});

test('returns an empty table of contents for articles without headings', () => {
	const post = parsePost(postSource({}, 'Only a paragraph, no headings at all.'), 'plain.en.md');

	assert.deepEqual(post.toc, []);
	assert.match(post.html, /<p>Only a paragraph/);
});
