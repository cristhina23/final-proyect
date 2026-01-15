<script lang="ts">
  const currentYear = new Date().getFullYear();

  import BookingModal from '$lib/components/landing/BookingModal.svelte';

	let isMenuOpen = $state(false);

	let openBooking = $state(false);
	

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

</script>

<footer class="bg-foreground text-white mt-auto">
    <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-4">
           
            <div class="col-span-1 md:col-span-1">
                <span class="text-2xl font-bold font-serif text-primary">Beauty  <span class="text-secondary">Care</span></span>
                <p class="mt-4 text-sm text-gray-200">
                    Experience premium care and style. Our expert stylists are dedicated to bringing out your best look.
                </p>
                <div class="flex items-center gap-4 py-2">
                  <a href="/" aria-label="Facebook">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-facebook-icon lucide-facebook hover:text-primary hover:scale-120 transition-all duration-500"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  </a>

                  <a href="/" aria-label="instagram">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-instagram-icon lucide-instagram hover:text-primary hover:scale-120 transition-all duration-500"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  </a>
                  
                  <a href="/" aria-label="email">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail-icon lucide-mail hover:text-primary hover:scale-120 transition-all duration-500"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>
                  </a>
                </div>
            </div>

            
            <div>
                <h3 class="text-sm font-semibold uppercase text-secondary">Nav</h3>
                <ul class="mt-4 space-y-2">
                    <li><a href="/" class="text-muted transition-all duration-300 ease-out hover:text-primary hover:underline hover:scale-105">Home</a></li>
                    <li><a href="#services" class="text-muted transition-all duration-300 ease-out hover:text-primary hover:underline hover:scale-105">Services</a></li>
                    <li><a href="#stylists" class="text-muted transition-all duration-300 ease-out hover:text-primary hover:underline hover:scale-105">Stylists</a></li>
                    <li><button aria-label="Book Now" onclick={() => openBooking = true} class="text-muted transition-all duration-300 ease-out hover:text-primary hover:underline hover:scale-105">Book Now</button></li>
                </ul>
            </div>

            
            <div>
                <h3 class="text-sm font-semibold uppercase text-secondary">Hours</h3>
                <ul class="mt-4 space-y-2 text-gray-200">
                    <li><span class="text-muted font-bold">Mon - Fri:</span> 9am - 8pm</li>
                    <li><span class="text-muted font-bold">Saturday:</span> 10am - 6pm</li>
                    <li><span class="text-muted font-bold">Sunday:</span> Closed</li>
                </ul>
            </div>

            
            <div>
                <h3 class="text-sm font-semibold uppercase text-secondary">Contact</h3>
                <ul class="mt-4 space-y-2 text-gray-200">
                    <li>123 Beauty Lane</li>
                    <li>Style City, SC 12345</li>
                    <li>(555) 123-4567</li>
                    <li><a href="mailto:hello@beautysalon.com" class="hover:text-white">hello@beautysalon.com</a></li>
                </ul>
            </div>
        </div>

        <div class="mt-12 border-t border-white/20 pt-8">
            <p class="text-base text-gray-300 text-center">&copy; {currentYear} Beauty Salon System. All rights reserved.</p>
        </div>
    </div>
</footer>

<BookingModal bind:open={openBooking} />