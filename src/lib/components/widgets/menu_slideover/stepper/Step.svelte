<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { getStepperContext, type Step } from './context';
	import { nanoid } from 'nanoid';
	import type { SvelteNode } from 'svelte/compiler';
	import { fly } from 'svelte/transition';
	import { quadInOut } from 'svelte/easing';

	const menu_context = getStepperContext();

	type Props<T = any> = {
		id?: string;
		path?: string;
		data?: T;
		children: SvelteNode;
	};

	let { id = nanoid(), path = undefined, data = undefined, children } = $props<Props>();

	let is_active = $derived(path ? menu_context.path === path : false);

	let client_width = 0;

	$effect(() => {
		console.log(menu_context.path, path, is_active);
	});

	onMount(() => {
		const step: Step = {
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

{#if is_active}
	<div class="menu-step absolute inset-0" bind:clientWidth={client_width}>
		<div
			class="w-full h-full"
			in:fly={{
				duration: 200,
				easing: quadInOut,
				x: (-client_width / 2) * menu_context.direction
			}}
			out:fly={{
				duration: 100,
				easing: quadInOut,
				x: (client_width / 2) * menu_context.direction
			}}
		>
			{@render children()}
		</div>
	</div>
{/if}
