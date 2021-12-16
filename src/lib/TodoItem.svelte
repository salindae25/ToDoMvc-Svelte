<script lang="ts">
	import Input from '$lib/Input.svelte';
	import type { Todo } from '$lib/types';
	import { classNames } from '$lib/Utils';
	import { createEventDispatcher } from 'svelte';

	const ESCAPE_KEY = 27;
	const ENTER_KEY = 13;
	const dispatch = createEventDispatcher();

	export let todo: Todo;
	export let editing;

	function handleEdit(e) {
		dispatch('edit');
		editText = todo.title;
	}
	function handleSubmit(event) {
		dispatch('save', { text: event.target.value });
	}
	function handleChange() {}
	function handleKeyDown(event) {
		if (event.which === ESCAPE_KEY) {
			editText = todo.title;
		} else if (event.which === ENTER_KEY) {
			handleSubmit(event);
		}
	}
	function onDestroy() {
		console.log('destroy');

		dispatch('destroy');
	}
	function onToggle() {
		dispatch('toggle');
	}
	function onCancel() {
		dispatch('cancel');
	}
	let editText;
	let isFocused = false;
	const onFocus = () => (isFocused = true);
	const onBlur = () => (isFocused = false);
</script>

<li
	class={classNames({
		completed: todo.completed,
		editing: editing
	})}
>
	<div class="view">
		<input
			class="toggle"
			id={`toggle-item-${todo.id}`}
			type="checkbox"
			checked={todo.completed}
			on:change={onToggle}
		/>
		<label for={`toggle-item-${todo.id}`} />

		<span on:dblclick={handleEdit}>{todo.title}</span>
		<button class="destroy" on:click={onDestroy} />
	</div>
	<Input
		className="edit"
		value={editText}
		on:blur={handleSubmit}
		on:change={handleChange}
		on:keydown={handleKeyDown}
	/>
</li>
