<script lang="ts">
	import PrimaryButton from '$lib/components/ui/PrimaryButton.svelte';
	import BookingModal from '$lib/components/landing/BookingModal.svelte';
	import logo from '$lib/assets/logo.png';

	let isMenuOpen = $state(false);

	let openBooking = $state(false);
	

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}
</script>

<nav class="sticky top-0 z-50 w-full border-b border-gray-200 bg-background/80 backdrop-blur-md">
	<div class="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
		
		<div class="flex items-center">
			<a href="/" class="w-40">
				<img src="{logo}" alt="logo of the app">
			</a>
		</div>

		
		<div class="hidden md:block">
			<div class="ml-10 flex items-baseline space-x-8">
				<a href="/" class="text-text-primary hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium">Inicio</a>
				<a href="#about" class="text-text-primary hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium">About</a>
				<a href="#services" class="text-text-primary hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium">Services</a>
				<a href="#stylists" class="text-text-primary hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium">Stylists</a>
			</div>
		</div>

		
		<div class="hidden md:block">
			<div class="flex items-center gap-2">
				<PrimaryButton on:click={() => openBooking = true}>Book Now</PrimaryButton>
				<button aria-label="User" class=" rounded-md p-1 border border-primary-200 hover:text-primary hover:shadow-md hover:shadow-primary-100 transition-all duration-300 ease-in-out">
					<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-user-round-icon lucide-circle-user-round"><path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/></svg>
				</button>
			</div>
		</div>

		
		<div class="-mr-2 flex md:hidden">
			<button
				type="button"
				onclick={toggleMenu}
				class="inline-flex items-center justify-center rounded-md p-2 text-foreground   focus:outline-none"
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

	
	{#if isMenuOpen}
		<div class=" absolute z-50 bg-white/90 backdrop-blur-sm w-full md:hidden" id="mobile-menu">
			<div class="space-y-1 px-8 pb-3 pt-2 sm:px-3">
				<a href="/" class="block rounded-md px-3 py-2 text-base font-medium text-text-primary hover:bg-muted hover:text-[#6b5a4a] hover:shadow-md hover:shadow-primary-100	 transition-colors">Home</a>
				<a href="#about" class="block rounded-md px-3 py-2 text-base font-medium text-text-primary hover:bg-muted hover:text-[#6b5a4a] hover:shadow-md hover:shadow-primary-100 transition-colors">About</a>
				<a href="#services" class="block rounded-md px-3 py-2 text-base font-medium text-text-primary hover:bg-muted hover:text-[#6b5a4a] hover:shadow-md hover:shadow-primary-100 transition-colors">Services</a>
				<a href="#stylists" class="block rounded-md px-3 py-2 text-base font-medium text-text-primary hover:bg-muted hover:text-[#6b5a4a] hover:shadow-md hover:shadow-primary-100 transition-colors">Stylists</a>
				
					<PrimaryButton on:click={() => openBooking = true} class="w-full justify-center">
						Book Now
					</PrimaryButton>
					
			</div>
		</div>
	{/if}
</nav>

<BookingModal bind:open={openBooking} />