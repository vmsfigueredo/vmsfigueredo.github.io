<script>
	import { t } from '$lib/i18n/index.js';
	import { theme, cycleTheme } from '$lib/theme/index.js';
	import Icon from './Icon.svelte';

	const icons = { system: 'monitor', light: 'sun', dark: 'moon' };
	const label = $derived(`${$t.theme.toggle}: ${$t.theme[$theme]}`);
</script>

<button
	type="button"
	onclick={cycleTheme}
	aria-label={label}
	title={label}
	class="grid h-9 w-9 place-items-center rounded-full border border-border text-muted transition-colors hover:border-border-strong hover:text-fg"
>
	<Icon name={icons[$theme]} size={16} />
</button>
