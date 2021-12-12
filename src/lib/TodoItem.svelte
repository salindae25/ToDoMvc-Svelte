<!-- <li className={classNames({
    completed: this.props.todo.completed,
    editing: this.props.editing
})}>
    <div className="view">
        <input
            className="toggle"
            type="checkbox"
            checked={this.props.todo.completed}
            onChange={this.props.onToggle}
        />
        <label onDoubleClick={this.handleEdit}>
            {this.props.todo.title}
        </label>
        <button className="destroy" onClick={this.props.onDestroy} />
    </div>
    <input
        ref="editField"
        className="edit"
        value={this.state.editText}
        onBlur={this.handleSubmit}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
    />
</li> -->
<script lang="ts">
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
			id="toggle-item"
			type="checkbox"
			checked={todo.completed}
			on:change={onToggle}
		/>
		<label for="toggle-item" on:dblclick={handleEdit}>
			{todo.title}
		</label>
		<button class="destroy" on:click={onDestroy} />
	</div>
	<input
		class="edit"
		value={editText}
		on:blur={handleSubmit}
		on:change={handleChange}
		on:keydown={handleKeyDown}
	/>
</li>
