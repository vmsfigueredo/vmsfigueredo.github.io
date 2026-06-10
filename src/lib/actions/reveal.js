/**
 * Svelte action: adds `.in` when the node scrolls into view (once).
 * Respects prefers-reduced-motion via CSS in app.css.
 * @param {HTMLElement} node
 * @param {{ delay?: number }} [params]
 */
export function reveal(node, params = {}) {
	node.classList.add('reveal');
	if (params.delay) node.style.animationDelay = `${params.delay}ms`;

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.classList.add('in');
					observer.unobserve(node);
				}
			}
		},
		{ threshold: 0.12 }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
