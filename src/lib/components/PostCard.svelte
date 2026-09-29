<script>
	import { formatPostDate } from '$lib/blog/format.js';
	import { translations } from '$lib/i18n/translations.js';
	import { card, chip } from '$lib/ui.js';

	/** @type {{ post: import('$lib/blog/format.js').PostSummary, headingLevel?: 'h2' | 'h3' }} */
	let { post, headingLevel = 'h3' } = $props();

	const copy = $derived(translations[post.lang].blog);
</script>

<article class="{card} group relative flex w-full flex-col gap-3 p-6">
	<p class="flex flex-wrap items-center gap-x-2 text-xs font-medium text-muted-2">
		<span class="font-semibold text-accent">{post.tags[0]}</span>
		<time datetime={post.date}>{formatPostDate(post.date, post.lang)}</time>
		<span aria-hidden="true">·</span>
		<span>{copy.minutes.replace('{n}', String(post.readingTime))}</span>
	</p>
	<svelte:element this={headingLevel} class="text-lg leading-snug font-bold tracking-tight text-fg">
		<a href={post.url} class="transition-colors after:absolute after:inset-0 group-hover:text-accent">
			{post.title}
		</a>
	</svelte:element>
	<p class="text-sm leading-relaxed text-muted">{post.description}</p>
	<ul class="mt-auto flex flex-wrap gap-1.5 pt-1.5">
		{#each post.tags as tag (tag)}
			<li class={chip}>{tag}</li>
		{/each}
	</ul>
</article>
