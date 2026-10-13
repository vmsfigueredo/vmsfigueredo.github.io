<script>
	import { t } from '$lib/i18n/index.js';
	import { btnGhost, btnMd, btnPrimary } from '$lib/ui.js';
	import Icon from './Icon.svelte';
</script>

<section id="top" class="overflow-hidden">
	<div
		class="mx-auto grid max-w-6xl items-center gap-10 px-6 pt-10 pb-16 md:grid-cols-[1.15fr_0.85fr] md:gap-14 md:pt-20 md:pb-20"
	>
		<div>
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

		<div class="mx-auto w-full max-w-sm md:max-w-none">
			<div class="relative">
				<figure
					class="overflow-hidden rounded-3xl border border-border bg-surface shadow-photo"
					aria-label={$t.hero.codeAlt}
				>
					<div class="flex items-center gap-2 border-b border-border bg-bg-alt px-4 py-3">
						<span class="h-3 w-3 rounded-full bg-[#f87171]" aria-hidden="true"></span>
						<span class="h-3 w-3 rounded-full bg-[#fbbf24]" aria-hidden="true"></span>
						<span class="h-3 w-3 rounded-full bg-[#34d399]" aria-hidden="true"></span>
						<span class="ml-2 font-mono text-xs text-muted-2">Vitor.php</span>
					</div>
					<pre
						class="overflow-x-auto px-5 pt-5 pb-20 font-mono text-[11.5px] leading-[1.75] text-fg sm:text-[13px]"
						aria-hidden="true"><code
							><span class="k">final class</span> <span class="t">Vitor</span> <span class="k">extends</span> <span class="t">Engineer</span>
{'{'}
    <span class="k">public string</span> <span class="v">$role</span> = <span class="s">'Tech Lead'</span>;
    <span class="k">public int</span> <span class="v">$years</span> = <span class="n">9</span>;

    <span class="k">public array</span> <span class="v">$stack</span> = [
        <span class="s">'Laravel'</span>, <span class="s">'SvelteKit'</span>,
        <span class="s">'React'</span>, <span class="s">'.NET'</span>,
    ];

    <span class="k">public function</span> <span class="f">ship</span>(<span class="t">Problem</span> <span class="v">$p</span>): <span class="t">System</span>
    {'{'}
        <span class="k">return</span> <span class="v">$this</span>-&gt;<span class="f">design</span>(<span class="v">$p</span>)
            -&gt;<span class="f">build</span>()
            -&gt;<span class="f">deploy</span>();
    {'}'}
{'}'}</code
						></pre>
				</figure>
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
			<a
				href="/troco"
				class="group mt-6 flex items-center justify-between gap-4 rounded-2xl border border-border bg-surface px-5 py-4 transition-colors hover:border-accent-ring hover:bg-accent-soft"
			>
				<span class="leading-tight">
					<small class="block text-[13px] text-muted">{$t.hero.buildingLabel}</small>
					<b class="text-base font-semibold text-fg">
						Troco <span class="font-normal text-muted-2">· {$t.hero.buildingNote}</span>
					</b>
				</span>
				<span class="text-accent transition-transform group-hover:translate-x-1">
					<Icon name="arrow-right" size={18} />
				</span>
			</a>
		</div>
	</div>
</section>

<style>
	pre .k {
		color: var(--color-accent);
		font-weight: 600;
	}
	pre .t {
		color: var(--color-fg);
		font-weight: 600;
	}
	pre .v {
		color: #c2410c;
	}
	pre .s {
		color: #15803d;
	}
	pre .n {
		color: #a21caf;
	}
	pre .f {
		color: #7c3aed;
	}
	:global(.dark) pre .v {
		color: #fdba74;
	}
	:global(.dark) pre .s {
		color: #86efac;
	}
	:global(.dark) pre .n {
		color: #f0abfc;
	}
	:global(.dark) pre .f {
		color: #c4b5fd;
	}
</style>
