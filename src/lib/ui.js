/** Shared Tailwind class strings for the few patterns repeated across pages. */

const btnBase =
	'inline-flex items-center justify-center gap-2 rounded-[10px] font-semibold transition-colors';

export const btnMd = 'px-[18px] py-2.5 text-sm';
export const btnSm = 'px-3.5 py-2 text-[13px]';
export const btnPrimary = `${btnBase} bg-accent text-on-accent shadow-sm hover:bg-accent-hover`;
export const btnGhost = `${btnBase} border border-border bg-surface text-fg hover:bg-bg-alt`;

export const chip =
	'rounded-full border border-border bg-bg-alt px-2.5 py-0.5 text-xs font-medium text-muted';

export const card =
	'rounded-2xl border border-border bg-surface shadow-sm transition hover:-translate-y-0.5 hover:border-border-strong hover:shadow-card';

export const kicker = 'text-[13px] font-bold tracking-[0.08em] text-accent uppercase';
