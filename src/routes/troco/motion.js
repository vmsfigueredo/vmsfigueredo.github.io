/** Reveal once; pause decorative loops outside the viewport.
 * Content is visible by default if JavaScript is unavailable.
 * @param {HTMLElement} node
 */
export function inView(node) {
  if (typeof IntersectionObserver === 'undefined') return;
  const observer = new IntersectionObserver(([entry]) => {
    node.classList.toggle('is-visible', entry.isIntersecting);
    if (entry.isIntersecting) node.classList.add('has-entered');
  }, { threshold: 0.08 });
  node.classList.add('motion-ready');
  observer.observe(node);
  return { destroy() { observer.disconnect(); } };
}

/** Reports whether at least a third of the node is on screen.
 * @param {HTMLElement} node
 * @param {(visible: boolean) => void} onChange
 */
export function watchVisible(node, onChange) {
  if (typeof IntersectionObserver === 'undefined') return;
  const observer = new IntersectionObserver(([entry]) => onChange(entry.isIntersecting), { threshold: 0.35 });
  observer.observe(node);
  return { destroy() { observer.disconnect(); } };
}
