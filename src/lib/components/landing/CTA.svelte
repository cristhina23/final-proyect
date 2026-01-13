<script>
    import PrimaryButton from "../ui/PrimaryButton.svelte";
    import ctaBg from "../../assets/cta-bg.png";
</script>

<section
  class="relative w-full bg-cover bg-center py-24"
  style="background-image: url('{ctaBg}');"
>
 
  <div class="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>


  <div class="relative mx-auto max-w-2xl px-6">
    <div
      class="rounded-2xl p-10 text-center shadow-xl backdrop-blur-md md:p-14 border border-primary/70" 
    >
      
      <span
        class="mb-6 inline-block rounded-full bg-[#e8d6c3] px-4 py-1 text-xs font-medium tracking-wide text-[#7a573a]"
      >
         Special Offer
      </span>

        <h2 class="mb-4 text-3xl font-light leading-tight text-[#3b2b1f] md:text-4xl">
        Unlock <span class="font-semibold text-[#b07b4f]">20% Off</span><br />
        Your First Visit
      </h2>

      
      <p class="mb-10 text-sm leading-relaxed text-[#6b5a4a] md:text-base">
        Treat yourself to a premium beauty experience.<br />
        Book today and enjoy an exclusive welcome discount.
      </p>

      
      <div class="flex flex-col items-center gap-4">
        <PrimaryButton href="/book" bg="bg-foreground">Book Appointment</PrimaryButton>

        
        <span class="text-xs text-[#9a8b7b]">
          ✔ No commitment · ✔ Instant confirmation
        </span>
      </div>
    </div>
  </div>
</section>
