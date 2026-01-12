<script lang="ts">
	import PrimaryButton from '$lib/components/ui/PrimaryButton.svelte';
	import logo from '$lib/assets/logo.png';
	let isMenuOpen = false;

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}
</script>

<nav class="sticky top-0 z-50 w-full border-b border-gray-200 bg-background/80 backdrop-blur-md">
	<div class="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
		<!-- Logo -->
		<div class="flex items-center">
			<a href="/" class="w-40">
				<img src="{logo}" alt="logo of the app">
			</a>
		</div>

		<!-- Desktop Navigation -->
		<div class="hidden md:block">
			<div class="ml-10 flex items-baseline space-x-8">
				<a href="/" class="text-text-primary hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium">Home</a>
				<a href="#services" class="text-text-primary hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium">Services</a>
				<a href="#stylists" class="text-text-primary hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium">Stylists</a>
				<a href="#about" class="text-text-primary hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium">About</a>
			</div>
		</div>

		<!-- CTA Button -->
		<div class="hidden md:block">
			<PrimaryButton href="/book">Book Now</PrimaryButton>
		</div>

		<!-- Mobile menu button -->
		<div class="-mr-2 flex md:hidden">
			<button
				type="button"
				onclick={toggleMenu}
				class="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-muted hover:text-primary focus:outline-none"
				aria-controls="mobile-menu"
				aria-expanded={isMenuOpen}
			>
				<span class="sr-only">Open main menu</span>
				{#if isMenuOpen}
					<svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				{:else}
					<svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
					</svg>
				{/if}
			</button>
		</div>
	</div>

	<!-- Mobile menu -->
	{#if isMenuOpen}
		<div class="md:hidden" id="mobile-menu">
			<div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
				<a href="/" class="block rounded-md px-3 py-2 text-base font-medium text-text-primary hover:bg-muted hover:text-primary">Home</a>
				<a href="#services" class="block rounded-md px-3 py-2 text-base font-medium text-text-primary hover:bg-muted hover:text-primary">Services</a>
				<a href="#stylists" class="block rounded-md px-3 py-2 text-base font-medium text-text-primary hover:bg-muted hover:text-primary">Stylists</a>
				<a href="#about" class="block rounded-md px-3 py-2 text-base font-medium text-text-primary hover:bg-muted hover:text-primary">About</a>
				<div class="mt-4 px-3">
					<PrimaryButton href="/book" class="w-full justify-center">Book Now</PrimaryButton>
				</div>
			</div>
		</div>
	{/if}
</nav>