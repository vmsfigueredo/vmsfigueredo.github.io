<script>
	import { t } from '$lib/i18n/index.js';
	import Icon from './Icon.svelte';

	const year = new Date().getFullYear();
</script>

<footer class="border-t border-border">
	<div
		class="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-[13px] text-muted-2 sm:flex-row sm:items-center sm:justify-between"
	>
		<p>© {year} Vitor Figueredo</p>
		<p class="flex flex-wrap items-center gap-x-4 gap-y-2">
			<span>{$t.footer.location}</span>
			<a href="/feed.xml" class="inline-flex items-center gap-1.5 transition-colors hover:text-accent">
				<Icon name="rss" size={14} />RSS
			</a>
		</p>
	</div>
</footer>
