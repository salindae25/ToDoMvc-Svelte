<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { classNames, pluralize, TODO_STATES } from '$lib/Utils';
	const dispatch = createEventDispatcher();
	export let count = 0;
	export let completedCount = 0;
	export let nowShowing = TODO_STATES.ALL_TODOS;
	function onClearCompleted() {
		dispatch('clearCompleted');
	}
	let activeTodoWord = pluralize(count, 'item');
</script>

<footer class="footer">
	<span class="todo-count">
		<strong>{count}</strong>
		{activeTodoWord} left
	</span>
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
	{#if completedCount > 0}
		<button class="clear-completed" on:click={onClearCompleted}> Clear completed </button>
	{/if}
</footer>
