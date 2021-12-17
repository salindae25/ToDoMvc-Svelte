<script>
	import ThemeSelector from '$lib/ThemeSelector.svelte';

	import Todo from '$lib/Todo.svelte';
</script>

<div class="learn-bar">
	<section class="todoapp">
		<ThemeSelector />
		<Todo />
	</section>
	<!-- <footer class="info">
		<p>Double-click to edit a todo</p>
		<p>Created by <a href="http://github.com/petehunt/">salinda</a></p>
		<p>Inspired by <a href="http://todomvc.com">TodoMVC</a></p>
	</footer> -->
</div>
