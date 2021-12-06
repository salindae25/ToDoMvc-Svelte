<script>
	import Todo from '$lib/Todo.svelte';
</script>

<div class="learn-bar">
	<aside class="learn">
		<header>
			<h3>Svelte</h3>
			<span class="source-links">
				<h5>Example</h5>
				<a href="https://github.com/tastejs/todomvc/tree/gh-pages/examples/react">Source</a>
			</span>
		</header>
		<hr />
		<blockquote class="quote speech-bubble">
			<p>
				Svelte is a radical new approach to building user interfaces. Whereas traditional frameworks
				like React and Vue do the bulk of their work in the browser, Svelte shifts that work into a
				compile step that happens when you build your app.
			</p>
			<footer><a href="https://svelte.dev/">Svelte</a></footer>
		</blockquote>
		<hr />
		<h4>Official Resources</h4>
		<ul>
			<li><a href="https://svelte.dev/tutorial/basics">Tutorial</a></li>
			<li><a href="https://svelte.dev/docs">Philosophy</a></li>
			<li><a href="https://github.com/sveltejs/svelte">Support</a></li>
		</ul>
		<h4>Community</h4>
		<ul>
			<li>
				<a href="https://stackoverflow.com/questions/tagged/svelte">Svelte on Stack Overflow</a>
			</li>
			<li><a href="https://sveltesociety.dev/templates/">Dev Community</a></li>
		</ul>
		<footer>
			<hr />
			<em
				>If you have other helpful links to share, or find any of the links above no longer work,
				please <a href="https://github.com/tastejs/todomvc/issues">let us know</a>.</em
			>
		</footer>
	</aside>
	<section class="todoapp">
		<Todo />
	</section>
	<footer class="info">
		<p>Double-click to edit a todo</p>
		<p>Created by <a href="http://github.com/petehunt/">salinda</a></p>
		<p>Inspired by <a href="http://todomvc.com">TodoMVC</a></p>
	</footer>
</div>
