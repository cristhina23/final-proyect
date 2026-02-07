<script lang="ts">
  import AddServiceModal from "$lib/components/Dashboard/adminDashboard/AddServiceModal.svelte";
  import ServiceCard from "$lib/components/Dashboard/adminDashboard/ServiceCard.svelte";
  import type { Service } from "$lib/types/services";

  let { data } = $props();

  let services = $state<Service[]>(data.services ?? []);
  let open = $state(false);
  let selectedService = $state<Service | null>(null);

  $effect(() => {
    services = data.services ?? [];
  });

  function openCreate() {
    selectedService = null;
    open = true;
  }

  function openEdit(service: Service) {
    selectedService = service;
    open = true;
  }

  const handleAdd = (service: Omit<Service, 'id' | 'created_at' | 'updated_at'>) => {
    console.log(service);
  };

  function handleUpdate(updated: Partial<Service>) {
    if (!selectedService) return;

    services = services.map(s =>
      s.id === selectedService!.id ? { ...s, ...updated } : s
    );

    open = false;
    selectedService = null;
  }

  function handleDelete() {
    if (!selectedService) return;

    services = services.filter(s => s.id !== selectedService!.id);
    open = false;
    selectedService = null;
  }
</script>

<div class="p-8">
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-2xl font-bold">Services</h1>
    <button
      onclick={openCreate}
      class="px-4 py-2 bg-primary text-white rounded hover:bg-primary/80"
    >
      Add Service
    </button>
  </div>

  <AddServiceModal
    open={open}
    onAdd={handleAdd}
  />

  {#if services.length > 0}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each services as service (service.id)}
        <ServiceCard
          service={service}
          open={open}
          onEdit={() => openEdit(service)}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
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
