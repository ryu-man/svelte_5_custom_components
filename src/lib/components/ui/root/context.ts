import { getContext, setContext } from 'svelte';

const CONTEXT_KEY = 'rift::ui::context::root';

export type CasRootContext = {
	overlayElement: HTMLDivElement;
};

export function getRootContext() {
	return getContext(CONTEXT_KEY) as CasRootContext;
}

export function setRootContext() {
	return setContext(CONTEXT_KEY, {}) as CasRootContext;
}
