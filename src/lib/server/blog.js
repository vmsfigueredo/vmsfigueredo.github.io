import path from 'node:path';

import { createBlogIndex } from './blog-parser.js';

/** @typedef {import('./blog-parser.js').BlogMetadata} BlogMetadata */
/** @typedef {import('./blog-parser.js').DetailedPost} DetailedPost */

const directory = path.resolve(process.cwd(), 'content/posts');
const index = createBlogIndex({ directory });

/** @returns {Promise<BlogMetadata[]>} */
export async function getPosts() {
	return (await index).getPosts();
}

/** @param {string} lang @param {string} slug @returns {Promise<DetailedPost | null>} */
export async function getPost(lang, slug) {
	return (await index).getPost(lang, slug);
}
