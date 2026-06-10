<script>
	import { t, locale } from '$lib/i18n/index.js';
	import { experience, contact } from '$lib/data.js';
	import { reveal } from '$lib/actions/reveal.js';
</script>

<section id="experience" class="px-5 py-20">
	<div class="mx-auto max-w-5xl">
		<h2 class="mb-6 flex items-center gap-3 text-2xl font-bold">
			<span class="text-accent">#</span>{$t.experience.heading}
			<span class="h-px flex-1 bg-border"></span>
		</h2>

		<p class="mb-8 text-sm text-fg-dim">
			<span class="text-accent">$</span> {$t.experience.cmd}
		</p>

		<ol class="space-y-5">
			{#each experience as job, i (job.company + i)}
				<li use:reveal>
					<article
						class="rounded-lg border border-border bg-bg-soft p-5 transition-colors hover:border-accent/60 sm:p-6"
					>
						<div class="mb-3 flex flex-wrap items-baseline justify-between gap-2">
							<div>
								<h3 class="text-lg font-bold text-fg">
									{job.role[$locale]}
								</h3>
								<p class="text-sm text-cyan">
									{job.company}
									<span class="text-fg-dim">· {job.location[$locale]}</span>
								</p>
							</div>
							<span
								class="shrink-0 rounded px-2 py-0.5 text-xs font-semibold {job.current
									? 'bg-accent/15 text-accent'
									: 'text-fg-dim'}"
							>
								{job.current ? `● ${$t.experience.current}` : ''}
								{job.period[$locale]}
							</span>
						</div>

						<ul class="mb-4 space-y-1.5">
							{#each job.bullets[$locale] as bullet (bullet)}
								<li class="flex gap-2 text-sm leading-relaxed text-fg-dim">
									<span class="mt-0.5 shrink-0 text-accent">▹</span>
									<span>{bullet}</span>
								</li>
							{/each}
						</ul>

						<div class="flex flex-wrap gap-1.5">
							{#each job.stack as tech (tech)}
								<span
									class="rounded bg-bg-elev px-2 py-0.5 text-xs text-purple"
								>
									{tech}
								</span>
							{/each}
						</div>
					</article>
				</li>
			{/each}
		</ol>

		<div class="mt-8 text-center">
			<a
				href={contact.linkedin}
				target="_blank"
				rel="noopener"
				class="inline-flex items-center gap-2 rounded border border-border px-4 py-2 text-sm text-fg-dim transition-colors hover:border-cyan hover:text-cyan"
			>
				{$t.experience.viewMore} →
			</a>
		</div>
	</div>
</section>
