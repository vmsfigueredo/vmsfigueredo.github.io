import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { appendBlogSitemap } from '../src/lib/server/blog-output.js';
import { getPosts } from '../src/lib/server/blog.js';

const sitemapPath = path.resolve('build/sitemap.xml');
const sitemap = await readFile(sitemapPath, 'utf8');
const output = appendBlogSitemap(sitemap, await getPosts());

await writeFile(sitemapPath, output, 'utf8');
