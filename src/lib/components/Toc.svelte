<script>
	import { onMount } from 'svelte';

	/** @type {{ items: Array<{ id: string, text: string, level: number }>, title: string }} */
	let { items, title } = $props();

	let active = $state('');

	onMount(() => {
		const headings = items
			.map((item) => document.getElementById(item.id))
			.filter((element) => element !== null);
		if (headings.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
				if (visible[0]) active = visible[0].target.id;
			},
			{ rootMargin: '-90px 0px -65% 0px' }
		);
		for (const heading of headings) observer.observe(heading);

		return () => observer.disconnect();
	});
</script>

<nav aria-label={title} class="text-[13px]">
	<p class="mb-2.5 text-xs font-semibold tracking-[0.06em] text-muted-2 uppercase">{title}</p>
	<ul>
		{#each items as item (item.id)}
			<li>
				<a
					href="#{item.id}"
					aria-current={active === item.id ? 'location' : undefined}
					class="block border-l-2 py-1.5 leading-snug transition-colors {item.level > 2
						? 'pl-6'
						: 'pl-3.5'} {active === item.id
						? 'border-accent font-medium text-fg'
						: 'border-border text-muted hover:text-fg'}"
				>
					{item.text}
				</a>
			</li>
		{/each}
	</ul>
</nav>
