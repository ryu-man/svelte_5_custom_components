<script>
	import ArrowLeftRegularIcon from '$lib/components/icons/ArrowLeftRegularIcon.svelte';
	import Stepper from './stepper/Stepper.svelte';
	import Step from './stepper/Step.svelte';
	import { onMount, tick } from 'svelte';
	import ChevronRight from '$lib/components/icons/ChevronRight.svelte';
	import { fade, fly } from 'svelte/transition';
	import { cn } from '$lib/utils';
	import { tweened } from 'svelte/motion';
	import DismissRegular from '$lib/components/icons/DismissRegular.svelte';
	import { quadInOut } from 'svelte/easing';

	let { open = false, children } = $props();

	const duration = 150;

	let is_mobile = $state(true);

	let stepper_controller = $state();

	let history = $state([]);

	let content_client_width = $state(0);

	const width_tweened = tweened(0, { duration, delay: 10 });

	$effect(() => {
		if (is_mobile) {
			width_tweened.set(+open);
		} else {
			// width_tweened.set(0)
		}
	});

	onMount(() => {
		function onkeyup(ev) {
			if (ev.key === 'Escape') {
				closeSlideover();
			}
		}

		document.addEventListener('keyup', onkeyup);

		return () => {
			document.removeEventListener('keyup', onkeyup);
		};
	});

	onMount(() => {
		function onresize() {
			if (window.innerWidth < 640) {
				is_mobile = true;
				return;
			}

			is_mobile = false;
		}

		window.addEventListener('resize', onresize);

		onresize();

		return () => {
			window.removeEventListener('resize', onresize);
		};
	});

	export function openSlideover() {
		open = true;
	}

	export function closeSlideover() {
		open = false;
	}

	export function navigate(path) {
		return stepper_controller?.navigate(path);
	}

	export function back() {
		return stepper_controller?.back();
	}
</script>

<div class="slideover-container flex flex-nowrap w-full h-full overflow-x-hidden">
	<div
		class="flex-1 relative"
		bind:clientWidth={content_client_width}
		style:margin-left="{content_client_width * $width_tweened * -1}px"
	>
		{@render children()}
	</div>

	{#await tick() then _}
		{#if open}
			<div class="slide-over">
				<div
					class={cn('inner')}
					transition:fly={{
						duration: is_mobile ? 0 : duration,
						delay: 0,
						x: 240,
						easing: quadInOut
					}}
				>
					<div class="flex flex-nowrap items-center border-b py-4 px-6 font-bold">
						<button
							onclick={() => {
								const p = back();
								if (!p) {
									closeSlideover();
								}
							}}
						>
							{#if history.length}
								<ArrowLeftRegularIcon />
							{:else}
								<DismissRegular />
							{/if}
						</button>

						<div class="flex-1 flex items-center justify-center">Menu</div>
					</div>

					<div class="flex-1 w-full">
						<Stepper bind:this={stepper_controller} bind:history>
							<Step path="/" duration={150}>
								<ul>
									<li>
										<a href="/"> Home </a>
									</li>
									<li class="flex flex-nowrap items-center" onclick={() => navigate('/invest')}>
										<span>Invest</span>
										<span class="ml-auto"> <ChevronRight /></span>
									</li>

									<li>
										<a href="/trade"> Trade </a>
									</li>

									<li class="flex flex-nowrap items-center" onclick={() => navigate('/learn')}>
										<span>Learn</span>
										<span class="ml-auto"> <ChevronRight /></span>
									</li>
									<li>
										<a href="/company"> Company </a>
									</li>
									<li>
										<a href="/support"> Support </a>
									</li>
								</ul>
							</Step>

							<Step path="/invest" duration={150}>
								<ul>
									<li>Invest menu item 1</li>
									<li>Invest menu item 2</li>
									<li>Invest menu item 3</li>
								</ul>
							</Step>

							<Step path="/learn" duration={150}>
								<ul>
									<li>Learn menu item 1</li>
									<li>Learn menu item 2</li>
									<li>Learn menu item 3</li>
								</ul>
							</Step>
						</Stepper>
					</div>
				</div>

				<div
					class="backdrop fixed inset-0 z-[0] bg-black/50 transition-colors duration-100"
					role="button"
					tabindex="-1"
					transition:fade={{ duration: 150, delay: 0 }}
					onclick={closeSlideover}
				/>
			</div>
		{/if}
	{/await}
</div>

<style lang="postcss">
	.slide-over {
		@apply pointer-events-auto z-[1];

		height: 100svh;
		width: 100svw;
		min-width: 100svw;
		max-width: 100svw;

		position: relative;
		top: 0;
		bottom: 0;
		right: 0;

		/* @media (min-width: theme("screens.sm")){
		} */

		@media (min-width: 640px) {
			max-width: max(240px, min(100%, calc(100svw - 54px - 288px)));
			min-width: 240px;
			width: fit-content;

			position: fixed;
			top: 0;
			bottom: 0;
			right: 0;
		}
	}

	.inner {
		@apply relative h-full flex flex-col z-10 border-l border-black/10 shadow-sm bg-white overflow-x-hidden overflow-y-auto;
	}

	li {
		@apply py-4 border-b px-6 text-base cursor-pointer;
	}
</style>
