<script>
	import { Popover } from '$lib/components';
	import { fly } from 'svelte/transition';

	let { children, title = '' } = $props();

	let element = $state();

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
		<div
			in:fly|global={{ duration: 400, delay: 100, y: 16 }}
			out:fly|global={{ duration: 400, y: 16 }}
		>
			{@render children()}
		</div>
	</Popover>
</li>
