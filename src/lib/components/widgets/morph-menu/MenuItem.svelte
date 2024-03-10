<script>
	import { portal } from '$lib/components';
	import { nanoid } from 'nanoid';
	import { getMorphMenuContext } from './context';
	import { onMount, tick } from 'svelte';
	import { fade } from 'svelte/transition';
	import { spring, tweened } from 'svelte/motion';

	const menu_context = getMorphMenuContext();

	let { children, title = '', id = nanoid() } = $props();

	let is_active = $derived(menu_context.active_id && id === menu_context.active_id);

	let open = $state(false);

	let item = $state({
		id,
		element: undefined
	});

	const opacity_spring = tweened(0, { duration: 200 });

	$effect(() => {
		if (is_active) {
			opacity_spring.set(1, { delay: 100 });
			menu_context.x = item.element.offsetLeft;
			return;
		}

		opacity_spring.set(0);
	});

	onMount(() => {
		menu_context.mount(item);

		return () => {
			menu_context.unmount(item.id);
		};
	});

	function onclick() {
		if (is_active) {
			menu_context.active_id = undefined;

			return;
		}

		menu_context.active_id = id;
	}

	function mounted(node) {
		menu_context.width = node.clientWidth;
		menu_context.height = node.clientHeight;
	}
</script>

<li class="" class:active={is_active} bind:this={item.element} {onclick}>
	<span>
		{title}
	</span>

	{#if is_active}
		<div
			class="w-fit"
			use:mounted
			use:portal={menu_context.popover_element}
			style:opacity={$opacity_spring}
		>
			{@render children()}
		</div>
	{/if}
</li>

<style lang="postcss">
	li {
		@apply text-white px-6 py-4 relative cursor-pointer;
	}

	li.active {
		@apply bg-neutral-600 text-neutral-100;
	}
</style>
