<script>
	import { kicker as kickerClass } from '$lib/ui.js';

	/** @type {{ kicker: string, title: string, lead?: string, id?: string, size?: 'lg' | 'md', class?: string }} */
	let { kicker, title, lead, id, size = 'lg', class: className = '' } = $props();
</script>

<div class="max-w-2xl {className}">
	<p class={kickerClass}>{kicker}</p>
	<h2
		{id}
		class="mt-2 font-extrabold tracking-[-0.025em] text-balance text-fg {size === 'lg'
			? 'text-3xl leading-tight sm:text-[34px]'
			: 'text-2xl leading-snug'}"
	>
		{title}
	</h2>
	{#if lead}
		<p class="mt-3 text-base leading-relaxed text-muted">{lead}</p>
	{/if}
</div>
