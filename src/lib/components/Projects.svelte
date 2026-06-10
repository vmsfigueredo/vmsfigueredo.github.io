<script>
	import { t, locale } from '$lib/i18n/index.js';
	import { projects } from '$lib/data.js';
	import { reveal } from '$lib/actions/reveal.js';
</script>

<section id="projects" class="px-5 py-20">
	<div class="mx-auto max-w-5xl">
		<h2 class="mb-6 flex items-center gap-3 text-2xl font-bold">
			<span class="text-accent">#</span>{$t.projects.heading}
			<span class="h-px flex-1 bg-border"></span>
		</h2>

		<p class="mb-8 text-sm text-fg-dim">
			<span class="text-accent">$</span> {$t.projects.cmd}
		</p>

		<div class="grid gap-5 md:grid-cols-2">
			{#each projects as project (project.name)}
				<article
					use:reveal
					class="flex flex-col rounded-lg border border-border bg-bg-soft p-5 transition-colors hover:border-accent/60 sm:p-6"
				>
					<div class="mb-2 flex flex-wrap items-baseline justify-between gap-2">
						<h3 class="text-lg font-bold text-fg">
							<span class="text-accent">{'>'}</span>
							{project.name}
						</h3>
						<span class="shrink-0 text-xs text-fg-dim">{project.year}</span>
					</div>

					<p class="mb-3 text-xs text-cyan">{project.role[$locale]}</p>

					<div class="mb-4 flex items-start gap-4">
						<p class="flex-1 text-sm leading-relaxed text-fg-dim">
							{project.summary[$locale]}
						</p>
						{#if project.stat}
							<div
								class="shrink-0 rounded-lg border border-accent/40 bg-accent/5 px-4 py-3 text-center"
							>
								<div class="text-2xl font-bold leading-none text-accent">
									{project.stat.value}
								</div>
								<div class="mt-1 text-[10px] uppercase tracking-wide text-fg-dim">
									{project.stat.label[$locale]}
								</div>
							</div>
						{/if}
					</div>

					<ul class="mb-4 space-y-1.5">
						{#each project.highlights[$locale] as hl (hl)}
							<li class="flex gap-2 text-xs leading-relaxed text-fg-dim">
								<span class="mt-0.5 shrink-0 text-accent">▹</span>
								<span>{hl}</span>
							</li>
						{/each}
					</ul>

					<div class="mt-auto flex flex-wrap gap-1.5 pt-2">
						{#each project.stack as tech (tech)}
							<span class="rounded bg-bg-elev px-2 py-0.5 text-xs text-purple">
								{tech}
							</span>
						{/each}
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>
