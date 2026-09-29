<script>
	import { reveal } from '$lib/actions/reveal.js';
	import { t, locale } from '$lib/i18n/index.js';
	import { MAP, arcPath, countries, home, mapPlaces, project, travelStats } from '$lib/travel.js';
	import { chip } from '$lib/ui.js';
	import Icon from './Icon.svelte';
	import SectionHeading from './SectionHeading.svelte';

	const places = mapPlaces();
	const homePoint = project(home.coords);
	const stats = travelStats();
	const abroad = countries.filter((country) => country.code !== home.country);
	const mapLabel = $derived(
		$t.travel.mapLabel.replace('{list}', abroad.map((country) => country.name[$locale]).join(', '))
	);
</script>

<section id="beyond" aria-labelledby="beyond-title" class="py-20">
	<div class="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[0.85fr_1.15fr]">
		<div>
			<SectionHeading
				id="beyond-title"
				kicker={$t.travel.kicker}
				title={$t.travel.title}
				lead={$t.travel.lead}
			/>
			<dl class="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-6">
				<div class="flex flex-col-reverse">
					<dt class="text-[13px] leading-snug text-muted-2">{$t.travel.countries}</dt>
					<dd class="text-[26px] leading-tight font-bold tracking-tight text-fg">{stats.countries}</dd>
				</div>
				<div class="flex flex-col-reverse">
					<dt class="text-[13px] leading-snug text-muted-2">{$t.travel.continents}</dt>
					<dd class="text-[26px] leading-tight font-bold tracking-tight text-fg">{stats.continents}</dd>
				</div>
				<div class="flex flex-col-reverse">
					<dt class="text-[13px] leading-snug text-muted-2">{$t.travel.remote}</dt>
					<dd class="text-[26px] leading-tight font-bold tracking-tight text-fg">
						{$t.travel.remoteValue}
					</dd>
				</div>
			</dl>
		</div>

		<figure use:reveal class="rounded-3xl border border-border bg-surface p-4 shadow-card sm:p-6">
			<div class="relative w-full" style="aspect-ratio: {MAP.width} / {MAP.height}">
				<div class="world-dots absolute inset-0 bg-muted-2/35" aria-hidden="true"></div>
				<svg
					viewBox="0 0 {MAP.width} {MAP.height}"
					class="absolute inset-0 h-full w-full overflow-visible"
					role="img"
					aria-label={mapLabel}
				>
					{#each places as place, index (place.code + place.name.en)}
						<path
							d={arcPath(home.coords, place.coords)}
							class="travel-arc"
							style="--arc-index: {index}"
							pathLength="1"
							fill="none"
							stroke="var(--color-accent)"
							stroke-opacity="0.7"
							stroke-width="0.6"
							stroke-linecap="round"
						/>
					{/each}
					{#each places as place (place.code + place.name.en)}
						{@const point = project(place.coords)}
						<g>
							<title>{place.name[$locale]}, {place.countryName[$locale]}</title>
							<circle cx={point.x} cy={point.y} r="2.6" fill="var(--color-accent)" opacity="0.18" />
							<circle cx={point.x} cy={point.y} r="1.2" fill="var(--color-accent)" />
						</g>
					{/each}
					<g>
						<title>{home.name[$locale]}</title>
						<circle
							class="travel-pulse"
							cx={homePoint.x}
							cy={homePoint.y}
							r="3"
							fill="var(--color-accent)"
						/>
						<circle
							cx={homePoint.x}
							cy={homePoint.y}
							r="1.9"
							fill="var(--color-surface)"
							stroke="var(--color-accent)"
							stroke-width="1.1"
						/>
					</g>
				</svg>
			</div>
			<figcaption class="mt-5 flex flex-wrap gap-1.5">
				<span
					class="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-semibold text-accent"
				>
					<Icon name="map-pin" size={12} />
					{home.name[$locale]} · {$t.travel.home}
				</span>
				{#each countries as country (country.code)}
					<span class={chip}>{country.name[$locale]}</span>
				{/each}
			</figcaption>
		</figure>
	</div>
</section>
