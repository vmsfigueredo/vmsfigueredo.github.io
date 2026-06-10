<script>
	import { t } from '$lib/i18n/index.js';
	import { contact } from '$lib/data.js';
	import { reveal } from '$lib/actions/reveal.js';

	let copied = $state('');

	/** @param {string} value @param {string} key */
	async function copy(value, key) {
		try {
			await navigator.clipboard.writeText(value);
			copied = key;
			setTimeout(() => (copied = ''), 1500);
		} catch {
			/* clipboard blocked — ignore */
		}
	}

	const rows = $derived([
		{
			key: 'email',
			label: $t.contact.emailLabel,
			value: contact.email,
			href: `mailto:${contact.email}`,
			copyable: true,
			action: { label: $t.contact.emailMe, href: `mailto:${contact.email}`, external: false }
		},
		{
			key: 'phone',
			label: $t.contact.phoneLabel,
			value: contact.phone,
			href: `tel:${contact.phone.replace(/\s/g, '')}`,
			copyable: true,
			action: { label: `${$t.contact.whatsapp} ↗`, href: contact.whatsapp, external: true }
		},
		{
			key: 'linkedin',
			label: $t.contact.linkedinLabel,
			value: 'in/vmsfigueredo',
			href: contact.linkedin,
			copyable: false,
			action: null
		}
	]);
</script>

<section id="contact" class="px-5 py-20">
	<div class="mx-auto max-w-5xl">
		<h2 class="mb-6 flex items-center gap-3 text-2xl font-bold">
			<span class="text-accent">#</span>{$t.contact.heading}
			<span class="h-px flex-1 bg-border"></span>
		</h2>

		<div use:reveal class="rounded-lg border border-border bg-bg-soft p-6 sm:p-8">
			<p class="mb-1 text-sm text-fg-dim">
				<span class="text-accent">$</span> {$t.contact.cmd}
			</p>
			<p class="mb-6 text-fg">{$t.contact.intro}</p>

			<ul class="space-y-3">
				{#each rows as row (row.key)}
					<li class="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
						<span class="w-20 shrink-0 text-fg-dim">{row.label}</span>
						<span class="text-accent">→</span>
						<a
							href={row.href}
							target={row.action?.external || row.key === 'linkedin' ? '_blank' : undefined}
							rel="noopener"
							class="text-cyan transition-colors hover:text-accent hover:underline"
						>
							{row.value}
						</a>

						<span class="ml-auto flex items-center gap-2">
							{#if row.copyable}
								<button
									onclick={() => copy(row.value, row.key)}
									class="rounded border border-border px-2 py-0.5 text-xs text-fg-dim transition-colors hover:border-accent hover:text-accent"
								>
									{copied === row.key ? $t.contact.copied : $t.contact.copy}
								</button>
							{/if}
							{#if row.action}
								<a
									href={row.action.href}
									target={row.action.external ? '_blank' : undefined}
									rel="noopener"
									class="rounded border border-accent/60 bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent transition-colors hover:bg-accent hover:text-bg"
								>
									{row.action.label}
								</a>
							{/if}
						</span>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>
