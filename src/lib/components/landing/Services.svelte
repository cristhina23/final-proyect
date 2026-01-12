<script>
// @ts-nocheck

  import { services } from "$lib/data";
  import { getServiceImage } from '$lib/utils/imageResolver';

</script>
<section id="services" class="py-18 bg-white">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="text-center">
			<h2 class="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-serif">Our Services</h2>
			<p class="mt-4 text-lg text-gray-600">Premium treatments designed for your relaxation and beauty.</p>
		</div>
		<div class="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
			{#each services as service}
				<div class="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-(--muted) bg-white hover:border-transparent p-6 shadow-sm hover:shadow-xl transition-all duration-300">
                    
            <!-- Hover Background Image -->
            <div class="absolute inset-0 z-0 bg-cover bg-center opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style="background-image: url({getServiceImage(service.image)})">
            </div>
            
            <!-- Hover Overlay -->
            <div class="absolute inset-0 z-0 bg-black/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

            <!-- Content -->
            <div class="relative z-10 flex flex-col justify-between h-full">
                <div>
                    <h3 class="text-xl font-semibold text-primary transition-colors duration-300 group-hover:text-primary">{service.title}</h3>
                    <p class="mt-2 text-sm text-gray-500 transition-colors duration-300 group-hover:text-gray-200">{service.duration}</p>
                    <p class="mt-4 text-gray-600 transition-colors duration-300 group-hover:text-white">{service.description}</p>
                </div>
                <div class="mt-6 flex items-center justify-between">
                    <span class="text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-white">{service.price}</span>
                    <a href="/book" class="text-sm font-semibold text-primary hover:underline group-hover:text-primary border border-primary px-2 py-1 rounded-xl">Book &rarr;</a>
                </div>
            </div>
				</div>
			{/each}
		</div>
	</div>
</section>