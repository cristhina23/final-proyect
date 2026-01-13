<script>
  import { testimonials } from "$lib/data";
  import PrimaryButton from "../ui/PrimaryButton.svelte";
</script>

<section class="py-20 md:py-28 bg-rose-light/50">
  <div class="mx-auto max-w-7xl px-4">
    
    
    <div class="text-center max-w-3xl mx-auto mb-16">
      <span class="inline-block px-4 py-2 mb-4 text-sm font-medium tracking-wider uppercase bg-card text-primary rounded-full">
        Opiniones reales
      </span>

      <h2 class="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
        Experiencias que hablan por sí solas
      </h2>

      <div class="flex items-center justify-center gap-2 mb-4">
        {#each Array(5) as _, i}
          <svg
            class="h-6 w-6 fill-accent text-accent"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.79 1.48 8.296L12 18.896l-7.416 4.496 1.48-8.296L0 9.306l8.332-1.151z"
            />
          </svg>
        {/each}

        <span class="ml-2 text-lg font-semibold">4.9 / 5</span>
      </div>

      <p class="text-muted-foreground">
        Valoraciones verificadas de clientas que confiaron en nuestro trabajo
      </p>
    </div>

    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each testimonials as testimonial}
        <div
          class="relative bg-card p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300"
        >
          
          <svg
            class="absolute top-4 right-4 h-8 w-8 text-rose-light"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M7.17 6A5.001 5.001 0 002 11v7h7v-7H5.5a2.5 2.5 0 012.45-2H9V6H7.17zm9 0A5.001 5.001 0 0011 11v7h7v-7h-3.5a2.5 2.5 0 012.45-2H18V6h-1.83z"/>
          </svg>

          
          <div class="flex items-center gap-3 mb-4">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              class="w-12 h-12 rounded-full object-cover border-2 border-rose-light"
            />

            <div>
              <h4 class="font-semibold text-foreground">
                {testimonial.name}
              </h4>
              <p class="text-xs text-muted-foreground">
                {testimonial.role}
              </p>
            </div>
          </div>

          
          <div class="flex gap-1 mb-3">
            {#each Array(testimonial.rating) as _}
              <svg
                class="h-4 w-4 fill-accent text-accent"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.79 1.48 8.296L12 18.896l-7.416 4.496 1.48-8.296L0 9.306l8.332-1.151z"
                />
              </svg>
            {/each}
          </div>

          
          <p class="text-muted-foreground text-sm leading-relaxed mb-4">
            “{testimonial.text}”
          </p>

          
          <span
            class="inline-block px-3 py-1 bg-secondary text-xs font-medium text-secondary-foreground rounded-full"
          >
            {testimonial.service}
          </span>
        </div>
      {/each}
    </div>

    
    <div class="mt-12 text-center">
      <PrimaryButton
        href="https://www.google.com/search?client=opera&sca_esv=a8f3f333d99b26eb&cs=1&output=search&kgmid=/g/11hy9rvm5s&q=MEY+New+York&shem=bdsle,shrtsdl&shndl=30&source=sh/x/kp/local/m1/1&kgs=91a064efa2e59c9f&utm_source=bdsle,shrtsdl,sh/x/kp/local/m1/1#lrd=0x89c259a35f733fa5:0xacad259fa097e07a,1,,,," target="_blank"
        bg="bg-foreground"
        class="flex items-center gap-2 "
      >
        
        <div class="flex items-center gap-2 py-1">
          <svg class="h-5 w-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>

        <span>Ver todas las reseñas en Google</span>
        </div>
      </PrimaryButton>
    </div>
  </div>
</section>
