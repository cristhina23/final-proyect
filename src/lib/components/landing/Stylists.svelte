<script>
  import { stylists } from "$lib/data";
  import SecondaryButton from "../ui/SecondaryButton.svelte";

</script>
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