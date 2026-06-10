<script>
	import { t, locale } from '$lib/i18n/index.js';
	import { skills, education } from '$lib/data.js';
	import { reveal } from '$lib/actions/reveal.js';
</script>

<section id="about" class="px-5 py-20">
	<div class="mx-auto max-w-5xl">
		<h2 class="mb-6 flex items-center gap-3 text-2xl font-bold">
			<span class="text-accent">#</span>{$t.about.heading}
			<span class="h-px flex-1 bg-border"></span>
		</h2>

		<p class="mb-6 text-sm text-fg-dim">
			<span class="text-accent">$</span> {$t.about.cmd}
		</p>

		<div class="grid gap-8 md:grid-cols-3">
			<!-- bio -->
			<div use:reveal class="space-y-4 md:col-span-2">
				{#each $t.about.bio as line (line)}
					<p class="leading-relaxed text-fg">{line}</p>
				{/each}

				<div class="pt-2">
					<h3 class="mb-2 text-sm font-bold text-cyan">{$t.about.langHeading}</h3>
					<ul class="flex flex-wrap gap-4 text-sm">
						{#each $t.about.languages as lang (lang.name)}
							<li class="text-fg-dim">
								<span class="text-fg">{lang.name}</span>
								{#if lang.cert}
									<a
										href={lang.cert}
										target="_blank"
										rel="noopener"
										class="text-accent transition-colors hover:text-cyan hover:underline"
										title="View certificate"
									>
										— {lang.level} ↗
									</a>
								{:else}
									<span class="text-accent">— {lang.level}</span>
								{/if}
							</li>
						{/each}
					</ul>
				</div>
			</div>

			<!-- skills -->
			<div use:reveal class="space-y-5">
				<h3 class="text-sm font-bold text-cyan">{$t.about.skillsHeading}</h3>
				{#each skills as group (group.label.en)}
					<div>
						<p class="mb-1.5 text-xs text-fg-dim">{group.label[$locale]}</p>
						<div class="flex flex-wrap gap-1.5">
							{#each group.items as item (item)}
								<span
									class="rounded border border-border bg-bg-elev px-2 py-0.5 text-xs text-fg transition-colors hover:border-accent hover:text-accent"
								>
									{item}
								</span>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- education -->
		<div use:reveal class="mt-12">
			<h3 class="mb-4 text-sm font-bold text-cyan">{$t.about.eduHeading}</h3>
			<ul class="space-y-2">
				{#each education as edu (edu.degree.en)}
					<li
						class="flex flex-col gap-1 border-l-2 border-border pl-4 text-sm sm:flex-row sm:items-baseline sm:justify-between"
					>
						<span class="text-fg">
							{edu.degree[$locale]}
							<span class="text-fg-dim">· {edu.school}</span>
						</span>
						<span class="text-accent">{edu.year}</span>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>
