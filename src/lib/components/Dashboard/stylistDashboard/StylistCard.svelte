<script lang="ts">
  import type { ComponentType } from 'svelte';
  import type { Icon as LucideIcon } from 'lucide-svelte';

  const { 
    icon: Icon, 
    indicator, 
    title, 
    value, 
    class: className = '' 
  } = $props<{
    icon: ComponentType<LucideIcon>;
    indicator: string;
    title: string;
    value: string;
    class?: string;
  }>();
</script>

<div class={`w-full max-w-sm bg-white border rounded-lg shadow ${className} shadow-lg`}>
  <div class="flex flex-col py-6">

    <div class="flex justify-between px-6">
      <Icon class="w-5 h-5 text-gray-600" />
      <p class="text-xs text-emerald-400">{indicator}</p>

    </div>

    <div class="px-6 mt-4">
      <p class="text-sm text-gray-500">{title}</p>
      <p class="text-2xl font-bold">{value}</p>
    </div>

  </div>
</div>
