<!--
  ServiceCategoryCard component
  Displays a service category option that can be selected.
-->
<script lang="ts">
  import type { ComponentType } from "svelte";

  const props = $props<{
    title: string;
    description: string;
    icon: ComponentType;
    isSelected: boolean;
    onclick?: () => void;
  }>();

  const { title, description, icon: Icon, isSelected, onclick } = $derived(props);
</script>

<button
  onclick={onclick}
  class="relative rounded-2xl border-2 p-6 transition-all hover:shadow-lg text-left
  {isSelected ? 'border-primary bg-primary/5' : 'border-border bg-card hover:border-primary/50'}"
>
  <!-- Icon -->
  <div class="flex flex-col items-center text-center">
    <div class="w-16 h-16 rounded-xl bg-secondary/30 text-primary flex items-center justify-center mb-4">
      <Icon size={32} />
    </div>
    
    <!-- Title -->
    <h3 class="font-heading text-lg font-bold text-foreground mb-2">
      {title}
    </h3>
    
    <!-- Description -->
    <p class="text-sm text-muted-foreground">
      {description}
    </p>
  </div>

  <!-- Selected Indicator -->
  {#if isSelected}
    <div class="absolute top-4 right-4 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
  {/if}
</button>
