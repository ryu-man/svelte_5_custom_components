<script>
	import { Modal } from '$lib/components/ui';
	import { MorphMenu, MorphMenuItem } from '$lib/components/widgets/morph-menu';
	import NavItem from './NavItem.svelte';

	let open_modal = $state(false);

	// the following code is an example of how to controll menu slideover from the external

	// onMount(() => {
	// 	setTimeout(async () => {
	// 		menu_controller?.openSlideover();
	// 		await tick();
	// 		menu_controller?.navigate('/invest');
	// 	}, 5000);
	// });

	function onopen_modal() {
		open_modal = !open_modal;
	}

	function onopen_slideover() {
		window.slideoverController.openSlideover();
	}
</script>

<div class="flex flex-col h-full bg-neutral-400 p-8">
	<div>
		<MorphMenu>
			<MorphMenuItem title="Invest">
				<div class="w-[400px]">
					Donec nec sollicitudin urna, et sagittis nisi. Maecenas tincidunt, neque ut semper
					vestibulum, odio dolor maximus dolor
				</div>
			</MorphMenuItem>

			<MorphMenuItem title="Invest">
				<div class="w-[500px]">
					vitae blandit magna lacus sed nisl. Fusce sed finibus lectus. Proin iaculis mollis enim,
					eget accumsan nisi cursus ut. Donec ex nulla, feugiat sed feugiat volutpat, aliquet vitae
					felis. Cras porta feugiat maximus.
				</div>
			</MorphMenuItem>

			<MorphMenuItem title="Learn">
				<div class="w-[500px]">
					Vestibulum posuere risus nec est pellentesque lobortis. Praesent ultrices enim a turpis
					congue, non sagittis nulla fringilla. Proin euismod iaculis lacus ac fringilla.
				</div>
			</MorphMenuItem>

			<MorphMenuItem title="Company">
				<div class="w-[600px]">
					Fusce erat felis, consectetur ac neque quis, egestas congue lectus. Aliquam erat volutpat.
					Proin malesuada sapien nulla, quis bibendum mi maximus non. Aliquam in dictum sem. Aliquam
					ac massa aliquam
				</div>
			</MorphMenuItem>

			<MorphMenuItem title="Support">
				<div class="w-[200px]">
					Etiam viverra viverra sapien, eu ultrices risus maximus et. Sed aliquet imperdiet turpis,
					quis mattis tortor consectetur nec.
				</div>
			</MorphMenuItem>
		</MorphMenu>
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

<Modal class="px-4 py-3 " bind:open={open_modal}>Hello world</Modal>
