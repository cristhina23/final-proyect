<script lang="ts">
	import './app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="flex min-h-screen flex-col bg-[var(--background)] text-[var(--foreground)]">
	<Navbar />
	
	<main class="flex-1 w-full">
		{@render children()}
	</main>
	
	<Footer />
</div>
