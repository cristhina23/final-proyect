<!--
  Admin Metric Card
  Props:
    - mainIcon: Component for the left icon
    - badgeIcon?: Component for the right mini icon (optional)
    - badgeText?: string shown next to badge icon (optional)
    - title: string below the header row
    - value: number|string metric displayed prominently
    - class?: string to extend styles
-->

<script lang="ts">
	import Card from './../../ui/Card.svelte';
  const {
    mainIcon,
    badgeIcon,
    badgeText = '',
    title,
    value,
    class: className = ''
  } = $props<{
    mainIcon: unknown;
    badgeIcon?: unknown;
    badgeText?: string;
    title: string;
    value: string | number;
    class?: string;
  }>();

  // Capitalized variables for dynamic component rendering in Svelte 5
  const MainIcon = $derived(mainIcon);
  const BadgeIcon = $derived(badgeIcon);
</script>

<div class={"rounded-xl bg-card shadow-md border border-border p-4 " + className} aria-label={title}>
  <div class="flex items-center justify-between">
    <div class="w-10 h-10 rounded-lg bg-secondary/30 text-brown flex items-center justify-center">
      {#if MainIcon}
        <MainIcon size={20} />
      {/if}
    </div>

    <div class="flex items-center gap-2 text-xs px-2 py-0.5 rounded-full bg-accent/30 text-brown font-medium">
      {#if BadgeIcon}
        <BadgeIcon size={14} class="text-brown" />
      {/if}
      {#if badgeText}
        <span class="">
          {badgeText}
        </span>
      {/if}
    </div>
  </div>

  <div class="mt-4">
    <p class="text-sm text-muted-foreground">{title}</p>
    <p class="mt-1 font-heading text-2xl font-semibold text-foreground">{value}</p>
  </div>
</div>

