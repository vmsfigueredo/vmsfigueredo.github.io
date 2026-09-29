<script>
	import { reveal } from '$lib/actions/reveal.js';
	import { latestPosts } from '$lib/blog/format.js';
	import { t, locale } from '$lib/i18n/index.js';
	import { btnGhost, btnMd } from '$lib/ui.js';
	import Icon from './Icon.svelte';
	import PostCard from './PostCard.svelte';
	import SectionHeading from './SectionHeading.svelte';

	/** @type {{ posts: import('$lib/blog/format.js').PostSummary[] }} */
	let { posts } = $props();

	const latest = $derived(latestPosts(posts, $locale, 3));
</script>

{#if latest.length}
	<section id="writing" aria-labelledby="writing-title" class="border-y border-border bg-bg-alt py-20">
		<div class="mx-auto max-w-6xl px-6">
			<div class="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
				<SectionHeading
					id="writing-title"
					kicker={$t.writing.kicker}
					title={$t.writing.title}
					lead={$t.writing.lead}
				/>
				<a href="/blog/" class="{btnGhost} {btnMd} shrink-0">
					{$t.writing.all}
					<Icon name="arrow-right" size={15} />
				</a>
			</div>
			<div class="grid gap-5 md:grid-cols-3">
				{#each latest as post, index (post.url)}
					<div use:reveal={{ delay: index * 80 }} class="flex">
						<PostCard {post} />
					</div>
				{/each}
			</div>
		</div>
	</section>
{/if}
