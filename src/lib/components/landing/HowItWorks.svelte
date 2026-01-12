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