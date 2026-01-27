<!--
  PromotionCard component
  Displays a promotional offer with image background and overlay text.
-->
<script lang="ts">
  const props = $props<{
    title: string;
    description: string;
    badgeText?: string;
    image: string;
    badgeVariant?: "new" | "members";
  }>();

  const { title, description, badgeText, image, badgeVariant = "new" } = $derived(props);

  const badgeStyles = {
    new: "bg-rose-500 text-white",
    members: "bg-emerald-600 text-white"
  };
</script>

<div class="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer h-64">
  <!-- Background Image -->
  <img 
    src={image} 
    alt={title}
    class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
  />
  
  <!-- Gradient Overlay -->
  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
  
  <!-- Content -->
  <div class="relative h-full flex flex-col justify-end p-6">
    <!-- Badge -->
    {#if badgeText}
      <div class="mb-3">
        <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide {badgeStyles[badgeVariant]}">
          {badgeText}
        </span>
      </div>
    {/if}
    
    <!-- Title & Description -->
    <h3 class="text-white font-heading text-xl font-bold mb-2">
      {title}
    </h3>
    <p class="text-white/90 text-sm">
      {description}
    </p>
  </div>
</div>
