<!--
  Admin Metric Card
  Props:
    - mainIcon: Component for the left icon
    - badgeIcon?: Component for the right mini icon
    - badgeText?: string
    - badgeVariant?: 'success' | 'warning' | 'neutral' | 'action'
    - title: string
    - value: number | string
    - class?: string
-->

<script lang="ts">
  import Card from "./../../ui/Card.svelte";

  export type BadgeVariant = "success" | "warning" | "neutral" | "action";

  const props = $props<{
    mainIcon: unknown;
    badgeIcon?: unknown;
    badgeText?: string;
    badgeVariant?: BadgeVariant;
    title: string;
    value: string | number;
    class?: string;
  }>();

  /* Derived props (Svelte 5 safe typing) */
  const MainIcon = $derived(props.mainIcon);
  const BadgeIcon = $derived(props.badgeIcon);
  const badgeText = $derived(props.badgeText ?? "");
  const badgeVariant = $derived<BadgeVariant>(props.badgeVariant ?? "neutral");
  const title = $derived(props.title);
  const value = $derived(props.value);
  const className = $derived(props.class ?? "");

  /*  Badge styles */
  const badgeStyles: Record<BadgeVariant, string> = {
    success: "bg-emerald-100/40 text-emerald-700",
    warning: "bg-amber-100/40 text-amber-700",
    neutral: "bg-muted text-muted-foreground",
    action: "bg-rose-100 text-rose-700"
  };
</script>

<div
  class={`rounded-xl bg-card border border-border shadow-md p-4 transition hover:shadow-lg ${className}`}
  aria-label={title}
>
  <div class="flex items-center justify-between">
    <!-- Left Icon -->
    <div class="w-10 h-10 rounded-lg bg-secondary/30 text-brown flex items-center justify-center">
      {#if MainIcon}
        <MainIcon size={20} />
      {/if}
    </div>

    <!-- Badge -->
    {#if badgeText}
      <div
        class={`flex items-center gap-2 text-xs px-2 py-0.5 rounded-full font-medium
        ${badgeStyles[badgeVariant]}`}
      >
        {#if BadgeIcon}
          <BadgeIcon size={14} />
        {/if}
        <span>{badgeText}</span>
      </div>
    {/if}
  </div>

  <!-- Content -->
  <div class="mt-4">
    <p class="text-sm text-muted-foreground">{title}</p>
    <p class="mt-1 font-heading text-2xl font-semibold text-foreground">
      {value}
    </p>
  </div>
</div>
