import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';

import { createBlogIndex } from './blog-parser.js';

test('every committed article, drafts included, parses and links back to itself', async () => {
	const blog = await createBlogIndex({
		directory: path.resolve('content/posts'),
		includeDrafts: true
	});
	const posts = blog.getPosts();

	assert.ok(posts.length > 0, 'content/posts should hold at least one article');
	for (const post of posts) {
		const detailed = blog.getPost(post.lang, post.slug);
		assert.ok(detailed, `${post.url} should resolve`);
		assert.equal(detailed.translations[post.lang], post.url);
	}
});
