<script lang="ts">
  import type { Service } from "$lib/types/services";
  import { Pencil, Trash2 } from "lucide-svelte";

  let { service, onEdit, onDelete } = $props<{
    service: Service;
    onEdit: () => void;
    onDelete: () => void;
  }>();
</script>

<div class="relative flex flex-col h-full w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
  <!-- Actions -->
  <div class="flex gap-2 absolute right-4 top-4">
    <button
      onclick={onEdit}
      class="p-1 cursor-pointer text-primary hover:bg-gray-100 rounded-full transition-colors"
      aria-label="Edit service"
    >
      <Pencil size={20} />
    </button>

    <button
      onclick={onDelete}
      class="p-1 cursor-pointer text-primary hover:text-red-500 hover:bg-gray-100 rounded-full transition-colors"
      aria-label="Delete service"
    >
      <Trash2 size={20} />
    </button>
  </div>

  <!-- Content -->
  <div class="flex flex-col flex-1 gap-4 pt-2">
    <div>
      <h3 class="text-lg font-bold line-clamp-1">{service.name}</h3>
      <p class="text-gray-600 text-md line-clamp-3 mt-1 leading-relaxed">
        {service.description}
      </p>
    </div>

    <div class="mt-auto space-y-4">
      <div class="flex gap-6">
        <div>
          <p class="text-sm text-gray-500 uppercase tracking-wider font-semibold">Duration</p>
          <p class="text-gray-700 font-medium">{service.duration_minutes} min</p>
        </div>
        <div>
          <p class="text-sm text-gray-500 uppercase tracking-wider font-semibold">Price</p>
          <p class="text-primary font-bold text-lg">${service.price}</p>
        </div>
      </div>

      <div class="flex items-center gap-2 pt-2 border-t border-gray-100">
        <div class="w-2 h-2 rounded-full {service.is_active ? 'bg-green-500' : 'bg-gray-400'}"></div>
        <p class="text-gray-600 text-sm font-medium">
          {service.is_active ? "Active" : "Inactive"}
        </p>
      </div>
    </div>
  </div>
</div>
