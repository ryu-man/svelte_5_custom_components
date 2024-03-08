<script lang="ts">
	import { Slideover } from '$lib/components';
	import ArrowLeftRegularIcon from '$lib/components/icons/ArrowLeftRegularIcon.svelte';
	import Stepper from './stepper/Stepper.svelte';
	import Step from './stepper/Step.svelte';
	import { onMount } from 'svelte';
	import ChevronRight from '$lib/components/icons/ChevronRight.svelte';

	type Props = {
		open?: boolean;
	};

	let { open = false, controller } = $props<Props>();

	$effect(() => {
		console.log(controller);
	});

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
</script>

<Slideover class="p-0 text-xl" bind:open>
	<div class="flex flex-nowrap items-center border-b py-4 px-6 font-bold">
		<button onclick={() => controller.back()}>
			<ArrowLeftRegularIcon />
		</button>

		<div class="flex-1 flex items-center justify-center">Menu</div>
	</div>

	<div class="flex-1 w-full">
		<Stepper bind:this={controller}>
			<Step path="/">
				<ul>
					<li>Home</li>
					<li class="flex flex-nowrap items-center" onclick={() => controller?.navigate('/invest')}>
                        <span>Invest</span>
                       <span class="ml-auto"> <ChevronRight /></span>
                    </li>
					<li>Trade</li>
					<li>Learn</li>
					<li>Company</li>
					<li>Support</li>
				</ul>
			</Step>

			<Step path="/invest">
				<ul>
					<li>Invest menu item 1</li>
					<li>Invest menu item 2</li>
					<li>Invest menu item 3</li>
				</ul>
			</Step>
		</Stepper>
	</div>
</Slideover>

<style lang="postcss">
	li {
		@apply py-4 border-b px-6 text-base cursor-pointer;
	}
</style>
