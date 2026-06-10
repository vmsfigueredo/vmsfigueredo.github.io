<script>
	import { t, locale, toggleLocale } from '$lib/i18n/index.js';
	import { theme, cycleTheme } from '$lib/theme/index.js';

	let open = $state(false);

	const themeIcon = { system: '🖥️', light: '☀️', dark: '🌙' };
	const themeLabel = { system: 'System', light: 'Light', dark: 'Dark' };

	const links = [
		{ href: '#home', key: 'home' },
		{ href: '#about', key: 'about' },
		{ href: '#projects', key: 'projects' },
		{ href: '#experience', key: 'experience' },
		{ href: '#contact', key: 'contact' }
	];

	function close() {
		open = false;
	}
</script>

<header
	class="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-bg/80 backdrop-blur supports-[backdrop-filter]:bg-bg/60"
>
	<nav class="mx-auto flex max-w-5xl items-center justify-between px-5 py-3.5">
		<a href="#home" class="group flex items-center gap-2 text-sm font-bold" onclick={close}>
			<span class="text-accent">~/</span><span class="text-fg">vitor</span><span
				class="text-fg-dim group-hover:text-accent">.dev</span
			>
		</a>

		<!-- desktop links -->
		<ul class="hidden items-center gap-1 sm:flex">
			{#each links as link (link.key)}
				<li>
					<a
						href={link.href}
						class="rounded px-3 py-1.5 text-sm text-fg-dim transition-colors hover:bg-bg-elev hover:text-accent"
					>
						<span class="text-accent">{'>'}</span>
						{$t.nav[link.key]}
					</a>
				</li>
			{/each}
		</ul>

		<div class="flex items-center gap-2">
			<button
				onclick={cycleTheme}
				class="flex items-center gap-1.5 rounded border border-border px-2.5 py-1.5 text-xs font-semibold text-fg-dim transition-colors hover:border-accent hover:text-accent"
				aria-label="Toggle theme (current: {themeLabel[$theme]})"
				title="Theme: {themeLabel[$theme]}"
			>
				<span>{themeIcon[$theme]}</span>
				<span class="hidden sm:inline">{themeLabel[$theme]}</span>
			</button>

			<button
				onclick={toggleLocale}
				class="flex items-center gap-1.5 rounded border border-border px-2.5 py-1.5 text-xs font-semibold text-fg-dim transition-colors hover:border-accent hover:text-accent"
				aria-label="Toggle language"
			>
				<span class={$locale === 'en' ? 'text-accent' : 'opacity-50'}>🇺🇸 EN</span>
				<span class="text-border">/</span>
				<span class={$locale === 'pt' ? 'text-accent' : 'opacity-50'}>🇧🇷 PT</span>
			</button>

			<!-- mobile toggle -->
			<button
				class="rounded border border-border p-1.5 text-fg-dim sm:hidden"
				onclick={() => (open = !open)}
				aria-label="Menu"
				aria-expanded={open}
			>
				{#if open}✕{:else}☰{/if}
			</button>
		</div>
	</nav>

	{#if open}
		<ul class="border-t border-border bg-bg-soft px-5 py-2 sm:hidden">
			{#each links as link (link.key)}
				<li>
					<a
						href={link.href}
						onclick={close}
						class="block py-2 text-sm text-fg-dim hover:text-accent"
					>
						<span class="text-accent">{'>'}</span>
						{$t.nav[link.key]}
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</header>
