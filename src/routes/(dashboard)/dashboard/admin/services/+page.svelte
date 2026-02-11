<script lang="ts">
  import AddServiceModal from "$lib/components/Dashboard/adminDashboard/AddServiceModal.svelte";
  import ServiceCard from "$lib/components/Dashboard/adminDashboard/ServiceCard.svelte";
  import { Input } from "$lib/components/ui/input";
  import type { Service, Category } from "$lib/types/services";
  import { onMount } from "svelte";
  import { toast } from 'svelte-french-toast';
  import { Search } from "lucide-svelte";
  


  let { data } = $props();

  let services = $state<Service[]>(data.services ?? []);
  let categories = $state<Category[]>([]);
  let open = $state(false);
  let selectedService = $state<Service | null>(null);
  let search = $state("");
  let selectedCategoryId = $state<number | null>(null);

  let filteredServices = $derived(
    services.filter(service => {
      const matchesSearch = service.name.toLowerCase().includes(search.toLowerCase()) || service.description?.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategoryId === null || service.category_id === selectedCategoryId;
      return matchesSearch && matchesCategory;
    })
  );

  onMount(async () => {
    const [servicesRes, categoriesRes] = await Promise.all([
      fetch("/api/services"),
      fetch("/api/categories")
    ]);
    
    if (servicesRes.ok) services = await servicesRes.json();
    if (categoriesRes.ok) categories = await categoriesRes.json();
  });

  function openCreate() {
    selectedService = null;
    open = true;
  }

  function openEdit(service: Service) {
    selectedService = service;
    open = true;
  }

  const handleAdd = async (
  service: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>
) => {
  await toast.promise(
    (async () => {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(service)
      });

      if (!res.ok) {
        throw new Error('Failed to create service');
      }

      const data = await res.json();
      services = [...services, data];

      open = false;
      selectedService = null;

      return data;
    })(),
    {
      loading: 'Creating service...',
      success: 'Service created successfully',
      error: (err) => err.message
    }
  );
};


  function handleUpdate(updated: Partial<Service>) {
  if (!selectedService) return;
  const serviceId = selectedService.id;

  toast.promise(
    (async () => {
      const res = await fetch(`/api/services/${serviceId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });

      if (!res.ok) {
        throw new Error('Failed to update service');
      }

      services = services.map(s =>
        s.id === serviceId ? { ...s, ...updated } : s
      );

      open = false;
      selectedService = null;
    })(),
    {
      loading: 'Updating service...',
      success: 'Service updated',
      error: (err) => err.message
    }
  );
}


  function handleDelete(service: Service) {
  if (!confirm(`Are you sure you want to delete ${service.name}?`)) return;
  const serviceId = service.id;

  toast.promise(
    (async () => {
      const res = await fetch(`/api/services/${serviceId}`, {
        method: 'DELETE'
      });

      if (!res.ok) {
        throw new Error('Failed to delete service');
      }

      services = services.filter(s => s.id !== serviceId);
      open = false;
      selectedService = null;
    })(),
    {
      loading: 'Deleting service...',
      success: 'Service deleted',
      error: (err) => err.message
    }
  );
}

</script>

<div class="p-8 flex flex-col gap-6">
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-2xl font-bold">Services Management</h1>
    
  </div>
  <div class="flex flex-col gap-4">
    <div class="flex flex-wrap gap-2">
      <button
        onclick={() => selectedCategoryId = null}
        class="px-4 py-2 rounded-full text-sm font-medium transition-colors {selectedCategoryId === null ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}"
      >
        All
      </button>
      {#each categories as category}
        <button
          onclick={() => selectedCategoryId = category.id}
          class="px-4 py-2 rounded-full text-sm font-medium transition-colors {selectedCategoryId === category.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}"
        >
          {category.name}
        </button>
      {/each}
    </div>

    <div class="flex flex-col md:flex-row justify-between items-center gap-4">
      <div class="relative w-full max-w-sm">
        <Search class="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search services" class="pl-8" bind:value={search} />
      </div>
      <button
        onclick={openCreate}
        class="w-full md:w-auto px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-all shadow-sm active:scale-95"
      >
        Add Service
      </button>
    </div>
  </div>

  <AddServiceModal
    bind:open={open}
    service={selectedService}
    onAdd={handleAdd}
    onUpdate={handleUpdate}
    onClose={() => {
      open = false;
      selectedService = null;
    }}
  />

  {#if filteredServices.length > 0}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each filteredServices as service (service.id)}
        <ServiceCard
          service={service}
          onEdit={() => openEdit(service)}
          onDelete={() => handleDelete(service)}
        />
      {/each}
    </div>
  {:else}
    <div class="flex flex-col items-center justify-center text-center py-20 bg-white rounded-xl border-2 border-dashed border-gray-100 shadow-sm">
      <div class="mb-4">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      </div>

      <h3 class="text-lg font-medium text-gray-900">
        No services available yet
      </h3>
      <p class="mt-1 text-gray-500">
        Start by adding a new service for your salon.
      </p>

      <div class="mt-6">
        <button
          onclick={openCreate}
          class="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90"
        >
          Add Service
        </button>
      </div>
    </div>
  {/if}
</div>
