import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

import { Marked, Renderer, TextRenderer } from 'marked';
import sanitizeHtml from 'sanitize-html';
import YAML from 'yaml';

const POST_FILENAME = /^([a-z0-9]+(?:-[a-z0-9]+)*)\.(en|pt)\.md$/;
const SAFE_KEY = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE = /^(\d{4})-(\d{2})-(\d{2})$/;
const ALLOWED_FIELDS = new Set([
	'title',
	'description',
	'date',
	'lang',
	'tags',
	'translationKey',
	'draft',
	'cover'
]);

/**
 * @typedef {'en' | 'pt'} BlogLanguage
 * @typedef {{title: string, description: string, date: string, lang: BlogLanguage, slug: string, tags: string[], readingTime: number, translationKey: string, cover?: string, url: string}} BlogMetadata
 * @typedef {BlogMetadata & {html: string, toc: Array<{id: string, text: string, level: number}>, draft: boolean}} ParsedPost
 * @typedef {BlogMetadata & {html: string, toc: Array<{id: string, text: string, level: number}>, translations: Partial<Record<BlogLanguage, string>>}} DetailedPost
 */

/** @param {unknown} value @param {string} field @returns {string} */
function assertText(value, field) {
	if (typeof value !== 'string' || value.trim() === '') {
		throw new Error(`Frontmatter field "${field}" must be a non-empty string`);
	}

	return value.trim();
}

/** @param {unknown} value @returns {string} */
function validateDate(value) {
	const date = assertText(value, 'date');
	const match = DATE.exec(date);
	if (!match) throw new Error('Frontmatter field "date" must use YYYY-MM-DD');

	const [, year, month, day] = match;
	const parsed = new Date(`${date}T00:00:00.000Z`);
	if (
		Number.isNaN(parsed.getTime()) ||
		parsed.getUTCFullYear() !== Number(year) ||
		parsed.getUTCMonth() + 1 !== Number(month) ||
		parsed.getUTCDate() !== Number(day)
	) {
		throw new Error(`Frontmatter field "date" is not a valid calendar date: ${date}`);
	}

	return date;
}

/** @param {unknown} value @returns {string | undefined} */
function validateCover(value) {
	if (value === undefined) return undefined;
	const cover = assertText(value, 'cover');

	if (!/^\/(?!\/)[^\s]*$/.test(cover) && !/^https:\/\/[^\s]+$/i.test(cover)) {
		throw new Error('Frontmatter field "cover" must be a root-relative path or HTTPS URL');
	}

	return cover;
}

/** @param {string} value */
function headingId(value) {
	return (
		value
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.toLowerCase()
			.replace(/&[a-z]+;/gi, '')
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-+|-+$/g, '') || 'section'
	);
}

/** @param {string} markdown */
function renderMarkdown(markdown) {
	/** @type {Array<{id: string, text: string, level: number}>} */
	const toc = [];
	const ids = new Set();
	const renderer = new Renderer();
	const textRenderer = new TextRenderer();

	renderer.heading = function ({ tokens, depth }) {
		const inlineHtml = this.parser.parseInline(tokens);
		const text = this.parser.parseInline(tokens, textRenderer).replace(/\s+/g, ' ').trim();
		const base = headingId(text);
		let id = base;
		let suffix = 2;
		while (ids.has(id)) id = `${base}-${suffix++}`;
		ids.add(id);
		toc.push({ id, text, level: depth });

		return `<h${depth} id="${id}">${inlineHtml}</h${depth}>\n`;
	};

	const marked = new Marked({ gfm: true, renderer });
	const unsafeHtml = marked.parse(markdown);
	if (typeof unsafeHtml !== 'string') throw new Error('Markdown rendering must be synchronous');

	const html = sanitizeHtml(unsafeHtml, {
		allowedTags: [...sanitizeHtml.defaults.allowedTags, 'img'],
		allowedAttributes: {
			...sanitizeHtml.defaults.allowedAttributes,
			a: ['href', 'name', 'target', 'title'],
			code: ['class'],
			h1: ['id'],
			h2: ['id'],
			h3: ['id'],
			h4: ['id'],
			h5: ['id'],
			h6: ['id'],
			img: ['src', 'alt', 'title', 'width', 'height', 'loading']
		},
		allowedSchemes: ['http', 'https', 'mailto'],
		allowedSchemesByTag: { img: ['https'] },
		allowProtocolRelative: false
	});

	return { html, toc };
}

