import { getContext, setContext } from 'svelte';

const CONTEXT_KEY = 'rift::ui::context::steps-menu';

export type Step<T = unknown> = {
	id: string;
	path?: string;
	data: T;
};

export type StepperContext = {
	steps: Record<string, Step>;
	path?: string;
	active_step?: Step;
	direction: number;
	mount(step: Step): void;
	unmount(id: string): void;
};

export function getStepperContext(): StepperContext {
	return getContext(CONTEXT_KEY);
}

export function setStepperContext(context: StepperContext): StepperContext {
	return setContext(CONTEXT_KEY, context);
}
