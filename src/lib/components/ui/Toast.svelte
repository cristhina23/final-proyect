<script lang="ts">
  let { 
    message, 
    show = $bindable(false),
    type = 'success' 
  }: { 
    message: string; 
    show?: boolean;
    type?: 'success' | 'error' | 'info';
  } = $props();

  // Auto-hide after 4 seconds
  $effect(() => {
    if (show) {
      const timer = setTimeout(() => {
        show = false;
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  });

  const typeStyles = {
    success: {
      bg: 'bg-white',
      border: 'border-emerald-200',
      icon: 'text-emerald-600',
      accent: 'bg-emerald-50'
    },
    error: {
      bg: 'bg-white',
      border: 'border-red-200',
      icon: 'text-red-600',
      accent: 'bg-red-50'
    },
    info: {
      bg: 'bg-white',
      border: 'border-blue-200',
      icon: 'text-blue-600',
      accent: 'bg-blue-50'
    }
  };

  const currentStyle = $derived(typeStyles[type]);
</script>

{#if show}
  <div class="fixed top-4 right-4 z-100 animate-in slide-in-from-top-5 fade-in duration-300">
    <div class="{currentStyle.bg} {currentStyle.border} border-2 rounded-2xl shadow-2xl backdrop-blur-sm min-w-[350px] max-w-md overflow-hidden">
      <!-- Accent bar -->
      <div class="{currentStyle.accent} h-1.5"></div>
      
      <!-- Content -->
      <div class="px-5 py-4">
        <div class="flex items-start gap-3">
          <!-- Icon -->
          <div class="{currentStyle.accent} p-2 rounded-xl shrink-0">
            {#if type === 'success'}
              <svg class="w-5 h-5 {currentStyle.icon}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
              </svg>
            {:else if type === 'error'}
              <svg class="w-5 h-5 {currentStyle.icon}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            {:else}
              <svg class="w-5 h-5 {currentStyle.icon}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            {/if}
          </div>
          
          <!-- Message -->
          <div class="flex-1 pt-0.5">
            <p class="font-semibold text-foreground leading-relaxed">{message}</p>
          </div>
          
          <!-- Close button -->
          <button 
            onclick={() => show = false}
            class="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg hover:bg-muted/50"
            aria-label="Close notification"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  @keyframes slide-in-from-top-5 {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .animate-in {
    animation: slide-in-from-top-5 0.3s ease-out, fade-in 0.3s ease-out;
  }
</style>
