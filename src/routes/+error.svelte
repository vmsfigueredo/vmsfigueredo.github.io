<script>
	import { page } from '$app/state';
	import Icon from '$lib/components/Icon.svelte';
	import { t } from '$lib/i18n/index.js';
	import { btnGhost, btnMd, btnPrimary, kicker } from '$lib/ui.js';
</script>

<svelte:head>
	<title>{page.status} — Vitor Figueredo</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="mx-auto max-w-6xl px-6 py-24 sm:py-32">
	<p class={kicker}>{page.status}</p>
	<h1 class="mt-3 text-4xl font-extrabold tracking-[-0.03em] text-fg sm:text-5xl">
		{page.status === 404 ? $t.errors.notFound : $t.errors.generic}
	</h1>
	<p class="mt-4 max-w-lg text-lg text-muted">{$t.errors.lead}</p>
	<div class="mt-8 flex flex-wrap gap-3">
		<a href="/" class="{btnPrimary} {btnMd}"><Icon name="arrow-left" size={16} />{$t.errors.home}</a>
		<a href="/blog/" class="{btnGhost} {btnMd}">{$t.errors.blog}</a>
	</div>
</section>
