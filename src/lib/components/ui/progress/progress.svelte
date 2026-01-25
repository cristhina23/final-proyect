<script lang="ts">
  import { cn } from "$lib/utils";

  let { value = 0, max = 100, class: className, ...rest } = $props<{ value?: number; max?: number; class?: string }>();

  // Calculate percentage for width
  let percentage = $derived(Math.min(Math.max(0, (value / max) * 100), 100));
</script>

<div
  role="progressbar"
  aria-valuemin={0}
  aria-valuemax={max}
  aria-valuenow={value}
  class={cn("relative h-2 w-full overflow-hidden rounded-full bg-secondary/20", className)}
  {...rest}
>
  <div
    class="h-full w-full flex-1 bg-primary transition-all"
    style={`transform: translateX(-${100 - (percentage || 0)}%)`}
  ></div>
</div>
