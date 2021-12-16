<script lang="ts">
	import Header from '$lib/header/Header.svelte';
	import '../app.css';
</script>

<main>
	<slot />
</main>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
		background: var(--desktop-image) no-repeat;
		background-size: contain;
	}
	@media (max-width: 375px) {
		main {
			background: var(--mobile-image) no-repeat;
		}
	}
</style>
