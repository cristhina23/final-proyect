<script lang="ts">
  import { type Component } from 'svelte';
  import { cn } from "$lib/utils";

  export let name: string;
  export let avatar: string = ""; // URL or fallback
  export let timeAgo: string;
  export let action: string;
  export let target: string = "";
  export let detailText: string = "";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export let DetailIcon: any = null;
  export let statusText: string = "";
  export let statusType: 'warning' | 'success' | 'default' = 'default';

  // Helper to get initials if no avatar image is real (assuming we might implemented check later, for now just use first char)
  $: initials = name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();
</script>

<div class="flex gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
  <!-- Avatar -->
  <div class="shrink-0">
    <div class="h-10 w-10 rounded-full bg-muted flex items-center justify-center overflow-hidden border border-border">
      {#if avatar}
        <img src={avatar} alt={name} class="h-full w-full object-cover" />
      {:else}
        <span class="text-xs font-semibold text-muted-foreground">{initials}</span>
      {/if}
    </div>
  </div>

  <!-- Content -->
  <div class="flex-1 min-w-0">
    <div class="flex justify-between items-start">
      <h4 class="text-sm font-semibold text-foreground truncate pr-2">
        {name}
      </h4>
      <span class="text-[10px] uppercase font-bold text-muted-foreground whitespace-nowrap pt-0.5">
        {timeAgo}
      </span>
    </div>

    <p class="text-sm text-foreground/80 leading-snug">
      <span class="text-muted-foreground">{action}</span>
      {#if target}
        <span class="font-medium text-brown">{target}</span>
      {/if}
    </p>

    <!-- Details Row -->
    {#if detailText || DetailIcon}
      <div class="flex items-center gap-1.5 mt-1.5 text-xs text-muted-foreground">
        {#if DetailIcon}
          <svelte:component this={DetailIcon} size={14} />
        {/if}
        <span>{detailText}</span>
      </div>
    {/if}

    <!-- Status Row -->
    {#if statusText}
      <div class={cn(
        "flex items-center gap-1.5 mt-1.5 text-xs font-medium",
        statusType === 'warning' ? "text-yellow-600 dark:text-yellow-500" :
        statusType === 'success' ? "text-green-600 dark:text-green-500" :
        "text-muted-foreground"
      )}>
        {#if statusType === 'warning'}
           <!-- Warning Icon (Triangle Alert) -->
             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-triangle-alert"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
        {:else if statusType === 'success'}
             <!-- Check Circle -->
             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
        {/if}
        {statusText}
      </div>
    {/if}
  </div>
</div>
