<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { translationTarget } from '$lib/blog/format.js';
	import { t, locale } from '$lib/i18n/index.js';

	function toggle() {
		const next = $locale === 'en' ? 'pt' : 'en';
		locale.set(next);

		// On an article, follow the translation (or fall back to the blog index).
		const post = page.data?.post;
		if (post && post.lang !== next) goto(translationTarget(post.translations, next));
	}
</script>

<button
	type="button"
	onclick={toggle}
	aria-label={$t.lang.toggle}
	title={$t.lang.toggle}
	class="inline-flex h-9 items-center gap-1 rounded-full border border-border px-3 text-xs font-semibold text-muted-2 transition-colors hover:border-border-strong"
>
	<span class={$locale === 'pt' ? 'text-fg' : ''}>PT</span>
	<span aria-hidden="true" class="text-border-strong">/</span>
	<span class={$locale === 'en' ? 'text-fg' : ''}>EN</span>
</button>
