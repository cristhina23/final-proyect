<script lang="ts">
  import { onMount } from 'svelte';

  const steps = [
    { step: 1, title: 'Choose Service', desc: 'Browse our menu of premium treatments.' },
    { step: 2, title: 'Select Stylist', desc: 'Pick your preferred expert.' },
    { step: 3, title: 'Book Time', desc: 'Find a slot that fits your schedule.' },
    { step: 4, title: 'Confirm', desc: 'Receive instant confirmation via email.' }
  ];

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll('.step').forEach((el) => {
      observer.observe(el);
    });
  });
</script>

<section class="py-18 bg-white">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="text-center">
      <h2 class="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-serif">
        How It Works
      </h2>
      <p class="mt-4 text-lg text-gray-600">
        Your journey to beauty in 4 simple steps.
      </p>
    </div>

    <div class="mt-16 relative">
      <!-- Connecting Line (Desktop) -->
      <div class="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-muted -z-10"></div>

      <div class="grid grid-cols-1 gap-8 md:grid-cols-4">
        {#each steps as item, i}
          <div
            class="step flex flex-col items-center text-center bg-white px-4"
            style="--delay: {i * 0.4}s"
          >
            <div class="relative h-24 w-24 mb-6 flex items-center justify-center">
              <svg
                class="absolute inset-0 step-circle"
                viewBox="0 0 120 120"
              >
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="var(--primary)"
                  stroke-width="4"
                />
              </svg>

              <span class="relative z-10 text-3xl font-bold text-primary">
                {item.step}
              </span>
            </div>

            <h3 class="text-lg font-bold text-foreground">
              {item.title}
            </h3>
            <p class="mt-2 text-gray-600">
              {item.desc}
            </p>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
