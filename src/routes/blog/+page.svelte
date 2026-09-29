<script>
	import { availableTags, filterPosts } from '$lib/blog/format.js';
	import Icon from '$lib/components/Icon.svelte';
	import PostCard from '$lib/components/PostCard.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { t, locale } from '$lib/i18n/index.js';
	import { translations } from '$lib/i18n/translations.js';
	import { btnGhost, btnMd, kicker } from '$lib/ui.js';

	/** @type {{ data: { posts: import('$lib/blog/format.js').PostSummary[] } }} */
	let { data } = $props();

	let query = $state('');
	let selectedTag = $state('');

	const tags = $derived(availableTags(data.posts, $locale));
	// A tag picked in one language may not exist in the other: fall back to "All".
	const activeTag = $derived(tags.some(({ tag }) => tag === selectedTag) ? selectedTag : '');
	const inLanguage = $derived(data.posts.filter((post) => post.lang === $locale));
	const results = $derived(filterPosts(data.posts, { lang: $locale, tag: activeTag, query }));
	const otherLang = $derived($locale === 'pt' ? 'en' : 'pt');
	const otherCount = $derived(data.posts.length - inLanguage.length);
	const countLabel = $derived(
		(results.length === 1 ? $t.blog.countOne : $t.blog.countMany).replace(
			'{n}',
			String(results.length)
		)
	);

	/** @param {boolean} active */
	function tagClass(active) {
		return `rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors ${
			active
				? 'border-fg bg-fg text-bg'
				: 'border-border bg-surface text-muted hover:border-border-strong hover:text-fg'
		}`;
	}

	function clearFilters() {
		query = '';
		selectedTag = '';
	}
</script>

<Seo
	title={$t.blog.metaTitle}
	description={$t.blog.lead}
	path="/blog/"
	ogLocale={$locale === 'pt' ? 'pt_BR' : 'en_US'}
/>

<header class="border-b border-border">
	<div class="mx-auto max-w-6xl px-6 pt-14 pb-10 sm:pt-[72px]">
		<p class={kicker}>{$t.blog.kicker}</p>
		<h1 class="mt-2 text-4xl font-extrabold tracking-[-0.03em] text-balance text-fg sm:text-[44px]">
			{$t.blog.title}
		</h1>
		<p class="mt-3 max-w-xl text-[17px] leading-relaxed text-muted">{$t.blog.lead}</p>
	</div>
</header>

<div class="mx-auto max-w-6xl px-6 pb-20">
	{#if inLanguage.length}
		<div class="flex flex-wrap items-center justify-between gap-4 pt-7">
			<label
				class="flex w-full min-w-0 items-center gap-2.5 rounded-[10px] border border-border bg-surface px-3.5 py-2.5 text-muted-2 focus-within:border-accent sm:w-80"
			>
				<Icon name="search" size={16} />
				<span class="sr-only">{$t.blog.search}</span>
				<input
					type="search"
					bind:value={query}
					placeholder={$t.blog.searchPlaceholder}
					class="w-full min-w-0 bg-transparent text-sm text-fg outline-none placeholder:text-muted-2"
				/>
			</label>
			<div role="group" aria-label={$t.blog.filterLabel} class="flex flex-wrap gap-1.5">
				<button
					type="button"
					aria-pressed={activeTag === ''}
					onclick={() => (selectedTag = '')}
					class={tagClass(activeTag === '')}
				>
					{$t.blog.all}
				</button>
				{#each tags as { tag } (tag)}
					<button
						type="button"
						aria-pressed={activeTag === tag}
						onclick={() => (selectedTag = tag)}
						class={tagClass(activeTag === tag)}
					>
						{tag}
					</button>
				{/each}
			</div>
		</div>
	{/if}

	<p class="mt-5 mb-5 text-[13px] text-muted-2" aria-live="polite">
		{#if inLanguage.length}{countLabel}{/if}
		{#if otherCount}
			{#if inLanguage.length}<span aria-hidden="true"> · </span>{/if}
			<button
				type="button"
				lang={otherLang === 'pt' ? 'pt-BR' : 'en'}
				onclick={() => locale.set(otherLang)}
				class="font-semibold text-accent hover:underline"
			>
				{translations[otherLang].blog.switchHere.replace('{n}', String(otherCount))}
			</button>
		{/if}
	</p>

	{#if results.length}
		<div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
			{#each results as post (post.url)}
				<div class="flex"><PostCard {post} headingLevel="h2" /></div>
			{/each}
		</div>
	{:else if inLanguage.length}
		<div class="rounded-2xl border border-dashed border-border-strong px-6 py-16 text-center">
			<p class="font-semibold text-fg">{$t.blog.empty}</p>
			<button type="button" onclick={clearFilters} class="{btnGhost} {btnMd} mt-5">
				{$t.blog.clear}
			</button>
		</div>
	{:else}
		<div class="rounded-2xl border border-dashed border-border-strong px-6 py-16 text-center">
			<p class="font-semibold text-fg">{$t.blog.noneInLang}</p>
		</div>
	{/if}
</div>
