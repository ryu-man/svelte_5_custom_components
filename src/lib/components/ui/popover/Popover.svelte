<script lang="ts">
	import {
		computePosition,
		offset as floating_ui_offset,
		autoPlacement,
		autoUpdate,
		type Placement
	} from '@floating-ui/dom';
	import { clickOutside, portal } from '$lib/components/ui/actions';
	import { getPopoverContext } from './context';
	import { getRootContext } from '$lib/components';
	import { tick } from 'svelte';

	const root_context = getRootContext();

	const popover_context = getPopoverContext();
	const open_store = popover_context.open;
	const reference_element_store = popover_context.reference_element;

	export let reference: HTMLElement | undefined = $reference_element_store;
	export let open = $open_store;
	export let placements: Placement[] | undefined = undefined;
	export let offset = 8;

	$: open_store.set(open);
	$: reference_element_store.set(reference);

	let dx = 0;
	let dy = 0;

	let mounted = false;
	$: if (!open) {
		mounted = false;
	}

	function getOpenStatus() {
		return open;
	}

	type InitParamas = Placement[] | undefined;

	function init(node: HTMLElement, placements: InitParamas) {
		node.hidden = true;

		let cleanup: (() => void) | undefined = undefined;

		if (!reference && !node.parentElement) {
			throw new Error('<Popover> reeference element is not defined');
		}

		if (!reference) {
			reference = node.parentElement as HTMLElement;
		}

		console.log(reference);

		portal(node, root_context.overlayElement);
		attach(node, { reference, placements }).then(() => {
			cleanup = autoUpdate(reference, node, async () => {
				if (!getOpenStatus()) {
					return;
				}

				node.hidden = true;
				portal(node, root_context.overlayElement);
				await tick();
				attach(node, { reference, placements });
			});
		});

		return {
			update(placements: InitParamas) {
				if (!reference) return;
				portal(node, root_context.overlayElement);
			},
			destroy() {
				cleanup?.();
			}
		};

		type AttachParams = { placements: Placement[] | undefined; reference: HTMLElement };

		function attach(node: HTMLElement, { placements, reference }: AttachParams) {
			return computePosition(reference, node, {
				middleware: [
					floating_ui_offset(offset),
					autoPlacement({
						autoAlignment: true,
						crossAxis: true,
						allowedPlacements: placements
					})
				]
			}).then(({ x, y, placement }) => {
				dy = placement.startsWith('top') ? 1 : placement.startsWith('bottom') ? -1 : 0;

				dx = placement.startsWith('left') ? 1 : placement.startsWith('right') ? -1 : 0;

				node.style.transform = `translate(${x}px, ${y}px)`;

				mounted = true;
			});
		}
	}

	function onclick_outside() {
		open = false;
	}
</script>

{#if $open_store}
	<div
		class="rift-popover w-min h-min pointer-events-auto"
		use:init={placements}
		use:clickOutside={{
			callback: onclick_outside,
			exclude: [reference]
		}}
	>
		{#if mounted}
			<slot {dx} {dy} />
		{/if}
	</div>
{/if}

<style lang="postcss">
	.rifty-popover {
		@apply absolute top-0 left-0;
	}
</style>
