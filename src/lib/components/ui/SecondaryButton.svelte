<script lang="ts">
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let disabled = false;

  // Customización to add styles
  export let bg = 'bg-[var(--primary)]';
  export let text = 'text-[var(--primary-foreground)]';
  export let padding = 'px-8 py-2';
  export let className = '';
</script>

<button
  {type}
  {disabled}
  class={`group relative overflow-hidden rounded-full font-semibold shadow-md transition-all duration-500 ease-out
    ${padding} ${text} ${bg} hover:scale-105 hover:shadow-xl ${className}`}
>
  <!-- Overlay  -->
  <span
    class="
      absolute inset-0 bg-white opacity-0
      translate-y-full
      transition-all duration-500 ease-out
      group-hover:translate-y-0 group-hover:opacity-40
    "
  />

  <!-- Text -->
  <span class="relative z-10 transition-colors duration-300 group-hover:text-[var(--accent-foreground)]">
    <slot />
  </span>
</button>
