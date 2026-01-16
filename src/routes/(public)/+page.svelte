<script lang="ts">
	
  import HowItWorks from '$lib/components/landing/HowItWorks.svelte';
  import Hero from '$lib/components/landing/Hero.svelte';
  import Services from '$lib/components/landing/Services.svelte';
  import Stylists from '$lib/components/landing/Stylists.svelte';
  import About from '$lib/components/landing/About.svelte';
  import Promotion from '$lib/components/landing/Promotion.svelte';
  import Contact from '$lib/components/landing/Contact.svelte';
  import CTA from '$lib/components/landing/CTA.svelte';
  import Testimonials from '$lib/components/landing/Testimonials.svelte';
  import Toast from '$lib/components/ui/Toast.svelte';
 

   
    
</script>

<svelte:head>
	<title>BeautySalon | Premium Care & Style</title>
	<meta name="description" content="Book your appointment at BeautySalon. Expert stylists, premium services, and a relaxing atmosphere." />
</svelte:head>


<Hero />

<About />

<Services />

<HowItWorks />

<Promotion />

<Stylists />

<Testimonials />

<Contact />

<CTA />

