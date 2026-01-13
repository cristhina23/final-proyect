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

  // Auto-hide after 3 seconds
  $effect(() => {
    if (show) {
      const timer = setTimeout(() => {
        show = false;
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  });

  const typeStyles = {
    success: 'bg-green-500 border-green-600',
    error: 'bg-red-500 border-red-600',
    info: 'bg-blue-500 border-blue-600'
  };
</script>

{#if show}
  <div class="fixed top-4 right-4 z-[100] animate-in slide-in-from-top-5 duration-300">
    <div class="{typeStyles[type]} text-white px-6 py-4 rounded-lg shadow-2xl border-2 min-w-[320px] max-w-md">
      <div class="flex items-center gap-3">
        {#if type === 'success'}
          <svg class="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
          </svg>
        {/if}
        <p class="font-semibold text-base">{message}</p>
        <button 
          onclick={() => show = false}
          class="ml-auto text-white/80 hover:text-white transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
{/if}
