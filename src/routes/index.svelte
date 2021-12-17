<script>
	import Todo from '$lib/Todo.svelte';

	let isDark = false;

	function toggle() {
		isDark = !isDark;
		document.body.classList.toggle('dark-mode');
	}
</script>

<div class="learn-bar">
	<section class="todoapp">
		<div class="theme-switch">
			{#if isDark}
				<div class="dark-icon" on:click={toggle} />
			{:else}
				<div class="light-icon" on:click={toggle} />
			{/if}
		</div>
		<Todo />
	</section>
</div>
