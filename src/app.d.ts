// See https://kit.svelte.dev/docs/types#app

import type { MenuSlideover } from '$lib/components/widgets/menu_slideover';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	interface Window {
		// Below just informs IDE and/or TS-compiler (it's set in `.js` file).
		slideoverController: InstanceType<typeof MenuSlideover>;
	}
}

export {};
