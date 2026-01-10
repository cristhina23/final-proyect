<script lang="ts">
	import PrimaryButton from '$lib/components/ui/PrimaryButton.svelte';
	import SecondaryButton from '$lib/components/ui/SecondaryButton.svelte';
	import Card from '$lib/components/ui/Card.svelte'; // Assuming Card exists or will just use div if not complex

    // Mock Data for Services
    const services = [
        { title: 'Haircut & Styling', price: '$50+', duration: '60 min', description: 'Expert cutting and styling tailored to your face shape.' },
        { title: 'Color & Highlights', price: '$120+', duration: '120 min', description: 'Vibrant colors and natural-looking highlights.' },
        { title: 'Manicure & Pedicure', price: '$40+', duration: '45 min', description: 'Relaxing hand and foot care with premium polish.' },
        { title: 'Facial Treatments', price: '$80+', duration: '60 min', description: 'Rejuvenating facials for glowing, healthy skin.' }
    ];

    // Mock Data for Stylists
    const stylists = [
        { name: 'Sarah J.', specialty: 'Color Specialist', bio: 'Expert in balayage and corrective color.' },
        { name: 'Michael R.', specialty: 'Master Cutter', bio: 'Precision haircuts for men and women.' },
        { name: 'Jessica T.', specialty: 'Bridal Stylist', bio: 'Creating dream looks for your special day.' }
    ];
</script>

<svelte:head>
	<title>BeautySalon | Premium Care & Style</title>
	<meta name="description" content="Book your appointment at BeautySalon. Expert stylists, premium services, and a relaxing atmosphere." />
</svelte:head>

<!-- Hero Section -->
<section class="relative bg-[var(--muted)]/30 py-20 lg:py-32 overflow-hidden">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
		<div class="max-w-2xl">
			<h1 class="text-4xl font-bold tracking-tight text-[var(--primary)] sm:text-6xl font-serif">
				Reveal Your True <span class="text-[var(--secondary)]">Beauty</span>
			</h1>
			<p class="mt-6 text-lg leading-8 text-gray-600">
				Experience world-class hair, skin, and nail care in a serene environment. 
                Our expert stylists are dedicated to making you look and feel your absolute best.
			</p>
			<div class="mt-10 flex items-center gap-x-6">
				<PrimaryButton href="/book">Book Appointment</PrimaryButton>
				<SecondaryButton href="#services">View Services</SecondaryButton>
			</div>
		</div>
	</div>
    <!-- Decorative background circle -->
    <div class="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-[var(--accent)]/10 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
</section>

<!-- Services Section -->
<section id="services" class="py-24 bg-white">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="text-center">
			<h2 class="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl font-serif">Our Services</h2>
			<p class="mt-4 text-lg text-gray-600">Premium treatments designed for your relaxation and beauty.</p>
		</div>
		<div class="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
			{#each services as service}
				<div class="relative flex flex-col justify-between rounded-xl border border-[var(--muted)] bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div>
                        <h3 class="text-xl font-semibold text-[var(--primary)]">{service.title}</h3>
                        <p class="mt-2 text-sm text-gray-500">{service.duration}</p>
                        <p class="mt-4 text-gray-600">{service.description}</p>
                    </div>
                    <div class="mt-6 flex items-center justify-between">
                        <span class="text-lg font-bold text-[var(--foreground)]">{service.price}</span>
                        <a href="/book" class="text-sm font-semibold text-[var(--primary)] hover:underline">Book &rarr;</a>
                    </div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Stylists Section -->
<section id="stylists" class="py-24 bg-[var(--background)]">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
            <h2 class="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl font-serif">Meet Our Experts</h2>
        </div>
		<div class="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
			{#each stylists as stylist}
				<div class="group relative overflow-hidden rounded-2xl bg-white shadow-md">
                    <div class="aspect-[3/4] w-full bg-[var(--muted)] flex items-center justify-center text-[var(--secondary)]">
                        <!-- Placeholder for Stylist Image -->
                        <span class="text-6xl opacity-50">Requires Image</span>
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-bold text-[var(--foreground)]">{stylist.name}</h3>
                        <p class="text-sm font-medium text-[var(--primary)]">{stylist.specialty}</p>
                        <p class="mt-3 text-gray-600">{stylist.bio}</p>
                        <div class="mt-6">
                             <SecondaryButton href="/book" class="w-full justify-center">Book with {stylist.name.split(' ')[0]}</SecondaryButton>
                        </div>
                    </div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- How It Works Section -->
<section class="py-24 bg-white">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center">
            <h2 class="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl font-serif">How It Works</h2>
            <p class="mt-4 text-lg text-gray-600">Your journey to beauty in 4 simple steps.</p>
        </div>
        
        <div class="mt-16 relative">
            <!-- Connecting Line (Desktop) -->
            <div class="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-[var(--muted)] -z-10"></div>
            
            <div class="grid grid-cols-1 gap-8 md:grid-cols-4">
                {#each [
                    { step: 1, title: 'Choose Service', desc: 'Browse our menu of premium treatments.' },
                    { step: 2, title: 'Select Stylist', desc: 'Pick your preferred expert.' },
                    { step: 3, title: 'Book Time', desc: 'Find a slot that fits your schedule.' },
                    { step: 4, title: 'Confirm', desc: 'Receive instant confirmation via email.' }
                ] as item}
                    <div class="flex flex-col items-center text-center bg-white px-4">
                        <div class="flex h-24 w-24 items-center justify-center rounded-full bg-[var(--background)] border-4 border-[var(--primary)] shadow-sm mb-6">
                            <span class="text-3xl font-bold text-[var(--primary)]">{item.step}</span>
                        </div>
                        <h3 class="text-lg font-bold text-[var(--foreground)]">{item.title}</h3>
                        <p class="mt-2 text-gray-600">{item.desc}</p>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</section>

<!-- Final CTA Section -->
<section class="py-24 bg-[var(--primary)] text-white relative overflow-hidden">
    <div class="absolute inset-0 bg-black/10"></div>
    <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl font-serif">Ready for a New You?</h2>
        <p class="mx-auto mt-6 max-w-2xl text-lg text-gray-100">
            Don't wait to look and feel your best. Appointments fill up fast.
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
            <a href="/book" class="rounded-md bg-white px-8 py-3.5 text-base font-semibold text-[var(--primary)] shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all">
                Schedule Appointment
            </a>
            <a href="#services" class="text-base font-semibold leading-6 text-white hover:underline">
                View Menu <span aria-hidden="true">→</span>
            </a>
        </div>
    </div>
</section>
