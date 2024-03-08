export type ClickOUtsideParams = {
	exclude: (string | Element)[];
	callback: (ev?: MouseEvent) => void;
};

export function clickOutside(node: Element, { callback, exclude = [] }: ClickOUtsideParams) {
	document.addEventListener('click', handler);

	return {
		destroy() {
			document.removeEventListener('click', handler);
		}
	};

	function handler(ev: MouseEvent) {
		const target = ev.target as HTMLElement | undefined;
		if (target && !node.contains(target)) {
			// user clicked outside the current element

			// Check wethere the target is excluded or not
			const excludedElements = exclude
				.map((d) => {
					if (d instanceof Element) return d;

					return [...document.querySelectorAll(`[data-${d}]`).values()];
				})
				.flat();

			if (excludedElements.some((d) => d.contains(target))) {
				// Do not fire click outside, target element excluded
				return;
			}

			callback(ev);
			return;
		}
	}
}

export type IsScrollingCallback = (element: HTMLElement) => void;

export function isXScrolling(node: HTMLElement, callback?: IsScrollingCallback) {
	const observer = new MutationObserver((entries) => {
		console.log(
			'............................................... check if scrolling',
			node.scrollWidth,
			node.clientWidth
		);
		if (node.scrollWidth > node.clientWidth) {
			callback?.(node);
		}
	});

	if (node.scrollWidth > node.clientWidth) {
		callback?.(node);
	}

	observer.observe(node, { childList: true, subtree: true });

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
