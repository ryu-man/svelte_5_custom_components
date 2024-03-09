<script lang="ts">
	import { getRootContext, portal } from '$lib/components/ui';
	import { cn } from '$lib/utils';
	import { onMount } from 'svelte';
	import { fade, scale } from 'svelte/transition';

	const root_context = getRootContext();

	type Props = {
		class?: string;
		open?: boolean;
	};
	let { class: klass = '', open = false } = $props<Props>();

	onMount(() => {
		function onkeyup(ev: KeyboardEvent) {
			if (ev.key === 'Escape') {
				open = false;
			}
		}

		document.addEventListener('keyup', onkeyup);

		return () => {
			document.removeEventListener('keyup', onkeyup);
		};
	});

	function close() {
		open = false;
	}
</script>

{#if open}
	<div class="rift-modal" use:portal={root_context.overlayElement}>
		<div
			class="w-full h-full flex items-center justify-center fixed inset-0 backdrop-blur-sm z-[-1] bg-black/50 transition-colors duration-100 pointer-events-auto"
			transition:fade={{ duration: 200 }}
			onclick={close}
		>
			<div
				class={cn('rift-modal-inner', klass)}
				onclick={(ev) => ev.stopPropagation()}
				transition:scale={{ duration: 200, start: 0.8 }}
			>
				<slot />
			</div>
		</div>
	</div>
{/if}

<style lang="postcss">
	.rift-modal {
		@apply fixed inset-0;
	}

	.rift-modal-inner {
		@apply bg-white shadow-lg rounded-lg;

		min-width: 350px;
	}
</style>
