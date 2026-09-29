<script>
	import { reveal } from '$lib/actions/reveal.js';
	import { projects } from '$lib/data.js';
	import { t, locale } from '$lib/i18n/index.js';
	import { card, chip } from '$lib/ui.js';
	import Icon from './Icon.svelte';
	import SectionHeading from './SectionHeading.svelte';
</script>

<section id="projects" aria-labelledby="projects-title" class="py-20">
	<div class="mx-auto max-w-6xl px-6">
		<SectionHeading
			id="projects-title"
			kicker={$t.projects.kicker}
			title={$t.projects.title}
			lead={$t.projects.lead}
			class="mb-10"
		/>
		<div class="grid gap-5 md:grid-cols-3">
			{#each projects as project, index (project.name)}
				<article use:reveal={{ delay: index * 80 }} class="{card} flex flex-col gap-4 p-7">
					<div class="flex items-start justify-between gap-3">
						<div>
							<p class="text-xs font-semibold tracking-[0.06em] text-muted-2 uppercase">
								{project.role[$locale]}
							</p>
							<h3 class="mt-1 text-lg font-bold tracking-tight text-fg">{project.name}</h3>
						</div>
						<p class="text-right">
							<span class="block text-[26px] leading-none font-bold tracking-tight text-accent">
								{project.stat.value}
							</span>
							<span class="mt-1 block text-[11px] font-medium text-muted-2">
								{project.stat.label[$locale]}
							</span>
						</p>
					</div>

					<p class="text-[15px] leading-relaxed text-muted">{project.plain[$locale]}</p>

					<ul class="flex flex-wrap gap-1.5" aria-label={$t.projects.stackLabel}>
						{#each project.tags as tag (tag)}
							<li class={chip}>{tag}</li>
						{/each}
					</ul>

					<details class="group mt-auto border-t border-border pt-4">
						<summary
							class="flex list-none items-center justify-between text-sm font-semibold text-accent hover:text-accent-hover [&::-webkit-details-marker]:hidden"
						>
							{$t.projects.details}
							<Icon name="chevron-down" size={16} class="transition-transform group-open:rotate-180" />
						</summary>
						<ul class="mt-3 space-y-2">
							{#each project.highlights[$locale] as highlight (highlight)}
								<li class="flex gap-2.5 text-sm leading-relaxed text-muted">
									<span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true"
									></span>
									<span>{highlight}</span>
								</li>
							{/each}
						</ul>
						<p class="mt-3 text-xs leading-relaxed text-muted-2">{project.stack.join(' · ')}</p>
					</details>
				</article>
			{/each}
		</div>
	</div>
</section>
