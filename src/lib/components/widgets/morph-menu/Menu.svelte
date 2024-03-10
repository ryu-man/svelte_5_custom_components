<script>
	import { Popover } from '$lib/components';
	import { spring } from 'svelte/motion';
	import { setMorphMenuContext } from './context';
	import { fade, fly } from 'svelte/transition';
	import { tick } from 'svelte';

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

	let active_element = $derived(context.items[context.active_id]?.element);

	const x_spring = spring(0);
	const y_spring = spring(0);
	const width_spring = spring(0);
	const height_spring = spring(0);

	let hard = $state(true);

	$effect(() => {
		x_spring.set(x, { hard });
	});

	$effect(() => {
		y_spring.set(y, { hard });
	});

	$effect(() => {
		width_spring.set(width, { hard });
	});

	$effect(() => {
		height_spring.set(height, { hard });
	});

	$effect(() => {
		if (!!context.active_id) {
			open = true;
			tick().then(() => {
				setTimeout(()=>{
					hard = false
				}, 10)
			});
		} else {
			open = false;
			hard = true;
		}
	});

	$effect(() => {
		if (!open) {
			context.active_id = undefined;
			hard = true;
		}
	});

	setMorphMenuContext(context);
</script>

<div>
	<ul class="flex relative w-fit" bind:this={element}>
		{#if active_element}
			<div
				class="bg-neutral-600 text-neutral-100 z-0 absolute h-full"
				style:left="{$x_spring}px"
				style:width="{active_element.clientWidth}px"
				transition:fade={{ duration: 100, delay: 50 }}
			/>
		{/if}

		{@render children()}

		<Popover bind:open placements={['bottom-start']} x={$x_spring} y={$y_spring} offset={16}>
			<div class="relative" transition:fly={{ duration: 100, delay: 10, y: -24 }}>
				<div
					class="popover-inner bg-white p-6 shadow-lg rounded-md border box-content"
					bind:this={context.popover_element}
					style:width={`${$width_spring}px`}
					style:height={`${$height_spring}px`}
					style:transform="translateX(-6%)"
				/>

				<div
					class="absolute bottom-[97%] text-lg text-white"
					style:left="{active_element ? active_element.clientWidth / 2 : 0}px"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="1em"
						height="1em"
						viewBox="0 0 24 24"
						style:transform="translateX(-50%)"
					>
						<path fill="currentColor" d="M1 21h22L12 2" />
					</svg>
				</div>
			</div>
		</Popover>
	</ul>
</div>
