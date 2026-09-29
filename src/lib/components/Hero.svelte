<script>
	import { t } from '$lib/i18n/index.js';
	import { btnGhost, btnMd, btnPrimary } from '$lib/ui.js';
	import Icon from './Icon.svelte';
</script>

<section id="top" class="overflow-hidden">
	<div
		class="mx-auto grid max-w-6xl items-center gap-10 px-6 pt-10 pb-16 md:grid-cols-[1.15fr_0.85fr] md:gap-14 md:pt-20 md:pb-20"
	>
		<div class="order-2 md:order-1">
			<p
				class="inline-flex items-center gap-2 rounded-full border border-accent-ring bg-accent-soft px-3 py-1.5 text-[13px] font-semibold text-accent"
			>
				<span class="h-2 w-2 rounded-full bg-accent" aria-hidden="true"></span>
				{$t.hero.eyebrow}
			</p>

			<h1
				class="mt-5 text-[40px] leading-[1.08] font-extrabold tracking-[-0.03em] text-fg sm:text-5xl lg:text-[54px]"
			>
				{$t.hero.hello}<br />
				{$t.hero.titleStart}
				<span class="text-accent">{$t.hero.titleAccent}</span>
			</h1>

			<p class="mt-5 max-w-xl text-lg leading-relaxed text-muted">{$t.hero.lead}</p>

			<div class="mt-8 flex flex-wrap gap-3">
				<a href="#projects" class="{btnPrimary} {btnMd}">
					{$t.hero.ctaProjects}
					<Icon name="arrow-right" size={16} />
				</a>
				<a href="#contact" class="{btnGhost} {btnMd}">{$t.hero.ctaContact}</a>
			</div>

			<dl class="mt-10 flex flex-wrap gap-x-8 gap-y-5 border-t border-border pt-7">
				{#each $t.hero.trust as item (item.label)}
					<div class="flex flex-col-reverse">
						<dt class="text-[13px] text-muted-2">{item.label}</dt>
						<dd class="text-[22px] leading-tight font-bold tracking-tight text-fg">{item.value}</dd>
					</div>
				{/each}
			</dl>
		</div>

		<div class="relative order-1 mx-auto w-full max-w-[300px] sm:max-w-sm md:order-2 md:max-w-none">
			<picture>
				<source srcset="/vitor.webp" type="image/webp" />
				<img
					src="/vitor.jpg"
					alt={$t.hero.photoAlt}
					width="800"
					height="1000"
					fetchpriority="high"
					class="aspect-[4/5] w-full rounded-3xl bg-bg-alt object-cover shadow-photo"
				/>
			</picture>
			<div
				class="absolute bottom-5 -left-3 flex items-center gap-3 rounded-2xl border border-border bg-surface/95 px-4 py-3 shadow-card backdrop-blur sm:-left-7"
			>
				<span
					class="grid h-9 w-9 place-items-center rounded-xl bg-accent-soft text-sm font-bold text-accent"
					aria-hidden="true">JT</span
				>
				<span class="leading-tight">
					<small class="block text-[11px] font-medium tracking-wide text-muted-2 uppercase">
						{$t.hero.nowLabel}
					</small>
					<b class="text-sm font-semibold text-fg">{$t.hero.nowRole}</b>
				</span>
			</div>
		</div>
	</div>
</section>
