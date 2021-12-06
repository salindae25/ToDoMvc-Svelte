<script context="module">
	export const ssr = false;
</script>

<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	import TodoFooter from '$lib/TodoFooter.svelte';
	import TodoItem from '$lib/TodoItem.svelte';
	import type { Todo } from '$lib/types';
	import { filterTodo, findActiveState, TODO_STATES, uuid } from '$lib/Utils';

	const INITAIL_TODO: Todo = {
		id: uuid(),
		title: '',
		completed: false
	};
	const ENTER_KEY = 13;

	let todos: Todo[] = [];
	let activeTodoCount = 0;
	let completedCount = 0;
	let nowShowing = findActiveState(location);
	let newTodo = '';
	let editing = null;
	$: activeTodoCount = todos.filter((todo) => !todo.completed).length;
	$: completedCount = todos.filter((todo) => todo.completed).length;

	function addTodo(todoTitle: string) {
		todos = [
			...todos,
			{
				id: uuid(),
				title: todoTitle,
				completed: false
			}
		];
	}

	function handleNewTodoKeyDown(event) {
		if (event.keyCode !== ENTER_KEY) {
			return;
		}

		event.preventDefault();
		const val = newTodo.trim();

		if (val) {
			addTodo(val);
			newTodo = '';
		}
	}

	function toggleAll(event) {
		var checked = event.target.checked;
		todos = todos.map((todo) => ({ ...todo, completed: checked }));
	}

	function clearCompleted() {
		todos = todos.filter((todo) => !todo.completed);
	}
	function toggle(task: Todo) {
		todos = todos.map((todo) =>
			todo.id !== task.id ? todo : { ...task, completed: !task.completed }
		);
	}
	function cancel() {
		editing = null;
	}
	function destroy(task: Todo) {
		todos = todos.filter((todo) => todo.id !== task.id);
	}
	function edit(todo: Todo) {
		editing = todo.id;
	}
	function save(task: Todo, e) {
		const {
			detail: { text }
		} = e;
		todos = todos.map((todo) => (todo.id !== task.id ? todo : { ...task, title: text }));
		editing = null;
	}
	function setActiveState(e) {
		nowShowing = findActiveState(location);
	}
	onMount(() => {
		window.addEventListener('hashchange', setActiveState);
	});

	onDestroy(() => {
		window.removeEventListener('hashchange', setActiveState);
	});
	let shownTodos = [];
	$: {
		shownTodos = filterTodo(todos, nowShowing);
	}
</script>

<div>
	<header class="header">
		<h1>todos</h1>
		<input
			class="new-todo"
			placeholder="What needs to be done?"
			bind:value={newTodo}
			on:keydown={handleNewTodoKeyDown}
			autoFocus={true}
		/>
	</header>
	<section class="main">
		<input
			id="toggle-all"
			class="toggle-all"
			type="checkbox"
			onChange={toggleAll}
			checked={activeTodoCount === 0}
		/>
		<label htmlFor="toggle-all" />
		<ul class="todo-list">
			{#each shownTodos as todo, i}
				<TodoItem
					{todo}
					on:toggle={() => toggle(todo)}
					on:destroy={() => destroy(todo)}
					on:edit={() => edit(todo)}
					editing={editing === todo.id}
					on:save={(e) => save(todo, e)}
					on:cancel={cancel}
				/>
			{/each}
		</ul>
		<TodoFooter
			count={activeTodoCount}
			{completedCount}
			{nowShowing}
			on:clearCompleted={clearCompleted}
		/>
	</section>
</div>
