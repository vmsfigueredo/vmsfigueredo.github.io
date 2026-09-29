import { error } from '@sveltejs/kit';

import { getPost, getPosts } from '$lib/server/blog.js';

export async function entries() {
	return (await getPosts()).map(({ lang, slug }) => ({ lang, slug }));
}

export async function load({ params }) {
	const post = await getPost(params.lang, params.slug);
	if (!post) error(404, 'Article not found');

	return { post };
}
