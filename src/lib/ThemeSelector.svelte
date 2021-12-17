<script lang="ts">
	import { quintOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';

	let isDark = false;

	function toggle() {
		isDark = !isDark;
		document.body.classList.toggle('dark-mode');
	}
</script>

<div class="theme-switch">
	{#if isDark}
		<div class="dark-icon" on:click={toggle} />
	{:else}
		<div class="light-icon" on:click={toggle} />
	{/if}
</div>
