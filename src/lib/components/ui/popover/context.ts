import { getContext, setContext } from 'svelte';
import { writable, type Writable } from 'svelte/store';

const CONTEXT_KEY = 'rift::ui::context::popover';

export type PopoverContext = {
	open: Writable<boolean>;
	reference_element: Writable<HTMLElement | undefined>;
};

export function getDefaultPopoverContext() {
	return {
		open: writable(false),
		reference_element: writable<HTMLElement | undefined>(undefined)
	};
}

export function getPopoverContext(): PopoverContext {
	return getContext(CONTEXT_KEY) || getDefaultPopoverContext();
}

export function setPopoverContext(context: PopoverContext) {
	return setContext(CONTEXT_KEY, context);
}