/** @param {string} markdown */
function readingTime(markdown) {
	const words = markdown
		.replace(/```[\s\S]*?```/g, ' ')
		.replace(/<[^>]+>/g, ' ')
		.match(/[\p{L}\p{N}]+(?:['’_-][\p{L}\p{N}]+)*/gu)?.length;

	return Math.max(1, Math.ceil((words ?? 0) / 200));
}

/**
 * Parse one authored Markdown file. The filename is the canonical slug/locale source.
 *
 * @param {string} source
 * @param {string} filename
 * @returns {ParsedPost}
 */
export function parsePost(source, filename) {
	if (path.basename(filename) !== filename) {
		throw new Error(`Invalid post filename: ${filename}`);
	}

	const filenameMatch = POST_FILENAME.exec(filename);
	if (!filenameMatch) {
		throw new Error(`Invalid post filename "${filename}"; expected <safe-slug>.<en|pt>.md`);
	}

	const frontmatterMatch = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)([\s\S]*)$/.exec(source);
	if (!frontmatterMatch) throw new Error(`${filename}: missing valid YAML frontmatter`);

	let data;
	try {
		data = YAML.parse(frontmatterMatch[1]);
	} catch (error) {
		throw new Error(`${filename}: invalid YAML frontmatter`, { cause: error });
	}

	if (!data || typeof data !== 'object' || Array.isArray(data)) {
		throw new Error(`${filename}: frontmatter must be a YAML mapping`);
	}

	for (const field of Object.keys(data)) {
		if (!ALLOWED_FIELDS.has(field)) throw new Error(`${filename}: unknown frontmatter field "${field}"`);
	}

	const [, slug, filenameLang] = filenameMatch;
	const title = assertText(data.title, 'title');
	const description = assertText(data.description, 'description');
	const date = validateDate(data.date);
	const lang = assertText(data.lang, 'lang');

	if (lang !== 'en' && lang !== 'pt') {
		throw new Error(`${filename}: frontmatter language must be "en" or "pt"`);
	}
	if (lang !== filenameLang) {
		throw new Error(`${filename}: frontmatter language must match filename language "${filenameLang}"`);
	}

	if (!Array.isArray(data.tags) || data.tags.length === 0) {
		throw new Error('Frontmatter field "tags" must be a non-empty array');
	}
	const tags = data.tags.map((/** @type {unknown} */ tag) => assertText(tag, 'tags'));

	const translationKey = data.translationKey === undefined
		? slug
		: assertText(data.translationKey, 'translationKey');
	if (!SAFE_KEY.test(translationKey)) {
		throw new Error('Frontmatter field "translationKey" must be a safe lowercase slug');
	}

	if (data.draft !== undefined && typeof data.draft !== 'boolean') {
		throw new Error('Frontmatter field "draft" must be a boolean');
	}

	const body = frontmatterMatch[2].trim();
	if (!body) throw new Error(`${filename}: article body must not be empty`);
	const { html, toc } = renderMarkdown(body);
	const cover = validateCover(data.cover);

	return {
		title,
		description,
		date,
		lang,
		slug,
		tags,
		readingTime: readingTime(body),
		translationKey,
		...(cover ? { cover } : {}),
		url: `/blog/${lang}/${slug}/`,
		html,
		toc,
		draft: data.draft ?? false
	};
}

/** @param {string} directory @returns {Promise<string[]>} */
async function markdownFiles(directory) {
	const entries = await readdir(directory, { withFileTypes: true });
	/** @type {string[][]} */
	const nested = await Promise.all(
		entries.map(async (entry) => {
			const entryPath = path.join(directory, entry.name);
			if (entry.isDirectory()) return markdownFiles(entryPath);
			return entry.isFile() && entry.name.endsWith('.md') ? [entryPath] : [];
		})
	);

	return nested.flat().sort();
}

/** @param {ParsedPost} post @returns {BlogMetadata} */
function metadata(post) {
	return {
		title: post.title,
		description: post.description,
		date: post.date,
		lang: post.lang,
		slug: post.slug,
		tags: [...post.tags],
		readingTime: post.readingTime,
		translationKey: post.translationKey,
		...(post.cover ? { cover: post.cover } : {}),
		url: post.url
	};
}

/**
 * Build and validate a deterministic index for one content directory.
 *
 * @param {{directory: string, now?: Date}} options
 */
export async function createBlogIndex({ directory, now = new Date() }) {
	const files = await markdownFiles(directory);
	const parsed = await Promise.all(
		files.map(async (file) => parsePost(await readFile(file, 'utf8'), path.basename(file)))
	);
	const localizedSlugs = new Set();
	const localizedTranslations = new Set();

	for (const post of parsed) {
		const localizedSlug = `${post.lang}/${post.slug}`;
		if (localizedSlugs.has(localizedSlug)) throw new Error(`Duplicate post slug: ${localizedSlug}`);
		localizedSlugs.add(localizedSlug);

		const localizedTranslation = `${post.lang}/${post.translationKey}`;
		if (localizedTranslations.has(localizedTranslation)) {
			throw new Error(`Duplicate localized translation key: ${localizedTranslation}`);
		}
		localizedTranslations.add(localizedTranslation);
	}

	const publicPosts = parsed
		.filter((post) => !post.draft && new Date(`${post.date}T00:00:00.000Z`) <= now)
		.sort((left, right) => right.date.localeCompare(left.date) || left.lang.localeCompare(right.lang));
	const postsByPath = new Map(publicPosts.map((post) => [`${post.lang}/${post.slug}`, post]));
	/** @type {Map<string, Partial<Record<BlogLanguage, string>>>} */
	const translationsByKey = new Map();

	for (const post of publicPosts) {
		const translations = translationsByKey.get(post.translationKey) ?? {};
		translations[post.lang] = post.url;
		translationsByKey.set(post.translationKey, translations);
	}

	return {
		getPosts() {
			return publicPosts.map(metadata);
		},
		/** @param {string} lang @param {string} slug @returns {DetailedPost | null} */
		getPost(lang, slug) {
			if (!['en', 'pt'].includes(lang) || !SAFE_KEY.test(slug)) return null;
			const post = postsByPath.get(`${lang}/${slug}`);
			if (!post) return null;

			return {
				...metadata(post),
				html: post.html,
				toc: post.toc.map((heading) => ({ ...heading })),
				translations: { ...translationsByKey.get(post.translationKey) }
			};
		}
	};
}
