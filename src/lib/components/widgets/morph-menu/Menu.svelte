<script>
	import { Popover } from '$lib/components';
	import { spring } from 'svelte/motion';
	import { setMorphMenuContext } from './context';

	let { children } = $props();

	let context = $state({
		active_id: undefined,
		items: {},
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		mount(item) {
			this.items[item.id] = item;
		},
		unmount(id) {
			delete this.items[id];
		}
	});

	let element = $state();

	let open = $state(!!context.active_id);

	let x = $derived(context.x);
	let y = $derived(context.y);

	let width = $derived(context.width);
	let height = $derived(context.height);

	const x_spring = spring(0);
	const y_spring = spring(0);
	const width_spring = spring(0);
	const height_spring = spring(0);

	$effect(() => {
		x_spring.set(x);
	});

	$effect(() => {
		y_spring.set(y);
	});

	$effect(() => {
		width_spring.set(width, { hard: $width_spring === 0 });
	});

	$effect(() => {
		height_spring.set(height, { hard: $height_spring === 0 });
	});

	$effect(() => {
		if (context.active_id) {
			open = true;
		} else {
			open = false;
		}
	});

	$effect(() => {
		if (!open) {
			context.active_id = undefined;
		}
	});

	setMorphMenuContext(context);
</script>

<ul class="flex relative" bind:this={element}>
	{@render children()}

	<Popover bind:open placements={['bottom-start']} x={$x_spring} y={$y_spring} offset={16}>
		<div
			class="popover-inner bg-white p-6 shadow-lg rounded-md border box-content"
			bind:this={context.popover_element}
			style:width={`${$width_spring}px`}
			style:height={`${$height_spring}px`}
			style:transform="translateX(-6%)"
		></div>

		<div class="absolute bottom-[97%] left-8 text-lg text-white">
			<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
				><path fill="currentColor" d="M1 21h22L12 2" /></svg
			>
		</div>
	</Popover>
</ul>
