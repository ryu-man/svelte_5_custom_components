<script lang="ts">
	import { MenuSlideover } from '$lib/components/widgets/menu_slideover';
	import { Modal, Popover } from '$lib/components/ui';
	import NavItem from './NavItem.svelte';

	let open_slideover = $state(false);
	let open_modal = $state(false);

	let popover_reference_element = $state<HTMLElement>();

	function onopen_slideover() {
		open_slideover = !open_slideover;
	}

	function onopen_modal() {
		open_modal = !open_modal;
	}
</script>

<MenuSlideover bind:open={open_slideover}>
	<div class="flex flex-col h-full bg-neutral-400 p-8">
		<div>
			<ul class="flex">
				<NavItem title="Invest">
					<div class="bg-white p-6 shadow-lg rounded-md border">Hello from popover</div>
				</NavItem>

				<NavItem title="Invest">
					<div class="bg-white p-6 shadow-lg rounded-md border">Hello from popover</div>
				</NavItem>

				<NavItem title="learn">
					<div class="bg-white p-6 shadow-lg rounded-md border">Hello from popover</div>
				</NavItem>

				<NavItem title="Company">
					<div class="bg-white p-6 shadow-lg rounded-md border">Hello from popover</div>
				</NavItem>

				<NavItem title="Support">
					<div class="bg-white p-6 shadow-lg rounded-md border">Hello from popover</div>
				</NavItem>
			</ul>
		</div>
		<div class="flex-1"></div>
		<div class="">
			<button class="bg-white px-3 py-2 shadow-md rounded-sm font-medium" onclick={onopen_slideover}
				>Open Slideover</button
			>

			<button class="bg-white px-3 py-2 shadow-md rounded-sm font-medium" onclick={onopen_modal}
				>Open Modal</button
			>
		</div>
	</div>
</MenuSlideover>

<Modal class="px-4 py-3 " bind:open={open_modal}>Hello world</Modal>
