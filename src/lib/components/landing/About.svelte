<script>
 import AboutImage from '$lib/assets/about.jpg';
</script>

<section class="py-18 bg-white overflow-hidden" id="about">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
     
      <div class="order-1 lg:order-2">
        <span class="text-primary font-bold tracking-wider uppercase text-sm">Who We Are</span>
        <h2 class="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-serif">Redefining Beauty & Relaxation</h2>
        <p class="mt-6 text-md text-gray-600 leading-relaxed">
          At Luxe Salon, we believe that beauty is an art form and relaxation is a necessity. Our sanctuary is designed to transport you away from the daily grind into a world of tranquility and style.
        </p>
        <p class="mt-4 text-md text-gray-600 leading-relaxed">
          With a team of dedicated professionals and a passion for excellence, we curate personalized experiences that enhance your natural radiance. From precision cuts to rejuvenating spa treatments, every detail is tailored to you.
        </p>

       
        <dl class="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
          <div class="relative pl-12">
            <dt class="inline font-semibold text-foreground">
              
              <svg class="absolute left-1 top-1 h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              Expert Stylists.
            </dt>
            <dd class="inline">Our team is continuously trained in the latest global trends and techniques.</dd>
          </div>

          <div class="relative pl-12">
            <dt class="inline font-semibold text-foreground">
              <!-- Icon: Sparkle/Premium -->
              <svg class="absolute left-1 top-1 h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              </svg>
              Premium Products.
            </dt>
            <dd class="inline">We strictly use top-tier, eco-friendly products that nurture your hair and skin.</dd>
          </div>

          <div class="relative pl-12">
            <dt class="inline font-semibold text-foreground">
              <!-- Icon: Heart/Care -->
              <svg class="absolute left-1 top-1 h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
              Serene Atmosphere.
            </dt>
            <dd class="inline">Relax in our thoughtfully designed space, crafted for your ultimate comfort.</dd>
          </div>
        </dl>
      </div>

     
      <div class="order-2 lg:order-1 flex justify-center ">
        <div class="relative w-full max-w-lg aspect-4/5 lg:aspect-square">
           <div class="absolute inset-0 bg-primary/20 rounded-tr-[100px] rounded-bl-[100px] transform translate-x-4 translate-y-4 -z-10"></div>
           <img 
            src={AboutImage} 
            alt="About our salon" 
            class="w-full h-full object-cover rounded-tr-[100px] rounded-bl-[100px] shadow-2xl z-10 block"
           />
        </div>
      </div>
    </div>
  </div>
</section>
