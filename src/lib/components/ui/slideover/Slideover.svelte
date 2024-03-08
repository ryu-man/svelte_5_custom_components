<script lang="ts">
	import { fly } from 'svelte/transition';
	import { cn } from '$lib/utils/dom';
	import { portal } from '$lib/components/ui/actions';
	import { getRootContext } from '$lib/components/ui';

	const context = getRootContext();

	const duration = 200;

	type Props = {
		class: string;
		open?: boolean;
	};

	let { class: klass, open = false } = $props<Props>();

	if (!context.overlayElement) {
		console.log(
			"%c<slideover> %cUnable to render slideover component; 'overlayElement' not found make sure that 'slideover' is a child of <CasApp /> component",
			'color: red;',
			'reset:all;'
		);
	}

	function close() {
		open = false;
	}
</script>

{#if open}
	<div class="slide-over" use:portal={context.overlayElement}>
		<div class={cn('inner p-10', klass)} transition:fly={{ duration, x: 240 }}>
			<slot />
		</div>

		<div
			class="backdrop fixed inset-0 backdrop-blur-sm z-[-1] bg-black/25 transition-colors duration-100"
			role="button"
			tabindex="-1"
			onclick={close}
		/>
	</div>
{/if}

<style lang="postcss">
	.slide-over {
		@apply fixed inset-y-0 right-0  pointer-events-auto;

		height: 100svh;
		width: fit-content;
		min-width: 240px;
		max-width: calc(100svw - 54px);

		@media (min-width: theme('screens.md')) {
			max-width: max(240px, min(100%, calc(100svw - 54px - 288px)));
		}

		@media (min-width: theme('screens.xl')) {
			max-width: theme('screens.md');
		}
	}

	.inner {
		@apply relative h-full flex flex-col z-10 border-l border-black/10 shadow-sm bg-white overflow-x-hidden overflow-y-auto;
	}
</style>
