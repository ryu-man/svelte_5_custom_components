import { getContext, setContext } from 'svelte';

const CONTEXT_KEY = 'rift::ui::context::steps-menu';

export function getStepperContext() {
	return getContext(CONTEXT_KEY);
}

export function setStepperContext(context) {
	return setContext(CONTEXT_KEY, context);
}
