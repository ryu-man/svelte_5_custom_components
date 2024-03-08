<script>
	import { Root } from '$lib/components';
	import { MenuSlideover } from '$lib/components/widgets/menu_slideover';

	import '$lib/styles/global.css';

	let { children } = $props();

	let menu_controller = $state();
	let open_slideover = $state(false);

	$effect(() => {
		if (!menu_controller) {
			return;
		}
		window.slideoverController = menu_controller;
	});
</script>

<Root>
	<MenuSlideover bind:open={open_slideover} bind:this={menu_controller}>
		{@render children()}
	</MenuSlideover>
</Root>
