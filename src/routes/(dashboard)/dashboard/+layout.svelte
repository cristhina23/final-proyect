<script lang="ts">
	import '../../app.css';
	import favicon from '$lib/assets/logo.svg';


	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="flex min-h-screen flex-col bg-background text-foreground">

	
	<div class="flex-1 w-full">
		
		{@render children()}
	</div>
	
</div>
