<script>
	import { onMount, tick } from 'svelte';
	import { getStepperContext } from './context';
	import { nanoid } from 'nanoid';
	import { fly } from 'svelte/transition';

	const menu_context = getStepperContext();

	let { id = nanoid(), path = undefined, data = undefined, duration = 200, children } = $props();

	let is_active = $derived(path ? menu_context.path === path : false);

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
</script>

{#await tick() then _}
	{#if is_active}
		<div class="menu-step absolute inset-0">
			<div
				class="w-full h-full"
				in:fly={{
					duration,
					x: `${100 * menu_context.direction}%`
				}}
				out:fly={{
					duration: 200,
					x: `${-100 * menu_context.direction}%`
				}}
			>
				{@render children()}
			</div>
		</div>
	{/if}
{/await}
