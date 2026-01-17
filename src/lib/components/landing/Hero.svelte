<!--
  Hero section introducing the salon and key actions.
  Presents a strong headline, short description, and two primary CTAs.
  Includes an image and opens the booking modal when clicking "Book Appointment".
-->
<script>
  import PrimaryButton from "../ui/PrimaryButton.svelte";
  import SecondaryButton from "../ui/SecondaryButton.svelte";
  import hero3 from "../../assets/hero3.png";

	import BookingModal from '$lib/components/landing/BookingModal.svelte';

	// UI states: menu toggle (if used by layout) and booking modal visibility
	let isMenuOpen = $state(false);

	let openBooking = $state(false);
	

	// Toggles the menu; booking is handled by setting `openBooking = true`
	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}
	

</script>

<!-- Main hero layout: text/actions on left, showcase image on right -->
<section class="relative bg-(image:--camel-gradient) flex flex-col lg:flex-row overflow-hidden md:h-[calc(100vh-4rem)]">
	<div class="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-12 lg:py-20 ">
		<div class="max-w-xl">
			<h1 class="text-4xl font-bold tracking-tight text-text-primary sm:text-6xl font-serif">
				Reveal Your True <span class="text-muted">Beauty</span>
			</h1>
			<p class="mt-6 text-md lg:text-lg leading-8 text-gray-600">
				Experience world-class hair, skin, and nail care in a serene environment. 
				Our expert stylists are dedicated to making you look and feel your absolute best.
			</p>
			<!-- Primary CTAs: open booking modal or navigate to services -->
			<div class="mt-10 flex flex-col lg:flex-row  items-center gap-6 lg:gap-x-6">
				<PrimaryButton bg="bg-foreground" on:click={() => openBooking = true}>Book Appointment</PrimaryButton>
				<SecondaryButton bg="bg-transparent " class="border border-foreground" href="#services">View Services</SecondaryButton>
			</div>
		</div>
	</div>
    
	<div class="lg:w-1/2 relative h-96 lg:h-auto">
		<img src="{hero3}" alt="Salon interior" class="absolute inset-0 w-full h-full object-cover object-top lg:object-center" />
	</div>
</section>

<BookingModal bind:open={openBooking} />