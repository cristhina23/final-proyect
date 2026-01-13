<script>
    import PrimaryButton from "../ui/PrimaryButton.svelte";
</script>

<section id="contact" class="flex flex-col lg:flex-row min-h-[600px] bg-white">
    <!-- Contact Info (Left) -->
    <div class="lg:w-1/2 px-6 py-16 lg:px-20 lg:py-24 flex flex-col justify-center bg-foreground text-white">
        <span class="text-primary font-bold tracking-wider uppercase text-sm mb-4">Visit Us</span>
        <h2 class="text-3xl font-bold font-serif sm:text-4xl mb-8">We'd Love to See You</h2>
        
        <div class="space-y-10">
            <!-- Location -->
            <div class="flex items-start gap-4">
                <div class="p-3 rounded-full bg-white/10 text-primary">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                </div>
                <div>
                    <h3 class="font-bold text-lg mb-1">Our Location</h3>
                    <p class="text-gray-300">123 Fashion Ave, Suite 400</p>
                    <p class="text-gray-300">New York, NY 10018</p>
                </div>
            </div>

            <!-- Hours -->
            <div class="flex items-start gap-4">
                <div class="p-3 rounded-full bg-white/10 text-primary">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div>
                    <h3 class="font-bold text-lg mb-1">Opening Hours</h3>
                    <div class="grid grid-cols-2 gap-x-8 text-gray-300">
                        <span>Mon - Fri</span>
                        <span>10:00 AM - 8:00 PM</span>
                        <span>Saturday</span>
                        <span>9:00 AM - 7:00 PM</span>
                        <span>Sunday</span>
                        <span>11:00 AM - 5:00 PM</span>
                    </div>
                </div>
            </div>

            <!-- Contact -->
            <div class="flex items-start gap-4">
                <div class="p-3 rounded-full bg-white/10 text-primary">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                </div>
                <div>
                    <h3 class="font-bold text-lg mb-1">Contact Info</h3>
                    <p class="text-gray-300">(212) 555-0199</p>
                    <p class="text-gray-300">hello@luxesalon.nyc</p>
                </div>
            </div>
        </div>

        <div class="mt-12">
            <PrimaryButton href="/book" class="bg-primary text-white hover:bg-white hover:text-foreground">
                Book Appointment
            </PrimaryButton>
        </div>
    </div>

    <!-- Map (Right) -->
    <div class="lg:w-1/2 h-[500px] lg:h-auto overflow-hidden relative grayscale-50 hover:grayscale-0 transition-all duration-500">
        <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1647900000000!5m2!1sen!2s" 
            width="100%" 
            height="100%" 
            title="Our Location: New York"
            style="border:0;" 
            allowfullscreen={true} 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade">
        </iframe>
        <!-- Overlay gradient -->
        <div class="absolute inset-0 pointer-events-none bg-linear-to-r from-foreground/20 to-transparent lg:from-foreground/10"></div>
    </div>
</section>
