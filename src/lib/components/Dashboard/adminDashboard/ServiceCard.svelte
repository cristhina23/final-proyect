
<script lang="ts">
  import type { Service } from "$lib/types/services";
  import { X } from "lucide-svelte";

  let { service, open = $bindable(true), onUpdate, onDelete } = $props<{
    service: Service;
    open: boolean;
    onUpdate: (data: Partial<Service>) => void;
    onDelete: () => void;
  }>();

  let name = $state(service.name);
  let price = $state(service.price);
  let duration = $state(service.duration_minutes);
  let description = $state(service.description);
  let category_id = $state(service.category_id);
  let is_active = $state(service.is_active);

</script>


 
    <div class="bg-white relative h-full p-8 w-full max-w-md border border-gray-200 rounded-lg shadow-sm">
      <div class="flex flex-col items-center">
        <h2 class="text-xl font-bold mb-6">{service.name}</h2>
        <p class="text-gray-600">{service.description}</p>
        <p class="text-gray-600">{service.duration_minutes}</p>
        <p class="text-gray-600">{service.price}</p>
        <p class="text-gray-600">{service.category_id}</p>
        <p class="text-gray-600">{service.is_active ? 'Active' : 'Inactive'}</p>
      </div>

    </div>
  
