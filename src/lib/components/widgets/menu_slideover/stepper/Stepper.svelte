<script>
	import { setStepperContext } from './context';
	import { tick } from 'svelte';

	let { children, history = [] } = $props();

	let steps_per_path = $state({});

	let context = $state({
		steps: {},
		path: undefined,
		direction: 1,
		mount(step) {
			this.steps[step.id] = step;

			if (step.path) {
				steps_per_path[step.path] = step;

				if (!this.path) {
					this.path = step.path;
				}
			}
		},
		unmount(id) {
			delete this.steps[id];
			delete steps_per_path[id];
		}
	});

	setStepperContext(context);

	export function navigate(path, d = 1) {
		context.direction = d;

		if (context.path && d > 0) {
			history.push(context.path);
		}
		context.path = path;
	}

	export function back() {
		const _ = history.pop();
		if (_) {
			navigate(_, -1);
		}

		return _;
	}
</script>

<div class="rift-menu relative w-full h-full">
	{@render children()}
</div>
