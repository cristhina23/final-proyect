<script>
// @ts-nocheck

  import { stylists } from "$lib/data";
  import SecondaryButton from "../ui/SecondaryButton.svelte";
  import { getStylistImage } from '$lib/utils/imageResolver';
  import PrimaryButton from "../ui/PrimaryButton.svelte";

</script>

<section id="stylists" class="py-18 bg-background">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <span class="text-primary px-3 py-1 text-sm font-bold rounded-full" >Our Professional Team</span>
      <h2 class="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-serif">Meet Our Experts</h2>
      <p class="mt-4 text-lg text-gray-600">A team of highly skilled stylists dedicated to enhancing your beauty with precision, care, and passion.</p>
    </div>
		<div class="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
			{#each stylists as stylist}
				<div class="group flex flex-col items-center">
          <div class="relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg">
            {#if getStylistImage(stylist.image)}
                <img src={getStylistImage(stylist.image)} alt={stylist.name} class="h-full w-full object-cover object-top" />
            {:else}
                <div class="h-full w-full bg-muted flex items-center justify-center">
                    <span class="text-4xl opacity-50">{stylist.name.split(' ')[0]}</span>
                </div>
            {/if}

            <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center backdrop-blur-xs">
              <span class="text-secondary font-medium tracking-wide uppercase text-xs mb-2">{stylist.specialty}</span>
              <p class="text-white text-sm leading-relaxed mb-6 line-clamp-4">{stylist.bio}</p>
              <PrimaryButton href="/book" class="text-foreground" text="text-foreground">
                Book with {stylist.name.split(' ')[0]}
              </PrimaryButton>
            </div>
          </div>
          <div class="mt-5 text-center">
            <h3 class="text-xl font-bold text-foreground font-serif tracking-tight">{stylist.name}</h3>
            <p class="text-xs font-bold text-primary uppercase tracking-widest mt-1">{stylist.specialty}</p>
          </div>
				</div>
			{/each}
		</div>
	</div>
</section>