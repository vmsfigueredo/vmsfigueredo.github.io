import { generateRssFeed } from '$lib/server/blog-output.js';
import { getPosts } from '$lib/server/blog.js';

export const prerender = true;

export async function GET() {
	return new Response(generateRssFeed(await getPosts()), {
		headers: {
			'content-type': 'application/rss+xml; charset=utf-8',
			'cache-control': 'public, max-age=3600'
		}
	});
}

