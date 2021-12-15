<script context="module">
	export const ssr = false;
</script>

<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	import TodoFooter from '$lib/TodoFooter.svelte';
	import TodoItem from '$lib/TodoItem.svelte';
	import type { Todo } from '$lib/types';
	import { classNames, filterTodo, findActiveState, TODO_STATES, uuid } from '$lib/Utils';
	import { todos } from '$lib/store';

	const INITAIL_TODO: Todo = {
		id: uuid(),
		title: '',
		completed: false
	};
	const ENTER_KEY = 13;

	let activeTodoCount = 0;
	let completedCount = 0;
	let nowShowing = findActiveState(location);
	let newTodo = '';
	let editing = null;
	$: activeTodoCount = $todos.filter((todo) => !todo.completed).length;
	$: completedCount = $todos.filter((todo) => todo.completed).length;

	function addTodo(todoTitle: string) {
		todos.addToStore({
			id: uuid(),
			title: todoTitle,
			completed: false
		});
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
		$todos.map((todo) => todos.mutateStore({ ...todo, completed: checked }));
	}

	function clearCompleted() {
		$todos.forEach((todo) => {
			if (todo.completed) todos.deleteFromStore(todo);
		});
	}
	function toggle(task: Todo) {
		todos.mutateStore({ ...task, completed: !task.completed });
	}
	function cancel() {
		editing = null;
	}
	function destroy(task: Todo) {
		todos.deleteFromStore(task);
	}
	function edit(todo: Todo) {
		editing = todo.id;
	}
	function save(task: Todo, e) {
		const {
			detail: { text }
		} = e;
		todos.mutateStore({ ...task, title: text });
		editing = null;
	}
	function setActiveState(e) {
		nowShowing = findActiveState(location);
	}
	onMount(() => {
		window.addEventListener('hashchange', setActiveState);
		todos.setInitialValue();
	});

	onDestroy(() => {
		window.removeEventListener('hashchange', setActiveState);
	});
	let shownTodos = [];
	$: {
		shownTodos = filterTodo($todos, nowShowing);
	}
</script>

<div>
	<div class="header">
		<h1>todo</h1>
		<input
			class="new-todo"
			placeholder="What needs to be done?"
			bind:value={newTodo}
			on:keydown={handleNewTodoKeyDown}
		/>
		<div class="toggle-container">
			<input
				id="toggle-all"
				class="toggle-all"
				type="checkbox"
				on:change={toggleAll}
				checked={activeTodoCount === 0}
			/>
			<label for="toggle-all" />
		</div>
	</div>

	<section class="main">
		<ul class="todo-list">
			{#each shownTodos as todo}
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
	<ul class="filters">
		<li>
			<a href="#" class={classNames({ selected: nowShowing === TODO_STATES.ALL_TODOS })}> All </a>
		</li>
		<li>
			<a href="#active" class={classNames({ selected: nowShowing === TODO_STATES.ACTIVE_TODOS })}>
				Active
			</a>
		</li>
		<li>
			<a
				href="#completed"
				class={classNames({ selected: nowShowing === TODO_STATES.COMPLETED_TODOS })}
			>
				Completed
			</a>
		</li>
	</ul>
</div>
