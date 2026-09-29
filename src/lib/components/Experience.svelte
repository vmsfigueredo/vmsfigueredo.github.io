<script>
	import { reveal } from '$lib/actions/reveal.js';
	import { contact, education, experience } from '$lib/data.js';
	import { t, locale } from '$lib/i18n/index.js';
	import Icon from './Icon.svelte';
	import SectionHeading from './SectionHeading.svelte';
</script>

<section
	id="experience"
	aria-labelledby="experience-title"
	class="border-y border-border bg-bg-alt py-20"
>
	<div class="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[1.4fr_1fr]">
		<div>
			<SectionHeading
				id="experience-title"
				kicker={$t.experience.kicker}
				title={$t.experience.title}
				class="mb-10"
			/>
			<ol class="ml-2 border-l-2 border-border">
				{#each experience as job (job.period.en)}
					{@const company = typeof job.company === 'string' ? job.company : job.company[$locale]}
					<li use:reveal class="relative pb-9 pl-8 last:pb-0">
						<span
							aria-hidden="true"
							class="absolute top-1.5 -left-[7px] h-3 w-3 rounded-full border-2 {job.current
								? 'border-accent bg-accent ring-4 ring-accent-soft'
								: 'border-border-strong bg-bg'}"
						></span>
						<div class="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
							<h3 class="text-[17px] font-bold text-fg">
								{job.role[$locale]}
								{#if job.current}
									<span
										class="ml-1.5 rounded-full bg-accent-soft px-2 py-0.5 align-middle text-[11px] font-bold text-accent"
									>
										{$t.experience.current}
									</span>
								{/if}
							</h3>
							<span class="text-[13px] font-medium whitespace-nowrap text-muted-2">
								{job.period[$locale]}
							</span>
						</div>
						<p class="font-medium text-muted">
							{company}{#if job.location}<span> · {job.location[$locale]}</span>{/if}
						</p>
						<p class="mt-1.5 max-w-2xl text-[15px] leading-relaxed text-muted">{job.blurb[$locale]}</p>
					</li>
				{/each}
			</ol>
			<a
				href={contact.linkedin}
				target="_blank"
				rel="noopener noreferrer"
				class="mt-9 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-hover"
			>
				{$t.experience.linkedin}
				<Icon name="arrow-right" size={15} />
			</a>
		</div>

		<div>
			<SectionHeading
				kicker={$t.experience.eduKicker}
				title={$t.experience.eduTitle}
				size="md"
				class="mb-4"
			/>
			<ul class="divide-y divide-border border-y border-border">
				{#each education as edu (edu.degree.en)}
					<li class="flex justify-between gap-4 py-3 text-sm">
						<span class="text-fg">
							{edu.degree[$locale]}
							<span class="block text-muted-2">{edu.school}</span>
						</span>
						<span class="whitespace-nowrap text-muted-2">{edu.year}</span>
					</li>
				{/each}
			</ul>

			<h3 class="mt-8 mb-3 text-sm font-bold text-fg">{$t.experience.langTitle}</h3>
			<ul class="space-y-2 text-sm">
				{#each $t.languages as language (language.name)}
					<li class="flex flex-wrap justify-between gap-x-4">
						<span class="text-fg">{language.name}</span>
						<span class="text-muted-2">
							{language.level}
							{#if language.cert}
								·
								<a
									href={language.cert}
									target="_blank"
									rel="noopener noreferrer"
									class="font-medium text-accent hover:underline"
								>
									{$t.experience.certificate}
								</a>
							{/if}
						</span>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>
