<script>
	import '../app.css';
	import { page } from '$app/state';
	import Nav from '$lib/components/Nav.svelte';
	import { t, locale } from '$lib/i18n/index.js';

	/** @type {{ children?: import('svelte').Snippet }} */
	let { children } = $props();

	const isTroco = $derived(page.url.pathname === '/troco' || page.url.pathname.startsWith('/troco/'));

	const SITE = 'https://vitorfigueredo.dev';
	const OG_IMAGE = `${SITE}/og.png`;

	const jsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Vitor Marileu S. de Figueredo Filho',
		alternateName: 'Vitor Figueredo',
		url: SITE,
		image: OG_IMAGE,
		email: 'mailto:me@vitorfigueredo.dev',
		jobTitle: 'Tech Lead & Senior Full Stack Developer',
		sameAs: ['https://www.linkedin.com/in/vmsfigueredo/'],
		knowsAbout: ['PHP', 'Laravel', 'ReactJS', '.NET', 'Software Architecture', 'Full Stack Development']
	});
</script>

<svelte:head>
	{#if !isTroco}
	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
	<title>{$t.meta.title}</title>
	<meta name="description" content={$t.meta.description} />
	<link rel="canonical" href={SITE} />
	<meta property="og:title" content={$t.meta.title} />
	<meta property="og:description" content={$t.meta.description} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={SITE} />
	<meta property="og:image" content={OG_IMAGE} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:locale" content={$locale === 'pt' ? 'pt_BR' : 'en_US'} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={$t.meta.title} />
	<meta name="twitter:description" content={$t.meta.description} />
	<meta name="twitter:image" content={OG_IMAGE} />
	{@html `<script type="application/ld+json">${jsonLd}</scr` + `ipt>`}
	<link
		rel="preconnect"
		href="https://fonts.googleapis.com"
	/>
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap"
		rel="stylesheet"
	/>
	{/if}
</svelte:head>

<div class="relative z-10">
	{#if !isTroco}
		<Nav />
	{/if}
	<main>
		{@render children?.()}
	</main>
</div>
