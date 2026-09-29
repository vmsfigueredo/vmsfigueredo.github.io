<script>
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { contact } from '$lib/data.js';
	import { t, locale } from '$lib/i18n/index.js';
	import Icon from './Icon.svelte';
	import LangToggle from './LangToggle.svelte';
	import ThemeToggle from './ThemeToggle.svelte';

	let open = $state(false);
	afterNavigate(() => (open = false));

	const links = $derived([
		{ href: '/#about', label: $t.nav.about, active: false },
		{ href: '/#projects', label: $t.nav.projects, active: false },
		{ href: '/#experience', label: $t.nav.experience, active: false },
		{ href: '/blog/', label: $t.nav.blog, active: page.url.pathname.startsWith('/blog') },
		{ href: '/#contact', label: $t.nav.contact, active: false }
	]);
	const resumeHref = $derived(encodeURI(contact.resume[$locale]));
</script>

<svelte:window
	onkeydown={(event) => {
		if (event.key === 'Escape') open = false;
	}}
/>

<header class="sticky top-0 z-50 border-b border-border bg-bg/85 backdrop-blur-md">
	<nav
		aria-label={$t.a11y.primaryNav}
		class="mx-auto flex h-[68px] max-w-6xl items-center justify-between gap-4 px-6"
	>
		<a href="/" class="flex shrink-0 items-center gap-2.5 text-[17px] font-bold tracking-tight whitespace-nowrap text-fg">
			<span class="h-2.5 w-2.5 rounded-full bg-accent" aria-hidden="true"></span>
			Vitor Figueredo
		</a>

		<ul class="hidden items-center gap-1 md:flex">
			{#each links as link (link.href)}
				<li>
					<a
						href={link.href}
						aria-current={link.active ? 'page' : undefined}
						class="rounded-lg px-3 py-2 text-sm font-medium transition-colors {link.active
							? 'bg-bg-alt text-fg'
							: 'text-muted hover:bg-bg-alt hover:text-fg'}"
					>
						{link.label}
					</a>
				</li>
			{/each}
		</ul>

		<div class="flex items-center gap-2">
			<LangToggle />
			<ThemeToggle />
			<a
				href={resumeHref}
				target="_blank"
				rel="noopener"
				class="hidden h-9 items-center gap-2 rounded-lg border border-border bg-surface px-3.5 text-[13px] font-semibold text-fg transition-colors hover:bg-bg-alt sm:inline-flex"
			>
				<Icon name="download" size={15} />
				<span class="lg:hidden">{$t.nav.resumeShort}</span>
				<span class="hidden lg:inline">{$t.nav.resume}</span>
			</a>
			<button
				type="button"
				class="grid h-9 w-9 place-items-center rounded-lg border border-border text-fg md:hidden"
				aria-expanded={open}
				aria-controls="mobile-menu"
				aria-label={open ? $t.a11y.closeMenu : $t.a11y.menu}
				onclick={() => (open = !open)}
			>
				<Icon name={open ? 'close' : 'menu'} size={18} />
			</button>
		</div>
	</nav>

	{#if open}
		<div id="mobile-menu" class="border-t border-border bg-bg px-6 pt-2 pb-5 md:hidden">
			<ul class="flex flex-col">
				{#each links as link (link.href)}
					<li>
						<a
							href={link.href}
							onclick={() => (open = false)}
							aria-current={link.active ? 'page' : undefined}
							class="block border-b border-border py-3 text-[15px] font-medium text-fg"
						>
							{link.label}
						</a>
					</li>
				{/each}
			</ul>
			<a
				href={resumeHref}
				target="_blank"
				rel="noopener"
				class="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-accent text-sm font-semibold text-on-accent"
			>
				<Icon name="download" size={16} />
				{$t.nav.resume}
			</a>
		</div>
	{/if}
</header>
