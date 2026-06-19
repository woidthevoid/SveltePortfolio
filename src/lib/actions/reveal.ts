// Svelte action: fades and slides an element into view the first time it crosses `threshold` in the viewport.
export function reveal(node: HTMLElement, { delay = 0, threshold = 0.15 } = {}) {
	node.style.opacity = '0';
	node.style.transform = 'translateY(24px)';
	node.style.transition = `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`;

	const observer = new IntersectionObserver(
		([entry]) => {
			if (entry.isIntersecting) {
				node.style.opacity = '1';
				node.style.transform = 'translateY(0)';
				observer.disconnect(); // fire once
			}
		},
		{ threshold }
	);

	observer.observe(node);
	return { destroy: () => observer.disconnect() };
}
