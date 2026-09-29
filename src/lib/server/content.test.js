import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';

import { createBlogIndex } from './blog-parser.js';

test('every committed article parses and links back to itself through its translations', async () => {
	const blog = await createBlogIndex({ directory: path.resolve('content/posts') });
	const posts = blog.getPosts();

	assert.ok(posts.length > 0, 'content/posts should hold at least one published article');
	for (const post of posts) {
		const detailed = blog.getPost(post.lang, post.slug);
		assert.ok(detailed, `${post.url} should resolve`);
		assert.equal(detailed.translations[post.lang], post.url);
	}
});
