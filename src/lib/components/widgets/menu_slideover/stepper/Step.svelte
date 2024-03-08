<script>
	import { onMount, tick } from 'svelte';
	import { getStepperContext } from './context';
	import { nanoid } from 'nanoid';
	import { quadInOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	const menu_context = getStepperContext();

	let { id = nanoid(), path = undefined, data = undefined, duration = 200, children } = $props();

	let is_active = $derived(path ? menu_context.path === path : false);

	$effect(() => {
		console.log(menu_context.path, path, is_active);
	});

	onMount(() => {
		const step = {
			id,
			path,
			data
		};

		menu_context.mount(step);

		return () => {
			menu_context.unmount(step.id);
		};
	});

	// function fly(node, { duration = 200, delay = 0, easing = quadInOut, d = 1 } = {}) {
	// 	return () => ({
	// 		duration,
	// 		delay,
	// 		easing,
	// 		css: (t = 0) => `transform: translate(${t * 100 * d}%, 0px)`
	// 	});
	// }
</script>

{#if is_active}
	<div class="menu-step absolute inset-0">
		<div
			class="w-full h-full"
			in:fly={{
				duration,
				easing: quadInOut,
				x: `${100 * menu_context.direction}%`
			}}
			out:fly={{
				duration,
				easing: quadInOut,
				x: `${-100 * menu_context.direction}%`
			}}
		>
			{@render children()}
		</div>
	</div>
{/if}
