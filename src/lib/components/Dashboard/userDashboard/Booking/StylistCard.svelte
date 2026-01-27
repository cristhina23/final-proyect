<!--
  StylistCard component
  Displays stylist profile with photo, name, rating, and selection state.
-->
<script lang="ts">
  import { Star } from "lucide-svelte";

  const props = $props<{
    name: string;
    image?: string;
    specialty: string;
    experience: number;
    rating: number;
    reviewCount: number;
    isSelected: boolean;
    isRecommended?: boolean;
    onclick?: () => void;
  }>();

  const { name, image, specialty, experience, rating, reviewCount, isSelected, isRecommended = false, onclick } = $derived(props);
</script>

<button
  onclick={onclick}
  class="relative rounded-2xl border-2 p-4 transition-all hover:shadow-lg text-left
  {isSelected ? 'border-brown bg-brown/5' : 'border-border bg-card hover:border-brown/50'}"
>
  <div class="flex flex-col items-center text-center">
    <!-- Stylist Image -->
    <div class="relative mb-4">
      <div class="w-24 h-24 rounded-full overflow-hidden bg-secondary/30">
        {#if image}
          <img src={image} alt={name} class="w-full h-full object-cover" />
        {:else}
          <div class="w-full h-full flex items-center justify-center text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
        {/if}
      </div>
      
      <!-- Recommended Badge -->
      {#if isRecommended}
        <div class="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-brown text-white flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
      {/if}
    </div>
    
    <!-- Name & Specialty -->
    <h3 class="font-semibold text-foreground mb-1">
      {name}
    </h3>
    <p class="text-xs text-muted-foreground mb-2">{specialty}</p>
    
    <!-- Experience & Rating -->
    <div class="space-y-1">
      <p class="text-xs text-muted-foreground">{experience} years experience</p>
      <div class="flex items-center gap-1 text-sm">
        <Star size={14} class="fill-amber-400 text-amber-400" />
        <span class="font-medium text-foreground">{rating.toFixed(1)}</span>
        <span class="text-muted-foreground">({reviewCount})</span>
      </div>
    </div>
  </div>

  <!-- Selected Indicator -->
  {#if isSelected}
    <div class="absolute top-3 right-3 w-6 h-6 rounded-full bg-brown text-white flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
  {/if}
</button>
