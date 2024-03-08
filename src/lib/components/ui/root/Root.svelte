<script>
	import { tick } from 'svelte';
	import { setRootContext } from './context';

	const casContext = setRootContext();
</script>

<div class="root">
	<div class="root-inner">
		{#await tick() then _}
			<slot />
		{/await}
	</div>

	<div class="overlay-container absolute inset-0 pointer-events-none" style:z-index={2}>
		<div class="overlay" bind:this={casContext.overlayElement} />
	</div>
</div>

<style lang="postcss">
	.root {
		@apply w-full h-full max-h-full overflow-x-hidden relative;
		z-index: 1;
	}

	.root-inner {
		@apply w-full h-full max-w-full max-h-full flex flex-col items-start;
		z-index: 1;
	}

	.overlay {
		@apply w-full h-full overflow-x-hidden;
	}
</style>
