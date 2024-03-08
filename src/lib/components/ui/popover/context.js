import { getContext, setContext } from 'svelte';
import { writable } from 'svelte/store';

const CONTEXT_KEY = 'rift::ui::context::popover';


export function getDefaultPopoverContext() {
	return {
		open: writable(false),
		reference_element: writable(undefined)
	};
}

export function getPopoverContext() {
	return getContext(CONTEXT_KEY) || getDefaultPopoverContext();
}

export function setPopoverContext(context) {
	return setContext(CONTEXT_KEY, context);
}
