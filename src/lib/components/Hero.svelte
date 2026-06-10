<script>
	import { t, locale } from '$lib/i18n/index.js';
	import { contact } from '$lib/data.js';
	import TerminalWindow from './TerminalWindow.svelte';
	import { onMount } from 'svelte';

	let roleText = $state('');
	let roleIndex = $state(0);
	let charIndex = $state(0);
	let deleting = $state(false);

	// Typewriter cycling through localized roles.
	$effect(() => {
		const roles = $t.hero.roles;
		let timer;

		function tick() {
			const full = roles[roleIndex % roles.length];
			if (!deleting) {
				charIndex++;
				roleText = full.slice(0, charIndex);
				if (charIndex >= full.length) {
					deleting = true;
					timer = setTimeout(tick, 1600);
					return;
				}
			} else {
				charIndex--;
				roleText = full.slice(0, charIndex);
				if (charIndex <= 0) {
					deleting = false;
					roleIndex++;
				}
			}
			timer = setTimeout(tick, deleting ? 45 : 90);
		}

		timer = setTimeout(tick, 400);
		return () => clearTimeout(timer);
	});

	const resumeHref = $derived(contact.resume[$locale]);
</script>

<section id="home" class="relative flex min-h-screen items-center px-5 pt-24 pb-16">
	<div class="mx-auto w-full max-w-5xl">
		<TerminalWindow title="vitor@portfolio: ~">
			<div class="space-y-4 text-sm sm:text-base">
				<p class="text-fg-dim">
					<span class="text-accent">$</span> {$t.hero.greeting}
				</p>

				<h1 class="text-3xl font-bold tracking-tight text-fg sm:text-5xl">
					{$t.hero.name}
				</h1>

				<p class="text-lg text-cyan sm:text-2xl">
					<span class="text-fg-dim">{'// '}</span><span class="caret">{roleText}</span>
				</p>

				<p class="max-w-2xl leading-relaxed text-fg-dim">
					{$t.hero.tagline}
				</p>

				<div class="flex flex-wrap gap-3 pt-3">
					<a
						href="#projects"
						class="rounded border border-accent bg-accent/10 px-4 py-2 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-bg"
					>
						{$t.hero.ctaProjects}
					</a>
					<a
						href="#contact"
						class="rounded border border-border px-4 py-2 text-sm font-semibold text-fg-dim transition-colors hover:border-cyan hover:text-cyan"
					>
						{$t.hero.ctaContact}
					</a>
					<a
						href={resumeHref}
						target="_blank"
						rel="noopener"
						class="rounded border border-border px-4 py-2 text-sm font-semibold text-fg-dim transition-colors hover:border-yellow hover:text-yellow"
					>
						↓ {$t.hero.ctaResume}
					</a>
				</div>
			</div>
		</TerminalWindow>
	</div>
</section>
