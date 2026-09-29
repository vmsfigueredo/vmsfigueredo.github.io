<script>
	import { untrack } from 'svelte';
	import { get } from 'svelte/store';
	import { formatPostDate } from '$lib/blog/format.js';
	import Icon from '$lib/components/Icon.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import Toc from '$lib/components/Toc.svelte';
	import { locale } from '$lib/i18n/index.js';
	import { translations } from '$lib/i18n/translations.js';
	import { btnGhost, btnPrimary, btnSm, chip } from '$lib/ui.js';

	/** @type {{ data: { post: import('$lib/server/blog-parser.js').DetailedPost } }} */
	let { data } = $props();

	const SITE = 'https://vitorfigueredo.dev';
	const post = $derived(data.post);
	// The article chrome follows the article's language, not the site toggle.
	const copy = $derived(translations[post.lang].blog);
	const otherLang = $derived(post.lang === 'pt' ? 'en' : 'pt');
	const translationUrl = $derived(post.translations[otherLang]);
	const tocItems = $derived(post.toc.filter((item) => item.level === 2 || item.level === 3));
	const alternates = $derived(
		Object.entries(post.translations).map(([lang, href]) => ({
			hreflang: lang === 'pt' ? 'pt-BR' : 'en',
			href: /** @type {string} */ (href)
		}))
	);
	const jsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: post.title,
		description: post.description,
		datePublished: post.date,
		inLanguage: post.lang === 'pt' ? 'pt-BR' : 'en',
		url: SITE + post.url,
		mainEntityOfPage: SITE + post.url,
		image: SITE + (post.cover ?? '/og.png'),
		keywords: post.tags.join(', '),
		author: { '@type': 'Person', name: 'Vitor Figueredo', url: SITE }
	});

	// Opening an article switches the site language to the article's language.
	$effect(() => {
		const lang = post.lang;
		untrack(() => {
			if (get(locale) !== lang) locale.set(lang);
		});
	});

	let copied = $state(false);
	async function copyLink() {
		try {
			await navigator.clipboard.writeText(SITE + post.url);
			copied = true;
			setTimeout(() => (copied = false), 1800);
		} catch {
			/* clipboard blocked: the address bar still has the link */
		}
	}
</script>

<Seo
	title="{post.title} — Vitor Figueredo"
	description={post.description}
	path={post.url}
	type="article"
	ogLocale={post.lang === 'pt' ? 'pt_BR' : 'en_US'}
	image={post.cover}
	publishedTime={post.date}
	{alternates}
	{jsonLd}
/>

{#key post.url}
	<article lang={post.lang === 'pt' ? 'pt-BR' : 'en'} class="mx-auto max-w-6xl px-6 pb-20">
		<header class="mx-auto max-w-3xl pt-10 pb-8 sm:pt-14">
			<a
				href="/blog/"
				class="inline-flex items-center gap-1.5 text-sm font-medium text-muted-2 transition-colors hover:text-accent"
			>
				<Icon name="arrow-left" size={15} />
				{copy.back}
			</a>
			<ul class="mt-5 flex flex-wrap gap-1.5">
				{#each post.tags as tag (tag)}
					<li class={chip}>{tag}</li>
				{/each}
			</ul>
			<h1
				class="mt-4 text-[32px] leading-[1.12] font-extrabold tracking-[-0.03em] text-balance text-fg sm:text-[44px]"
			>
				{post.title}
			</h1>
			<p class="mt-3.5 text-lg leading-relaxed text-muted sm:text-[19px]">{post.description}</p>
			<div class="mt-6 flex flex-wrap items-center gap-3 border-y border-border py-4 text-sm">
				<img
					src="/vitor-avatar.webp"
					alt=""
					width="40"
					height="40"
					class="h-10 w-10 rounded-full object-cover"
				/>
				<div>
					<p class="font-semibold text-fg">Vitor Figueredo</p>
					<p class="text-xs text-muted-2">
						<time datetime={post.date}>{formatPostDate(post.date, post.lang, 'long')}</time>
						· {copy.readingTime.replace('{n}', String(post.readingTime))}
					</p>
				</div>
				{#if translationUrl}
					<a
						href={translationUrl}
						hreflang={otherLang === 'pt' ? 'pt-BR' : 'en'}
						lang={otherLang === 'pt' ? 'pt-BR' : 'en'}
						class="ml-auto inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent hover:text-accent-hover"
					>
						{translations[otherLang].blog.readIn}
						<Icon name="arrow-right" size={14} />
					</a>
				{/if}
			</div>
		</header>

		{#if post.cover}
			<img
				src={post.cover}
				alt=""
				class="mx-auto mb-10 aspect-[2/1] w-full max-w-4xl rounded-2xl object-cover"
			/>
		{/if}

		<div
			class="mx-auto {tocItems.length
				? 'grid max-w-5xl gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16'
				: 'max-w-3xl'}"
		>
			{#if tocItems.length}
				<aside class="border-b border-border pb-6 lg:sticky lg:top-24 lg:self-start lg:border-0 lg:pb-0">
					<Toc items={tocItems} title={copy.onThisPage} />
				</aside>
			{/if}
			<div class="article-body min-w-0">
				{@html post.html}
			</div>
		</div>

		<footer class="mx-auto mt-14 max-w-3xl">
			<div class="flex items-center gap-4 rounded-2xl border border-border bg-bg-alt p-5">
				<img
					src="/vitor-avatar.webp"
					alt=""
					width="56"
					height="56"
					class="h-14 w-14 shrink-0 rounded-full object-cover"
				/>
				<div>
					<p class="font-bold text-fg">Vitor Figueredo</p>
					<p class="mt-1 text-sm leading-relaxed text-muted">{copy.authorBio}</p>
				</div>
			</div>
			<div
				class="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-7"
			>
				<p class="text-[15px] text-muted">{copy.endNote}</p>
				<div class="flex flex-wrap gap-2.5">
					<button type="button" onclick={copyLink} class="{btnGhost} {btnSm}">
						<Icon name={copied ? 'check' : 'link'} size={15} />
						{copied ? copy.linkCopied : copy.copyLink}
					</button>
					<a href="/#contact" class="{btnPrimary} {btnSm}">{copy.contact}</a>
				</div>
			</div>
		</footer>
	</article>
{/key}
