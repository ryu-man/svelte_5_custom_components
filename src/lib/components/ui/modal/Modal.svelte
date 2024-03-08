<script lang="ts">
	import { getRootContext, portal } from '$lib/components/ui';
	import { cn } from '$lib/utils';
	import { fade } from 'svelte/transition';

	const root_context = getRootContext();

	type Props = {
		class?: string;
		open?: boolean;
	};
	let { class: klass = '', open = false } = $props<Props>();

	function close() {
		open = false;
	}
</script>

{#if open}
	<div class="rift-modal" use:portal={root_context.overlayElement}>
		<div
			class="w-full h-full flex items-center justify-center fixed inset-0 backdrop-blur-sm z-[-1] bg-black/25 transition-colors duration-100 pointer-events-auto"
			onclick={close}
		>
			<div
				class={cn('rift-modal-inner', klass)}
				transition:fade={{ duration: 100 }}
				onclick={(ev) => ev.stopPropagation()}
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
