<script lang="ts">
	import './app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
    import BookModal from '$lib/components/landing/BookModal.svelte';
    import { uiState } from '$lib/state.svelte';


	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="flex min-h-screen flex-col bg-background text-foreground">
	<Navbar />
	
	<main class="flex-1 w-full">
		
		{@render children()}
	</main>
	
	<Footer />

    <BookModal bind:open={uiState.isBookingModalOpen} />
</div>
