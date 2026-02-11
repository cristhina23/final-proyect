<script lang="ts">
  import Select from "$lib/components/ui/Select.svelte";
  import type { Service, Category } from "$lib/types/services";
  import { X } from "lucide-svelte";

  let { open = $bindable(false), service = null, onAdd, onUpdate, onClose } = $props<{
    open: boolean;
    service?: Service | null;
    onAdd: (data: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>) => void;
    onUpdate: (data: Partial<Service>) => void;
    onClose: () => void;
  }>();

  let name = $state("");
  let price = $state("");
  let duration = $state("");
  let description = $state("");
  let category = $state<number | null>(null);
  let is_active = $state(true);

  let categories = $state<Category[]>([]);

  $effect(() => {
    fetch("/api/categories")
      .then(res => res.json())
      .then(data => categories = data);
  });

  $effect(() => {
    if (service) {
      name = service.name;
      price = service.price.toString();
      duration = service.duration_minutes.toString();
      description = service.description;
      category = service.category_id;
      is_active = service.is_active;
    } else {
      name = "";
      price = "";
      duration = "";
      description = "";
      category = null;
      is_active = true;
    }
  });

  $effect(() => {
    if (!open) {
      resetForm();
    }
  });

  let categoryOptions = $derived(categories.map(cat => ({
    label: cat.name,
    value: cat.id
  })));

  function resetForm() {
    name = "";
    price = "";
    duration = "";
    description = "";
    category = null;
    is_active = true;
  }

  function submit() {
    if (!category) return;

    const data = {
      name,
      description,
      duration_minutes: Number(duration),
      price: price.toString(),
      category_id: Number(category),
      is_active
    };

    if (service) {
      onUpdate(data);
    } else {
      onAdd(data);
    }

    onClose();
}
</script>

{#if open}
  <div class="fixed inset-0 z-50 flex items-center justify-end bg-black/50">
    <div class="relative h-full w-full max-w-md bg-white p-8">

      <!-- Header -->
      <div class="mb-6 flex items-center justify-between">
        <h2 class="text-xl font-bold">{service ? 'Edit Service' : 'Add Service'}</h2>
        <button
          type="button"
          class="rounded-lg p-2 text-foreground transition-colors hover:bg-red-500/10 hover:text-red-400"
          onclick={() => onClose()}
        >
          <X />
        </button>
      </div>

      <!-- Form -->
      <form class="space-y-6">

        <!-- Name -->
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="name"
            bind:value={name}
            placeholder="Service Name"
            class="w-full rounded border p-2"
          />
        </div>

        <!-- Price & Duration -->
        <div class="flex gap-4">
          <div class="flex-1">
            <label for="price" class="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              id="price"
              bind:value={price}
              placeholder="Price"
              class="w-full rounded border p-2"
            />
          </div>

          <div class="flex-1">
            <label for="duration" class="block text-sm font-medium text-gray-700">
              Duration
            </label>
            <input
              id="duration"
              bind:value={duration}
              placeholder="Duration"
              class="w-full rounded border p-2"
            />
          </div>
        </div>

        <!-- Description -->
        <div>
          <label for="description" class="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            bind:value={description}
            placeholder="Description"
            class="w-full rounded border p-2"
          ></textarea>
        </div>

        <!-- Category -->
        <Select
          label="Category"
          placeholder="Select a category"
          bind:value={category}
          options={categoryOptions}
        />

        <!-- Active checkbox -->
        <div class="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
          <input
            id="is_active"
            type="checkbox"
            bind:checked={is_active}
            class="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <label
            for="is_active"
            class="cursor-pointer text-sm font-medium text-gray-700"
          >
            Service is active
          </label>
        </div>

        <!-- Actions -->
        <div class="flex justify-end gap-2 pt-4">
          <button
            type="button"
            onclick={() => (open = false)}
            class="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>

          <button
            type="button"
            onclick={submit}
            class="rounded bg-primary px-4 py-2 text-white transition-colors hover:bg-primary/80"
          >
            {service ? 'Update' : 'Add'}
          </button>
        </div>

      </form>
    </div>
  </div>
{/if}
