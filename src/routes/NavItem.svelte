<script lang="ts">
	import { Popover } from '$lib/components';
	import type { SvelteNode } from 'svelte/compiler';
	import { fly } from 'svelte/transition';

	type Props = {
		children: SvelteNode;
		title?: string;
	};

	let { children, title = '' } = $props<Props>();

	let element = $state<HTMLElement>();

	let open = $state(false);

	function onclick() {
		open = !open;
	}
</script>

<li class="text-white px-6 py-4 relative cursor-pointer" bind:this={element} {onclick}>
	<span>
		{title}
	</span>

	<Popover bind:open>
		<div in:fly|global={{ duration: 300, y: 16 }} out:fly|global={{ duration: 10, y: 16 }}>
			{@render children()}
		</div>
	</Popover>
</li>
