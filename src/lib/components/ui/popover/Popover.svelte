<script>
	import {
		computePosition,
		offset as floating_ui_offset,
		autoPlacement,
		autoUpdate
	} from '@floating-ui/dom';
	import { clickOutside, portal } from '$lib/components/ui/actions';
	import { getRootContext } from '$lib/components';
	import { onMount, tick } from 'svelte';

	const root_context = getRootContext();

	let { reference, open, placements, offset, x = 0, y = 0 } = $props();

	let dx = $state(0);
	let dy = $state(0);

	let _x = $state(0);
	let _y = $state(0);

	let mounted = $state();

	onMount(() => {
		function onkeyup(ev) {
			if (ev.key === 'Escape') {
				open = false;
			}
		}

		document.addEventListener('keyup', onkeyup);

		return () => {
			document.removeEventListener('keyup', onkeyup);
		};
	});

	function getOpenStatus() {
		return open;
	}

	function init(node, placements) {
		node.hidden = true;

		let cleanup = undefined;

		if (!reference && !node.parentElement) {
			throw new Error('<Popover> reeference element is not defined');
		}

		if (!reference) {
			reference = node.parentElement;
		}

		console.log(reference);

		attach(node, { reference, placements }).then(() => {
			cleanup = autoUpdate(reference, node, async () => {
				if (!getOpenStatus()) {
					return;
				}

				node.hidden = true;
				// portal(node, root_context.overlayElement);
				await tick();
				attach(node, { reference, placements });

				node.hidden = false;
			});
		});

		return {
			update(placements) {
				if (!reference) return;
			},
			destroy() {
				cleanup?.();
				mounted = false;
			}
		};

		function attach(node, { placements, reference }) {
			return computePosition(reference, node, {
				middleware: [
					floating_ui_offset(offset),
					autoPlacement({
						autoAlignment: true,
						crossAxis: true,
						allowedPlacements: placements
					})
				]
			}).then((params) => {
				const placement = params.placement;

				dy = placement.startsWith('top') ? 1 : placement.startsWith('bottom') ? -1 : 0;

				dx = placement.startsWith('left') ? 1 : placement.startsWith('right') ? -1 : 0;

				_x = params.x;
				_y = params.y;

				mounted = true;
			});
		}
	}

	function onclick_outside() {
		mounted = false;
		open = false;
	}
</script>

{#if open}
	<div
		class="rift-popover w-min h-min pointer-events-auto"
		use:init={placements}
		use:clickOutside={{
			callback: onclick_outside,
			exclude: [reference]
		}}
		style:transform={`translate(${_x}px, ${_y}px) translate(${x}px, ${y}px)`}
	>
		{#if mounted}
			<slot {dx} {dy} />
		{/if}
	</div>
{/if}

<style lang="postcss">
	.rift-popover {
		@apply absolute top-0 left-0;
	}
</style>
