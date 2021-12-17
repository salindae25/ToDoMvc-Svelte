<script lang="ts">
	import { bubble, listen, current_component } from 'svelte/internal';
	function getEventsAction(component) {
		return (node) => {
			const events = Object.keys(component.$$.callbacks);
			const listeners = [];
			events.forEach((event) => listeners.push(listen(node, event, (e) => bubble(component, e))));
			return {
				destroy: () => {
					listeners.forEach((listener) => listener());
				}
			};
		};
	}
	const events = getEventsAction(current_component);
	export let value;
	export let className = '';
</script>

<input use:events {value} class={className} />
