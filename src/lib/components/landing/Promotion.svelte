<script>
    import PrimaryButton from "../ui/PrimaryButton.svelte";
  import Toast from "../ui/Toast.svelte";

  let showToast = $state(false);

    function handleSubscribe() {
        showToast = true;
    }
</script>

<Toast bind:show={showToast} message="Thank you for subscribing!" />
<div class="relative py-24 bg-[#936C4B] overflow-hidden isolate">
    
    <div class="absolute inset-0 -z-10 overflow-hidden">
        
        <div class="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] rounded-full bg-white/10 blur-3xl"></div>
        
        
        <div class="absolute -bottom-[20%] -right-[10%] w-[500px] h-[500px] rounded-full bg-secondary/30 blur-3xl mix-blend-overlay"></div>
        
        
        <div class="absolute top-[30%] left-[50%] -translate-x-1/2 w-[800px] h-[400px] bg-white/5 blur-[100px] rounded-full"></div>

        <!-- Curved Lines (SVG) -->
        <svg class="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="none" stroke="white" stroke-width="0.5" />
            <path d="M0 0 C 50 100 80 100 100 0 Z" fill="none" stroke="white" stroke-width="0.5" />
        </svg>

        
        <div class="absolute top-10 right-20 w-32 h-32 rounded-full bg-secondary/20 blur-2xl animate-pulse"></div>
        <div class="absolute bottom-10 left-20 w-24 h-24 rounded-full bg-white/10 blur-xl animate-pulse" style="animation-delay: 1s;"></div>
    </div>

   
    <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-white">
        
        
        <div class="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm mb-6">
            <span class="mr-2"></span> Exclusive Offer
        </div>

        <h2 class="text-4xl font-bold tracking-tight sm:text-5xl font-serif mb-6">
            Unlock 20% Off <br/><span class="text-secondary opacity-90 italic">Your First Visit</span>
        </h2>
        
        <p class="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-100/90">
            Join our exclusive community. Subscribe to our newsletter to receive expert beauty tips, seasonal trends, and your 20% discount coupon immediately.
        </p>

        <!-- Newsletter Form -->
        <form class="mx-auto mt-10 flex max-w-md gap-x-4">
            <label for="email-address" class="sr-only">Email address</label>
            <input 
                id="email-address" 
                name="email" 
                type="email" 
                autocomplete="email" 
                required 
                class="min-w-0 flex-auto rounded-md border-0 bg-white/10 px-3.5 py-4 text-white shadow-sm ring-1 ring-inset ring-white/20 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-white/50 sm:text-sm sm:leading-6 backdrop-blur-md" 
                placeholder="Enter your email" 
            />
            <button 
                type="submit" 
                class="flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-primary shadow-sm hover:bg-secondary hover:text-foreground focus-visible:outline  focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-300 uppercase tracking-wider"
                onclick={() => handleSubscribe()}    
            >
                Subscribe
            </button>
        </form>
        
        <p class="mt-4 text-xs text-gray-300">
            We care about your data in our <a href="/privacy" class="font-semibold text-white underline decoration-white/30 hover:decoration-white">privacy policy</a>.
        </p>
    </div>
</div>