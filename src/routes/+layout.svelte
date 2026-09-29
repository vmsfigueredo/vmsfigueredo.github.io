<script>
	import '../app.css';
	import { page } from '$app/state';
	import Footer from '$lib/components/Footer.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import { t, initLocale } from '$lib/i18n/index.js';
	import { initTheme } from '$lib/theme/index.js';

	/** @type {{ children?: import('svelte').Snippet }} */
	let { children } = $props();

	// /troco is a standalone product page with its own design and head tags.
	const isTroco = $derived(page.url.pathname === '/troco' || page.url.pathname.startsWith('/troco/'));

	$effect(() => {
		if (isTroco) return;
		initTheme();
		initLocale(page.url.pathname);
	});
</script>

<svelte:head>
	{#if !isTroco}
		<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
		<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
		<meta name="theme-color" content="#0b1220" media="(prefers-color-scheme: dark)" />
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
		<link
			href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
			rel="stylesheet"
		/>
		<link rel="alternate" type="application/rss+xml" title="Vitor Figueredo — Blog" href="/feed.xml" />
	{/if}
</svelte:head>

{#if isTroco}
	<div class="relative z-10">
		<main>
			{@render children?.()}
		</main>
	</div>
{:else}
	<div class="site flex min-h-screen flex-col">
		<a
			href="#main"
			class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-on-accent"
		>
			{$t.a11y.skip}
		</a>
		<Nav />
		<main id="main" class="flex-1">
			{@render children?.()}
		</main>
		<Footer />
	</div>
{/if}
