<script lang="ts">
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let disabled = false;

  // Customización
  export let bg = 'bg-[var(--primary)]';
  export let text = 'text-[var(--primary-foreground)]';
  export let padding = 'px-8 py-2';
  export let className = '';
</script>

<button
  {type}
  {disabled}
  class={`
    group relative overflow-hidden rounded-full
    ${padding}
    font-semibold
    ${text}
    shadow-lg
    transition-all duration-500 ease-out
    ${bg}
    hover:scale-105 hover:shadow-2xl
    ${className}
  `}
>
  <!-- Overlay shine -->
  <span
    class="
      absolute inset-0 scale-150 bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-0 rotate-45
      translate-x-[-100%] translate-y-[-25%]
      transition-all duration-900 ease-out
      group-hover:translate-x-[150%]
      group-hover:opacity-45
    "
  />

  <!-- Texto -->
  <span class="relative z-10">
    <slot />
  </span>
</button>
