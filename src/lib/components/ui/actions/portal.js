import { tick } from 'svelte';

export function portal(node, target = document.body) {
	port(node, target);

	return {
		destroy() {
			node.remove();
		},
		update(target = document.body) {
			port(node, target);
		}
	};

	function port(node, target = document.body) {
		if (!target) {
			throw Error('[actions] portal: Target element is undefined.');
		}
		node.hidden = true;
		target.appendChild(node);
		node.hidden = false;
	}
}
