import { getContext, setContext } from 'svelte';

const CONTEXT_KEY = 'rift::ui::context::root';

export function getRootContext() {
	return getContext(CONTEXT_KEY);
}

export function setRootContext() {
	return setContext(CONTEXT_KEY, {});
}
