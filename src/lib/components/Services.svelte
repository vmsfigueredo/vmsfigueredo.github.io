<script>
	import { reveal } from '$lib/actions/reveal.js';
	import { t } from '$lib/i18n/index.js';
	import { card } from '$lib/ui.js';
	import Icon from './Icon.svelte';
	import SectionHeading from './SectionHeading.svelte';
</script>

<section id="about" aria-labelledby="about-title" class="border-y border-border bg-bg-alt py-20">
	<div class="mx-auto max-w-6xl px-6">
		<SectionHeading
			id="about-title"
			kicker={$t.services.kicker}
			title={$t.services.title}
			lead={$t.services.lead}
			class="mb-10"
		/>
		<ul class="grid gap-5 md:grid-cols-3">
			{#each $t.services.items as item, index (item.title)}
				<li use:reveal={{ delay: index * 80 }} class="{card} p-7">
					<span
						class="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent"
						aria-hidden="true"
					>
						<Icon name={item.icon} size={22} />
					</span>
					<h3 class="text-lg font-bold tracking-tight text-fg">{item.title}</h3>
					<p class="mt-2 text-[15px] leading-relaxed text-muted">{item.text}</p>
				</li>
			{/each}
		</ul>
	</div>
</section>
