<script>
	/** @type {{ title?: string, children?: import('svelte').Snippet }} */
	let { title = 'bash', children } = $props();
</script>

<div class="overflow-hidden rounded-lg border border-border bg-bg-soft shadow-2xl shadow-black/40">
	<div class="flex items-center gap-2 border-b border-border bg-bg-elev px-4 py-2.5">
		<span class="h-3 w-3 rounded-full bg-red"></span>
		<span class="h-3 w-3 rounded-full bg-yellow"></span>
		<span class="h-3 w-3 rounded-full bg-accent"></span>
		<span class="ml-2 truncate text-xs text-fg-dim">{title}</span>
	</div>
	<div class="p-5 sm:p-6">
		{@render children?.()}
	</div>
</div>
