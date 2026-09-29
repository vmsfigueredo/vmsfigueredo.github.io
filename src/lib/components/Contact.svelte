<script>
	import { reveal } from '$lib/actions/reveal.js';
	import { contact } from '$lib/data.js';
	import { t } from '$lib/i18n/index.js';
	import Icon from './Icon.svelte';

	let copied = $state('');

	/** @param {string} value @param {string} key */
	async function copy(value, key) {
		try {
			await navigator.clipboard.writeText(value);
			copied = key;
			setTimeout(() => (copied = ''), 1800);
		} catch {
			/* clipboard blocked: the visible value can still be selected */
		}
	}

	const rows = $derived([
		{
			key: 'email',
			icon: 'mail',
			label: $t.contact.email,
			value: contact.email,
			href: `mailto:${contact.email}`,
			external: false,
			copy: contact.email
		},
		{
			key: 'whatsapp',
			icon: 'message',
			label: $t.contact.whatsapp,
			value: contact.phone,
			href: contact.whatsapp,
			external: true,
			copy: contact.phone
		},
		{
			key: 'linkedin',
			icon: 'linkedin',
			label: $t.contact.linkedin,
			value: 'in/vmsfigueredo',
			href: contact.linkedin,
			external: true,
			copy: ''
		}
	]);
</script>

<section id="contact" aria-labelledby="contact-title" class="py-20">
	<div class="mx-auto max-w-6xl px-6">
		<div
			use:reveal
			class="grid items-center gap-10 rounded-3xl bg-band p-7 text-band-fg sm:p-12 md:grid-cols-[1.15fr_0.85fr] lg:p-14 dark:border dark:border-border"
		>
			<div>
				<p class="text-[13px] font-bold tracking-[0.08em] text-accent-ring uppercase dark:text-accent">
					{$t.contact.kicker}
				</p>
				<h2 id="contact-title" class="mt-2 text-3xl font-extrabold tracking-[-0.025em] sm:text-[34px]">
					{$t.contact.title}
				</h2>
				<p class="mt-3 max-w-md leading-relaxed text-band-muted">{$t.contact.lead}</p>
			</div>

			<ul class="flex flex-col gap-2.5">
				{#each rows as row (row.key)}
					<li class="flex gap-2">
						<a
							href={row.href}
							target={row.external ? '_blank' : undefined}
							rel={row.external ? 'noopener noreferrer' : undefined}
							class="flex min-w-0 flex-1 items-center justify-between gap-3 rounded-xl border border-white/12 bg-white/6 px-4 py-3.5 text-[15px] font-medium transition-colors hover:bg-white/12"
						>
							<span class="flex min-w-0 items-center gap-3">
								<Icon name={row.icon} size={18} />
								<span class="truncate">{row.value}</span>
							</span>
							<span class="shrink-0 text-xs text-band-muted">{row.label}</span>
						</a>
						{#if row.copy}
							<button
								type="button"
								onclick={() => copy(row.copy, row.key)}
								aria-label="{$t.contact.copy}: {row.label}"
								title="{$t.contact.copy}: {row.label}"
								class="grid w-12 shrink-0 place-items-center rounded-xl border border-white/12 bg-white/6 transition-colors hover:bg-white/12"
							>
								<Icon name={copied === row.key ? 'check' : 'copy'} size={16} />
							</button>
						{/if}
					</li>
				{/each}
			</ul>
			<p class="sr-only" aria-live="polite">{copied ? $t.contact.copied : ''}</p>
		</div>
	</div>
</section>
