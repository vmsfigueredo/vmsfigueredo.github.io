<script>
	const SITE = 'https://vitorfigueredo.dev';
	const DEFAULT_IMAGE = '/og.png';

	/**
	 * @type {{
	 *   title: string,
	 *   description: string,
	 *   path: string,
	 *   type?: 'website' | 'article',
	 *   ogLocale?: string,
	 *   image?: string,
	 *   publishedTime?: string,
	 *   alternates?: Array<{ hreflang: string, href: string }>,
	 *   jsonLd?: Record<string, unknown>
	 * }}
	 */
	let {
		title,
		description,
		path,
		type = 'website',
		ogLocale = 'en_US',
		image,
		publishedTime,
		alternates = [],
		jsonLd
	} = $props();

	const url = $derived(SITE + path);
	const imagePath = $derived(image ?? DEFAULT_IMAGE);
	const imageUrl = $derived(imagePath.startsWith('http') ? imagePath : SITE + imagePath);
	const ld = $derived(
		jsonLd
			? `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</scr` +
					'ipt>'
			: ''
	);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />
	{#each alternates as alternate (alternate.hreflang)}
		<link rel="alternate" hreflang={alternate.hreflang} href={SITE + alternate.href} />
	{/each}
	<meta property="og:site_name" content="Vitor Figueredo" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content={type} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={imageUrl} />
	{#if imagePath === DEFAULT_IMAGE}
		<meta property="og:image:width" content="1200" />
		<meta property="og:image:height" content="630" />
	{/if}
	<meta property="og:image:alt" content={title} />
	<meta property="og:locale" content={ogLocale} />
	{#if publishedTime}
		<meta property="article:published_time" content={publishedTime} />
	{/if}
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={imageUrl} />
	{@html ld}
</svelte:head>
