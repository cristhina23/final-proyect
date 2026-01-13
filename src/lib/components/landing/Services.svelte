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
                    
            
          <div class=" absolute inset-0 z-0 bg-cover bg-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500"
            style="background-image: url({getServiceImage(service.image)})">
            </div>
            
            
          <div class="absolute inset-0 z-0 bg-black/60 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500"></div>

            
          <div class="relative z-10 flex flex-col justify-between h-full">
              <div>
                  <h3 class="text-xl font-semibold
  text-primary md:text-primary
  md:group-hover:text-white">{service.title}</h3>
                  <p class="  mt-4
  text-white md:text-gray-600
  md:group-hover:text-white">{service.duration}</p>
                  <p class=" mt-4
  text-white md:text-gray-600
  md:group-hover:text-white">{service.description}</p>
              </div>
              <div class="mt-6 flex items-center justify-between">
                  <span class="text-lg font-bold text-white md:text-foreground transition-colors duration-300 group-hover:text-white">{service.price}</span>
                  <a href="/book" class="text-sm font-semibold text-primary hover:underline group-hover:text-primary border border-primary px-2 py-1 rounded-xl">Book &rarr;</a>
              </div>
          </div>
				</div>
			{/each}
		</div>
	</div>
</section>