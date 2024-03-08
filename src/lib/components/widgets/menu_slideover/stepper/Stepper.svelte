<script lang="ts">
	import type { SvelteNode } from 'svelte/compiler';
	import { setStepperContext, type StepperContext, type Step } from './context';

	type Props = {
		children: SvelteNode;
		history?: string[];
	};

	let { children, history = [] } = $props<Props>();

	let steps_per_path = $state<Record<string, Step>>({});

	let context = $state<StepperContext>({
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

	export function navigate(path: string, d = 1) {
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
