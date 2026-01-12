<script lang="ts">
    const currentYear = new Date().getFullYear();
</script>

<footer class="bg-foreground text-white mt-auto">
    <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-4">
            <!-- Brand Info -->
            <div class="col-span-1 md:col-span-1">
                <span class="text-2xl font-bold font-serif text-primary">Beauty  <span class="text-secondary">Care</span></span>
                <p class="mt-4 text-sm text-gray-200">
                    Experience premium care and style. Our expert stylists are dedicated to bringing out your best look.
                </p>
            </div>

            <!-- Quick Links -->
            <div>
                <h3 class="text-sm font-semibold uppercase text-secondary">Nav</h3>
                <ul class="mt-4 space-y-2">
                    <li><a href="/" class="text-gray-200 hover:text-white transition-colors">Home</a></li>
                    <li><a href="#services" class="text-gray-200 hover:text-white transition-colors">Services</a></li>
                    <li><a href="#stylists" class="text-gray-200 hover:text-white transition-colors">Stylists</a></li>
                    <li><a href="/book" class="text-gray-200 hover:text-white transition-colors">Book Now</a></li>
                </ul>
            </div>

            <!-- Hours -->
            <div>
                <h3 class="text-sm font-semibold uppercase text-secondary">Hours</h3>
                <ul class="mt-4 space-y-2 text-gray-200">
                    <li>Mon - Fri: 9am - 8pm</li>
                    <li>Saturday: 10am - 6pm</li>
                    <li>Sunday: Closed</li>
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