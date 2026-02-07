<script lang="ts">
  import { X } from "lucide-svelte";

  let { open = $bindable(false), onAdd } = $props<{
    open: boolean;
    onAdd: (data: Omit<Service, 'id' | 'created_at' | 'updated_at'>) => void;
  }>();

  let name = $state("");
  let price = $state("");
  let duration = $state("");
  let description = $state("");
  let category = $state("");
  let is_active = $state(true);

  function submit() {
    onAdd({
      name,
      description,
      duration_minutes: Number(duration),
      price: Number(price),
      category,
      is_active
    });
    open = false;
  }
</script>

{#if open}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-end z-50">
    <div class="bg-white relative h-full p-8 w-full max-w-md">
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-bold mb-6">Add Service</h2>
        <button
          type="button"
          class="absolute top-4 right-4 text-sm text-foreground cursor-pointer hover:text-red-400 hover:bg-red-500/10 rounded-lg p-2 transition-colors duration-200"
          onclick={() => open = false}
        >
          <X />
        </button>
      </div>
      <form class="space-y-6">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
          <input 
            id="name"
            bind:value={name} 
            placeholder="Service Name" 
            class="w-full border rounded p-2"
          />
        </div>
        <div>
          <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
          <input 
            id="price"
            bind:value={price} 
            placeholder="Price" 
            class="w-full border rounded p-2"
          />
        </div>
        <div>
          <label for="duration" class="block text-sm font-medium text-gray-700">Duration</label>
          <input 
            id="duration"
            bind:value={duration} 
            placeholder="Duration" 
            class="w-full border rounded p-2"
          />
        </div>
        <div>
          <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
          <textarea 
            id="description"
            bind:value={description} 
            placeholder="Description" 
            class="w-full border rounded p-2"
          />
        </div>
        <div>
          <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
          <input 
            id="category"
            bind:value={category} 
            placeholder="Category" 
            class="w-full border rounded p-2"
          />
        </div>
        <div class="flex items-center space-x-2">
          <input 
            id="is_active"
            type="checkbox"
            bind:checked={is_active} 
            class="w-4 h-4"
          />
          <label for="is_active" class="text-sm font-medium text-gray-700">Active</label>
        </div>
        <div class="flex justify-end space-x-2 pt-4">
          <button 
            onclick={() => open = false}
            class="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button 
            onclick={submit}
            class="px-4 py-2 bg-brown-600 text-white rounded hover:bg-brown-700"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}